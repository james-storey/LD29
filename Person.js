
var Person = function (x, y) {
	var that = {};
	Entity(that);

	var shape = game.add.sprite(60, 60, 'redBox');
	shape.position.x = x;
	shape.position.y = y;
	shape.anchor.setTo(0.5, 0.5);

	var moveDir = new Phaser.Point(0,0);
	var lookDir = lookState.down;
	var speed = 1;
	var moving = false
	var movePattern = [];

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
		else if(moveDir.y > 0 && moveDir.y > moveDir.x)
		{
			lookDir = lookState.up;
		}
		else
		{
			lookDir = lookState.down;
		}
	};

	that.update = function () {
		//if(moving)
		//{
		shape.position.x += moveDir.x*speed;
		shape.position.y += moveDir.y*speed;
		//}
	};

	that.shape = shape;
	that.move = move;
	MoveLib.PaceH(that);
	return that;
};