
var Program = function () {
	var that = {};

	that.currentGameState = gameStates.start;
	var preload = function () {
		game.load.atlasJSONHash('fatman', 'character sprites/man04/man04sheet.png', 
								'character sprites/man04/man04sheet.json');
		game.load.image("redBox", "resources/redBox.png");
		game.load.image("lobby", "character\ Sprites/lobby.png");
		game.load.image("security", "character\ Sprites/security.png")
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

		game.add.image(-900, -1100, 'lobby');
		game.add.image(1200, -1247, 'security');
		
		characters.push(Person(0, 50, 'fatman'));
		characters.push(Person(70, 50, 'fatman'));
		player = Player(characters[0]);
		MoveLib.repeat(characters[0], 3000, 1000, MoveLib.PaceV);
		MoveLib.repeat(characters[1], 3000, 1000, MoveLib.PaceH);
		game.camera.focusOnXY(0, 0);
		//game.camera.follow(player.shape);
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

