
var Person = function (x, y) {
	var that = {};

	Entity(that);

	var shape = game.add.sprite(60, 60, 'redBox');
	shape.position.x = x;
	shape.position.y = y;
	shape.anchor.setTo(0.5, 0.5);

	//game.physics.enable(shape, Phaser.Physics.ARCADE);

	that.update = function () {
		
	};

	that.shape = shape;
	return that;
};