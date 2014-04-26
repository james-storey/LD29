
var Program = function () {
	var that = {};

	that.currentGameState = gameStates.start;
	var preload = function () {

	};

	var create = function () {
		game.stage.backgroundColor = 0xeaeaea;

		game.world.setBounds(-1000, -1000, 2000, 2000);

		that.currentGameState = gameStates.start;
		player = Player();
		characters.push(Person());
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

