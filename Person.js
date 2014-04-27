
var Person = function (x, y, key, name) {
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

	var thought_bg = game.add.graphics(0, 0);
	var thought = game.add.text(0, 0, "", {
			font: "12pt uni_05_53",
			fill: "#000000",
			align: "center"
		});
	thought.visible = false;

	// for display object sorting
	group.add(shape);
	group.add(thought_bg);
	group.add(thought);

	var moveDir = new Phaser.Point(0,0);
	var lookDir = lookState.down;
	var speed = 1;
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
		thought.setText(thought_json[name][0]);

		thought.visible = true;

		game.time.events.add(4000, function() {
			thought.visible = false;
			thought_bg.clear();
		});
	}

	that.update = function () {
		shape.position.x += moveDir.x*speed;
		shape.position.y += moveDir.y*speed;

		if (thought.visible) {
			thought.x = shape.position.x + shape.width;
			thought.y = shape.position.y - shape.height;

			thought_bg.clear();
			thought_bg.beginFill(0xFFFFFF);
			thought_bg.drawRect(thought.x - 10.0,
								thought.y - 10.0,
								thought.width + 20.0,
								thought.height + 20.0);
			thought_bg.endFill();
		}

		switch(lookDir){
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

	that.shape = shape;
	that.move = move;
	that.stop = stop;
	that.lookDir = lookDir;
	that.speed;
	that.think = think;
	that.name = name;
	that.thought = thought;
	return that;
};
