
var Person = function () {
	var that = {};

	Entity(that);
	Movable(that);

	var shape = game.add.graphics(0, 0);

	shape.lineStyle(1, 0x000000, 0);
	shape.beginFill(0xff0000, 1);
	shape.drawRect(-30, -30, 60, 60);
	shape.endFill();

	that.update = function (deltaTime) {

	};

	return that;
};