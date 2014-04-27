
var Program = function () {
	var that = {};
	var debugMode;
	var esc;
	var isDebugMode = false;
	var keyPressed = false;

	that.currentGameState = gameStates.start;
	var preload = function () {
		game.load.atlasJSONHash('fatman', 'character_sprites/man04/man04sheet.png',
								'character_sprites/man04/man04sheet.json');
		game.load.atlasJSONHash('longHair', 'character_sprites/man06/man06.png',
								'character_sprites/man06/man06.json');
		game.load.atlasJSONHash('blueman', 'character_sprites/man05/man05.png',
								'character_sprites/man05/man05.json');
		game.load.atlasJSONHash('suitman', 'character_sprites/man01/man01.png',
								'character_sprites/man01/man01.json');
		game.load.atlasJSONHash('backpack', 'character_sprites/res_viewer/res.png',
								'character_sprites/res_viewer/res.json');
		game.load.atlasJSONHash('hatman', 'character_sprites/man_in_hat/man_in_hat.png',
								'character_sprites/man_in_hat/man_in_hat.json');
		game.load.atlasJSONHash('baldman', 'character_sprites/bald/bald.png',
								'character_sprites/bald/bald.json');
		game.load.atlasJSONHash('bluewoman', 'character_sprites/woman1/woman1.png',
								'character_sprites/woman1/woman1.json');
		game.load.atlasJSONHash('suitwoman', 'character_sprites/woman2/woman2.png',
								'character_sprites/woman2/woman2.json');
		game.load.atlasJSONHash('redwoman', 'character_sprites/woman3/woman3.png',
								'character_sprites/woman3/woman3.json');

		game.load.image("redBox", "resources/redBox.png");
		game.load.image("lobby", "character_sprites/lobbypixel.png");
		game.load.image("security", "character_sprites/security.png");
		game.load.image("layout", "character_sprites/layout.png");

		game.load.json("thoughts", "resources/thoughts.json");
	};

	var create = function () {
		game.stage.backgroundColor = 0xeaeaea;

		game.world.setBounds(-2000, -2000, 4000, 4000);

		that.currentGameState = gameStates.start;

		upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		debugMode = game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
		esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

		game.physics.startSystem(Phaser.Physics.ARCADE);


		groups = {};
		that.groups = groups;
		groups.background = game.add.group(undefined, "background_grp");
		groups.background.z = 0;

		groups.midground = game.add.group(undefined, "midground_grp");
		groups.midground.z = 1;
		groups.textground = game.add.group(undefined, "textground_grp");
		groups.textground.z = 2;
		groups.overlay = game.add.group(undefined, "overlay_grp");
		groups.overlay.z = 3;

		game.add.image(-2160, -2160, 'layout', undefined, groups.background);

		//game.add.image(-900, -1100, 'lobby', undefined, groups.background);
		//game.add.image(1200, -1247, 'security', undefined, groups.background);

		//characters.push(Person(0, -500, 'fatman', 'adam'));
		//characters.push(Person(70, -500, 'longHair', 'patrick'));

		peopleInit();
		player = Player(characters[0]);

		MoveLib.repeat(characters[0], 1100, 3000, MoveLib.PaceV, 1);
		MoveLib.repeat(characters[1], 1000, 3000, MoveLib.PaceH);
		game.camera.focusOnXY(0, 0);

		minorCharacters.forEach(function (person) {
			groups.midground.add(person.group);
			groups.textground.add(person.thought_group);
		});
		characters.forEach(function (person) {
			groups.midground.add(person.group);
			groups.textground.add(person.thought_group);
		});
		groups.midground.add(player.shape);

		groups.midground.sort('y', Phaser.Group.SORT_DESCENDING);
		groups.textground.sort('y', Phaser.Group.SORT_DESCENDING);
		groups.overlay.sort('y', Phaser.Group.SORT_DESCENDING);
	};

	var update = function () {

		if(debugMode.justPressed(50) && keyPressed === false)
		{
			keyPressed = true;
			isDebugMode = true;
			console.log("debugMode: " + isDebugMode)
			debugInit();
		}
		else if(esc.justPressed(50) && keyPressed === true)
		{
			keyPressed = false;
			isDebugMode = false;
			console.log("debugMode: " + isDebugMode)
			debugInit();
		}

		player.update();
		groups.textground.bringToTop(player.currentAttachment.thought_group);

		characters.forEach(function (elem) {
			elem.update();
		});
		minorCharacters.forEach(function (elem) {
			elem.update();
		});
	};

	var render = function () {

	};

	var debugInit = function() {
		player.debugMode(isDebugMode);

		if(isDebugMode === false)
		{
			//close debug stuff
			return;
		}

	};

	game = new Phaser.Game(1000, 640, Phaser.AUTO, "phaser",
			{preload: preload, create: create, update: update, render: render});
	return that;
}();

