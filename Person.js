
var Person = function (x, y, key, name, startDir) {
	var that = {};

	var group = game.add.group(undefined, name + "_grp");
	var thought_group = game.add.group(undefined, name + "_thought_grp");

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

	var thought_bg = game.add.graphics(x, y);
	var thought = game.add.text(x, y, "", {
			font: "12pt uni_05_53",
			fill: "#000000",
			align: "center"
	});
	thought.visible = false;
	thought.wordWrap = true;
	thought.wordWrapWidth = 240;

	// for display object sorting
	group.add(shape);
	thought_group.add(thought_bg);
	thought_group.add(thought);

	var moveDir = new Phaser.Point(0,0);
	var lookDir = startDir || lookState.down;
	var speed = 3;
	var moving = false;

	var move = function(x, y) {
		moving = true;
		moveDir = new Phaser.Point(x,y).normalize();
		if(moveDir.x > 0 && moveDir.x > y)
		{
			lookDir = lookState.right;
		}
		else if(moveDir.x < 0 && moveDir.x < moveDir.y)
		{
			lookDir = lookState.left;
		}
		else if(moveDir.y < 0 && moveDir.y < moveDir.x)
		{
			lookDir = lookState.up;
		}
		else
		{
			lookDir = lookState.down;
		}
	};

	var stop = function() {
		moving = false;
		moveDir = new Phaser.Point(0,0);
	};

	var think = function() {
		var thought_json = game.cache.getJSON('thoughts');
		thought.setText(thought_json[name]["script"][0]);

		generate_thought_graphic(thought_bg, thought.width, thought.height, 10);
		thought.visible = true;

		game.time.events.add(4000, function() {
			thought.visible = false;
			thought_bg.clear();
		});
	}

	// FIXME: encapsulate in a thought class
	var generate_thought_graphic = function(graphic, w, h, pad) {
		pad = pad || 10;

		graphic.clear();
		graphic.beginFill(0xFFFFFF);
		graphic.drawRect(-pad, -pad, w + pad * 2, h + pad * 2);
		graphic.endFill();

		return graphic;
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

	that.update = function (dt) {
		shape.position.x += moveDir.x*speed*dt;
		shape.position.y += moveDir.y*speed*dt;

		if (thought.visible) {
			thought.x = shape.position.x - shape.width * shape.anchor.x;
			thought.y = shape.position.y - shape.height * shape.anchor.y - thought.height;

			thought_bg.position.x = thought.x;
			thought_bg.position.y = thought.y;
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
	that.thought_group = thought_group;

	that.shape = shape;
	that.move = move;
	that.stop = stop;
	that.lookDir = lookDir;
	that.speed = speed;

	that.think = think;
	that.name = name;
	that.thought = thought;
	that.thought_bg = thought_bg;  // FIXME: encapsulate into a thought class
	return that;
};


var LobbyInit = function () {
	minorCharacters.length = 0;
	characters.length = 0;
	Program.groups.midground.removeAll();
	Program.groups.textground.removeAll();

	// lobby people
	minorCharacters.push(Person(-1400, 1045, 'redwoman', 'Attendent2'));
	minorCharacters.push(Person(-1410, 1156, 'backpack', 'Queue21', lookState.up));
	minorCharacters.push(Person(-1150, 1038, 'bluewoman', 'Attendent1'));
	minorCharacters.push(Person(-1660, 1035, 'blueman', 'Attendent3'));
	minorCharacters.push(Person(-1910, 1045, 'bluewoman', 'Attendent4'));

	minorCharacters.push(Person(-1150, 1151, 'blueman', 'Queue11', lookState.up));
	minorCharacters.push(Person(-1150, 1231, 'redwoman', 'Queue12', lookState.up));
	minorCharacters.push(Person(-1160, 1340, 'baldman', 'Queue13', lookState.up));

	characters.push(Person(-1460, 1270, 'suitman', 'adam', lookState.right));
	characters.push(Person(-1410, 1270, 'suitwoman', 'eve', lookState.left));

	var wait1 = Person(-1690, 1425, 'baldman', 'wait1', lookState.right);
	MoveLib.repeat(wait1, 1000, 1000, MoveLib.walkCircleCCW);
	minorCharacters.push(wait1);

	var pace1 = Person(-1500, 1615, 'backpack', 'pace1');
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
