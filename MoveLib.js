

var MoveLib = function () {
	var that = {};

	var repeat = function (context, pauseTime, walkTime, f, dir)
	{
		var cTime = f(context, pauseTime, walkTime, dir);
		game.time.events.add(cTime, repeat, this, context, pauseTime, walkTime, f, dir);
	}

	var PaceH = function (context, pauseTime, walkTime, dir) {
		var cTime = pauseTime;
		var d = dir || 1;
		game.time.events.add(cTime, context.move, context, 1*d, 0);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		cTime += pauseTime;
		game.time.events.add(cTime, context.move, context, -1*d, 0);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		return cTime;
	};

	var PaceV = function (context,pauseTime, walkTime, dir) {
		var cTime = pauseTime;
		var d = dir || 1;
		game.time.events.add(cTime, context.move, context, 0, 1*d);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		cTime += pauseTime;
		game.time.events.add(cTime, context.move, context, 0, -1*d);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		return cTime;
	};

	var walkCircleCCW = function (context, pauseTime, walkTime)
	{
		var cTime = walkLeft(context, pauseTime, walkTime);
		cTime = walkDown(context, cTime + pauseTime, walkTime);
		cTime = walkRight(context, cTime + pauseTime, walkTime);
		cTime = walkUp(context, cTime + pauseTime, walkTime);
		return cTime;
	};

	var walkCircleCW = function (context, pauseTime, walkTime)
	{
		var cTime = walkRight(context, pauseTime, walkTime);
		cTime = walkUp(context, pauseTime, walkTime);
		cTime = walkLeft(context, pauseTime, walkTime);
		cTime = walkDown(context, pauseTime, walkTime);
		return cTime;
	};

	var walkLeft = function (context, delay, walkTime) {
		var cTime = delay;
		game.time.events.add(cTime, context.move, context, -1, 0);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		return cTime;
	};

	var walkRight = function (context, delay, walkTime) {
		var cTime = delay;
		game.time.events.add(cTime, context.move, context, 1, 0);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		return cTime;
	};
	var walkUp = function (context, delay, walkTime) {
		var cTime = delay;
		game.time.events.add(cTime, context.move, context, 0, -1);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		return cTime;
	};
	var walkDown = function (context, delay, walkTime) {
		var cTime = delay;
		game.time.events.add(cTime, context.move, context, 0, 1);
		cTime += walkTime;
		game.time.events.add(cTime, context.stop, context);
		return cTime;
	};


	that.repeat = repeat;
	that.PaceH = PaceH;
	that.PaceV = PaceV;
	that.walkCircleCCW = walkCircleCCW;
	that.walkCircleCW = walkCircleCW;
	that.walkLeft = walkLeft;
	that.walkRight = walkRight;
	that.walkUp = walkUp;
	that.walkDown = walkDown;
	return that;
}();
