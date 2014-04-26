
// global position and movement component
var Moveable = function (sub) {
	that = sub || {};

	that.position = {x: 0, y: 0};

	var move = function (x, y) {
		that.position.x += x;
		that.position.y += y;
	};

	that.move = move;
	return that;
};