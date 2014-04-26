
var Person = function (x, y, key) {
	var that = {};

	Entity(that);

	var shape = game.add.sprite(x,y, key);
	shape.anchor.x = 0.5;
	shape.anchor.y = 0.5;
	shape.animations.add('left', ['l2','l1','l0'], 9, true);
	shape.animations.add('up', ['u0','u1','u2'], 9, true);
	shape.animations.add('down', ['d0','d1','d2'], 9, true);
	shape.animations.add('right', ['r0','r1','r2'], 9, true);
	shape.animations.add('leftidle', ['l1'], 9, true);
	shape.animations.add('upidle', ['u1'], 9, true);
	shape.animations.add('downidle', ['d1'], 9, true);
	shape.animations.add('rightidle', ['r1'], 9, true);
	

	that.update = function () {
		switch(lookDir){
			case lookState.down:
			    if(moving) shape.animations.play('down', 9, true);
			    else shape.animations.play('downidle', 9, true);
			    break;
			case lookState.left:
			    if(moving) shape.animations.play('left', 9, true);
			    else shape.animations.play('leftidle', 9, true);
			    break;
			case lookState.up:
			    if(moving) shape.animations.play('up', 9, true);
			    else shape.animations.play('upidle', 9, true);
			    break;
			case lookState.down:
			    if(moving) shape.animations.play('right', 9, true);
			    else shape.animations.play('rightidle', 9, true);
			    break;
		}
	};

	that.shape = shape;
	return that;
};