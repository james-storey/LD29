var PersonAction = function (type, pause, duration, args)
{
	action = {};
	action.type = type;
	action.pause = pause || 0;
	action.duration = duration || 0;
	action.args = args;

	return action;
};

var MoveLib = function () {
	var that = {};

	var repeat = function (context, pauseTime, walkTime, f, dir, times)
	{
		f(context, pauseTime, walkTime, dir);
		if(times !== 0) {
			context.pushAction(PersonAction("repeat", 0, 0, {"f": f, "context": context, 
				"pause": pauseTime, "duration": walkTime, "dir": dir, "times": times}));
		}
	}

	var PaceH = function (context, pauseTime, walkTime, dir) {
		var d = dir || 1;
		if(d === 1)
		{
			walkRight(context, pauseTime, walkTime);
			walkLeft(context, pauseTime, walkTime);
		}
		else
		{
			walkLeft(context, pauseTime, walkTime);
			walkRight(context, pauseTime, walkTime);
		}
	};

	var PaceV = function (context,pauseTime, walkTime, dir) {
		var d = dir || 1;
		if(d === 1)
		{
			walkDown(context, pauseTime, walkTime);
			walkUp(context, pauseTime, walkTime);
		}
		else
		{
			walkUp(context, pauseTime, walkTime);
			walkDown(context, pauseTime, walkTime);
		}
	};

	var walkCircleCCW = function (context, pauseTime, walkTime)
	{
		walkLeft(context, pauseTime, walkTime);
		walkDown(context, pauseTime, walkTime);
		walkRight(context, pauseTime, walkTime);
		walkUp(context, pauseTime, walkTime);
	};

	var walkCircleCW = function (context, pauseTime, walkTime)
	{
		walkRight(context, pauseTime, walkTime);
		walkUp(context, pauseTime, walkTime);
		walkLeft(context, pauseTime, walkTime);
		walkDown(context, pauseTime, walkTime);
	};

	var walkLeft = function (context, delay, walkTime) {
		context.pushAction(PersonAction("move", delay, walkTime, {x: -1, y: 0}));
	};

	var walkRight = function (context, delay, walkTime) {
		context.pushAction(PersonAction("move", delay, walkTime, {x: 1, y: 0}));
	};
	var walkUp = function (context, delay, walkTime) {
		context.pushAction(PersonAction("move", delay, walkTime, {x: 0, y: -1}));
	};
	var walkDown = function (context, delay, walkTime) {
		context.pushAction(PersonAction("move", delay, walkTime, {x: 0, y: 1}));
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
