
var Person = function (x, y, key, name, startDir) {
	var that = {};

	var group = game.add.group(undefined, name + "_grp");

	var shape = game.add.sprite(x,y, key);
	shape.anchor.x = 0.5;
	shape.anchor.y = 0.5;
	shape.animations.add('left', ['l2','l1','l0','l1'], 9, true);
	shape.animations.add('up', ['u0','u1','u2','u1'], 9, true);
	shape.animations.add('down', ['d0','d1','d2','d1'], 9, true);
	shape.animations.add('right', ['r0','r1','r2','r1'], 9, true);
	shape.animations.add('leftidle', ['l1'], 6, true);
	shape.animations.add('upidle', ['u1'], 6, true);
	shape.animations.add('downidle', ['d1'], 6, true);
	shape.animations.add('rightidle', ['r1'], 6, true);

	// for display object sorting
	group.add(shape);


	var thought = Thought(x, y, name);
	thought.hide();
	thought.load(name, "script");

	var moveDir = new Phaser.Point(0,0);
	var lookDir = startDir || lookState.down;
	var speed = 3;
	var moving = false;

	var move = function(x, y) {
		moving = true;
		moveDir = new Phaser.Point(x,y).normalize();
		if(x > 0 && x > y)
		{
			look(lookState.right);
		}
		else if(x < 0 && x < y)
		{
			look(lookState.left);
		}
		else if(y < 0 && y < x)
		{
			look(lookState.up);
		}
		else
		{
			look(lookState.down);
		}
		// FIXME: should we call thought.move as well?
	};

	var look = function(dir) {
		lookDir = dir;
	};

	var stop = function() {
		moving = false;
		moveDir = new Phaser.Point(0,0);
	};

	var think = function(duration, index) {

		var line = ((index === undefined) ?
			thought.stream.getNext() :
			thought.stream.getAt(index));

		thought.text.setText(line);
		if (!line || line.length === 0) {
			thought.hide();
			return;
		}

		thought.show();
		thought.redraw();

		game.time.events.add(duration, function() {
			thought.hide();
		});
	};

	var destroySelf = function() {
		console.log("destroy self");
		groups.midGround.remove(group, true);
		groups.textGround.remove(thought_group, true);

		minorCharacters.forEach(function(e) {
			if(e === that)
			{
				minorCharacters.remove(minorCharacters.indexOf(e));
			}
		});
		characters.forEach(function(e) {
			if(e === that)
			{
				characters.remove(characters.indexOf(e));
			}
		});
	};

	var thoughtTimer = 0;
	var currentThought = null;

	var doThought = function () {
		if(currentThought === null){
			return;
		}
	};

	var actionTimer = 0;
	var actionQueue = [];
	var repeatAction = null;
	var pushAction = function(param) {
		actionQueue.push(param);
	};

	// actions always are relative to the duration of the previous action
	var doAction = function() {
		if(actionQueue.length === 0) {
			stop();
			actionTimer = 0;
			if(repeatAction !== null) {
				if(repeatAction.times < 0) { // it must have started at zero
					repeatAction.f(repeatAction.context, repeatAction.pause,
						repeatAction.duration, repeatAction.dir, repeatAction.times);
				}
				else {
					repeatAction.f(repeatAction.context, repeatAction.pause,
						repeatAction.duration, repeatAction.dir, repeatAction.times - 1);
				}
				doAction();
			}
			return;
		}
		var action = actionQueue[0];
		if(action.type === "move" && action.pause <= actionTimer) {
			moving = true;
			move(action.args.x, action.args.y);
		}
		else if(action.type === "stop") {
			stop();
		}
		else if(action.type === "look" && action.pause <= actionTimer) {
			look(action.args);
		}
		else if(action.type === "repeat") {
			repeatAction = action.args;
		}

		doThought();

		if(action.duration + action.pause <= actionTimer)
		{
			popAction();
			doAction();
		}
	};

	var popAction = function () {
		actionTimer = 0;
		stop();
		actionQueue.splice(0,1);	
	};

	that.update = function (dt) {
		actionTimer += dt;
		doAction();
		shape.position.x += moveDir.x*speed*dt * 0.016;
		shape.position.y += moveDir.y*speed*dt * 0.016;

		if (thought.text.visible) {
			thought.move(
				shape.position.x - shape.width * shape.anchor.x,
				shape.position.y - shape.height * shape.anchor.y - thought.text.height);
		}

		switch(lookDir) {
			case lookState.down:
				if(moving) shape.animations.play('down', 5, true);
				else shape.animations.play('downidle', 5, true);
				break;
			case lookState.left:
				if(moving) shape.animations.play('left', 5, true);
				else shape.animations.play('leftidle', 5, true);
				break;
			case lookState.up:
				if(moving) shape.animations.play('up', 5, true);
				else shape.animations.play('upidle', 5, true);
				break;
			case lookState.right:
				if(moving) shape.animations.play('right', 5, true);
				else shape.animations.play('rightidle', 5, true);
				break;
		}
	};

	that.group = group;
	that.thought_group = thought.group;

	that.shape = shape;
	//that.move = move;
	//that.stop = stop;
	//that.speed = speed;
	that.pushAction = pushAction;
	that.look = look;

	that.think = think;
	that.name = name;
	that.thought = thought;

	that.think = think;
	return that;
};


var LobbyInit = function () {
	minorCharacters.length = 0;
	characters.length = 0;
	Program.groups.midground.removeAll();
	Program.groups.textground.removeAll();

	// lobby people
	minorCharacters.push(Person(-1400, 1045, 'redwoman', 'Attendent2'));
	minorCharacters.push(Person(-1410, 1156, 'suitwoman', 'Queue21', lookState.up));
	minorCharacters.push(Person(-1150, 1038, 'bluewoman', 'Attendent1'));
	minorCharacters.push(Person(-1660, 1035, 'blueman', 'Attendent3'));
	minorCharacters.push(Person(-1910, 1045, 'bluewoman', 'Attendent4'));

	minorCharacters.push(Person(-1150, 1151, 'blueman', 'Queue11', lookState.up));
	minorCharacters.push(Person(-1150, 1231, 'redwoman', 'Queue12', lookState.up));
	minorCharacters.push(Person(-1160, 1340, 'baldman', 'Queue13', lookState.up));

	characters.push(Person(-1460, 1270, 'backpack', 'eve', lookState.right));
	characters.push(Person(-1410, 1270, 'backpackman', 'adam', lookState.left));

	var wait1 = Person(-1690, 1425, 'baldman', 'wait1', lookState.right);
	MoveLib.repeat(wait1, 1000, 1000, MoveLib.walkCircleCCW);
	minorCharacters.push(wait1);

	var pace1 = Person(-1500, 1615, 'suitman', 'pace1');
	MoveLib.repeat(pace1, 1000, 6000, MoveLib.PaceH);
	minorCharacters.push(pace1);

	minorCharacters.push(Person(-880, 1755, 'backpackman', 'tickerWatcher', lookState.up));
	player = Player(characters[0]);
	Program.sortGroups();
	Opening.start();
};

var SecurityInit = function () {
	minorCharacters.length = 0;
	characters.length = 0;
	Program.groups.midground.removeAll();
	Program.groups.textground.removeAll();

	// hallway walkers
	var hall3 = Person(-580, 1455, 'blueman', 'hall3');
	minorCharacters.push(hall3);
	MoveLib.repeat(hall3, 3000, 24000, MoveLib.PaceH, 1);

	var hall4 = Person(500, 1600, 'backpack', 'hall4');
	minorCharacters.push(hall4);
	MoveLib.repeat(hall4, 2000, 15000, MoveLib.PaceH, -1);

	var hall1 = Person(-770, 1629, 'suitman', 'hall1');
	minorCharacters.push(hall1);
	MoveLib.repeat(hall1, 1000, 30000, MoveLib.PaceH, 1);

	var hall5 = Person(10, 1690, 'backpackman', 'hall5');
	minorCharacters.push(hall5);
	MoveLib.repeat(hall5, 1000, 21000, MoveLib.PaceH, 1);

	var hall2 = Person(1440, 1719, 'redwoman', 'hall2');
	minorCharacters.push(hall2);
	MoveLib.repeat(hall2, 2000, 19000, MoveLib.PaceH, -1);

	if(Program.isDebugMode)
	{
		player = Player(hall5);
	}
	Program.sortGroups();
	Security.start();
};
