
var Opening = function () {
	var that = {};

	var adam;
	var eve;
	var attendant;
	var linePerson;
	var waitForNudge = false;
	var waitForSwitch = false;

	var lineMove = function(actor, time)
	{
		var t = 0;
		t = MoveLib.walkLeft(actor, 100+t, 3000);
		t = MoveLib.walkDown(actor, 100+t, 20000);
	}

	var start = function()
	{
		console.log("start Opening")
		adam = characters[0];
		eve = characters[1];
		attendant = minorCharacters[0];
		linePerson = minorCharacters[1];

		var scriptTime = 0;

		// pan camera

		game.camera.follow(null);
		game.camera.focusOnXY(-1350, 1900);

		scriptTime += 12000;
		game.add.tween(game.camera)
			.to({x:adam.shape.position.x - (game.camera.width / 2),
			 y: adam.shape.position.y - (game.camera.height / 2)},
			 scriptTime, Phaser.Easing.Linear.None, true);
		game.time.events.add(scriptTime, game.camera.follow, this,
								adam.shape, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
		// adam, eve discuss
		adam.thought.load("adam", "to_eve");
		eve.thought.load("eve", "to_adam");

		scriptTime += 1000;
		game.time.events.add(scriptTime, eve.think, eve, 3000);

		scriptTime += 4000;
		game.time.events.add(scriptTime, adam.think, adam, 3000);

		scriptTime += 4000;
		game.time.events.add(scriptTime, adam.think, adam, 3000);

		// line moves
		scriptTime += 3000;
		game.time.events.add(scriptTime, lineMove, this, linePerson, scriptTime);

		// nudge to move on
		scriptTime + 5000;
		game.time.events.add(scriptTime, (function() { waitForNudge = true}), this);



		// switch to move on

	};

	var nudgeToMove = function()
	{
		var scriptTime = 0;
		// get pass

		// move to hall entry
	};

	var playerListener = function (paramObj) {
		var nudging = paramObj.nudging;
		var x = paramObj.x;
		var y = paramObj.y;
		var switching = paramObj.switching;
		if(waitForNudge && nudging)
		{
			waitForNudge = false;
			nudgeToMove();
		}
	}

	that.start = start;
	//that.update = update;

	return that;
}();

var Security = function () {
	var that = {};

	var securityGuard;
	var startPerson;
	var repeatable;

	var start = function()
	{
		// set persons

		// move to queue

		// walk to scanner

		// sound off scanner

		// loop checking until player is not on person

		// loop repeatable until leaves on person

	}

	that.start = start;

	return that;
}();

var Security = function () {
	var that = {};

	var startPerson;
	var hatMan;

	var start = function()
	{
		// set persons

		// move to ticker

		// quip about delay

		// move to loop

		// make loop

		// hatMan is seen and moves to bathroom

		// loop until nudge to bathroom
	}

	that.start = start;

	return that;
}();
