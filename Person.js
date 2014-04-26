
var Person = function (x, y) {
	var that = {};

	Entity(that);

	var shape = game.add.graphics(x,y);

	shape.lineStyle(1, 0x000000, 0);
	shape.beginFill(0xff0000, 1);
	shape.drawRect(-30, -30, 60, 60);
	shape.endFill();

	that.update = function () {

	};

	that.shape = shape;
	return that;
};