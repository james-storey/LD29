

var Player = function () {
	var that = {};

	Entity(that);
	Moveable(that);

	var shape = new PIXI.Graphics();
	stage.addChild(shape);
	shape.lineStyle(1, 0x000000, 0);
	shape.beginFill(0xff0000, 1);
	shape.drawRect(-30, -30, 60, 60);

	that.position.x = 0;
	that.position.y = 0;


	that.update = function(deltaTime) {

		shape.position.x = that.position.x + view.x;
		shape.position.y = that.position.y + view.y;
	};

	return that;
};