

var Player = function () {
	var that = {};

	Entity(that);
	Movable(that);

	var currentAttachment = null;

	var shape = game.add.graphics(0, 0);
	shape.lineStyle(3, 0x0000ff, 1);
	shape.drawRect(-30, -30, 60, 60);

	that.position.x = 0;
	that.position.y = 0;

	that.update = function(deltaTime) {
		
	};

	that.shape = shape;
	return that;
};