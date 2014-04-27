

var MoveLib = function () {
	var that = {};

	var PaceH = function (context) {
		game.time.events.add(1000, context.move, context, 1, 0);
		game.time.events.add(3000, context.stop, context);
		game.time.events.add(4000, context.move, context, -1, 0);
		game.time.events.add(6000, context.stop, context);

	};

	var PaceHL = function (context) {
		PaceH(context);
		game.time.events.add(6000, PaceHL, this, context);
	}

	that.PaceH = PaceH;
	that.PaceHL = PaceHL;
	return that;
}();
