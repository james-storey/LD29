
var Person = function () {
	var that = {};

	Entity(that);
	Movable(that);

	var shape = new PIXI.Graphics();
	stage.addChild(shape);

	shape.lineStyle(1, 0x000000, 0);
	shape.beginFill(0xff0000, 1);
	shape.drawRect(-30, -30, 60, 60);
	shape.endFill();

	that.update = function (deltaTime) {
		shape.position.x = that.position.x + view.x;
		shape.position.y = that.position.y + view.y;
	};

	return that;
};