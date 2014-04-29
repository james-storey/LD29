
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
	};

	

	var nudgeToMove = function()
	{
		var scriptTime = 0;
		// get pass

		game.time.events.add(scriptTime, MoveLib.walkUp, this, adam, 100, 3000);
		game.time.events.add(scriptTime, (function () {eve.look(lookState.up)}),this);
		scriptTime += 5000;
		game.time.events.add(scriptTime, MoveLib.walkDown, this, adam, 100, 3000);
		scriptTime += 4000;

		// move to hall entry
		game.time.events.add(scriptTime, MoveLib.walkDown, this, adam, 100, 6000);
		game.time.events.add(scriptTime, MoveLib.walkDown, this, eve, 100, 6000);
		scriptTime += 6000;

		game.time.events.add(scriptTime, MoveLib.walkRight, this, adam, 100, 12000);
		game.time.events.add(scriptTime, MoveLib.walkRight, this, eve, 100, 12000);
		scriptTime += 12000;
		
	};

	var start = function()
	{

		var playerListener = function (paramObj) {
			console.log(paramObj);
			if(waitForNudge && paramObj.nudging)
			{
				waitForNudge = false;
				nudgeToMove();
			}
		};
		console.log("start Opening")
		adam = characters[1];
		eve = characters[0];
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

		adam.look(lookState.left);
		eve.look(lookState.right);
		
		

	};

	that.start = start;

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

var Terminal = function () {
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
