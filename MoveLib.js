

var MoveLib = function () {
	var that = {};

	var PaceH = function (context) {
		game.time.events.add(500, context.move, context, 1, 0);
		game.time.events.add(1500, context.move, context, 0, 0);
	};

	that.PaceH = PaceH;
	return that;
}();