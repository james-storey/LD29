
var Program = function () {
	var that = {};

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

		game.physics.startSystem(Phaser.Physics.ARCADE);

		groups = {};
		groups.background = game.add.group(undefined, "background_grp");
		groups.background.z = -1;
		that.groups = groups;

		game.add.image(-900, -1100, 'lobby', undefined, groups.background);
		game.add.image(1200, -1247, 'security', undefined, groups.background);

		characters.push(Person(0, -500, 'fatman', 'adam'));
		characters.push(Person(70, -500, 'longHair', 'patrick'));

		player = Player(characters[0]);
		MoveLib.repeat(characters[0], 3000, 1000, MoveLib.PaceV);
		MoveLib.repeat(characters[1], 3000, 1000, MoveLib.PaceH);
		game.camera.focusOnXY(0, 0);

		game.world.sort('z');
	};

	var update = function () {
		player.update();
		characters.forEach(function (elem) {
			elem.update();
		});
	};

	var render = function () {

	};

	game = new Phaser.Game(1000, 640, Phaser.AUTO, "phaser",
			{preload: preload, create: create, update: update, render: render});
	return that;
}();

