
var stage, renderer, player;
var gameStates = {start: 0, game: 1, gameOver: 2 };
var characters = [];
var width = 1000, height = 640;
var time = 0;

var Program = function () {
	var that = {};

	that.currentGameState = gameStates.start;

	stage = new PIXI.Stage(0xeaeaea, true);
	renderer = PIXI.autoDetectRenderer(width, height);
	document.body.appendChild(renderer.view);
	window.addEventListener('keydown', handleKey.down, false);
	window.addEventListener('keyup', handleKey.up, false);

	var startInit = function () {
		that.currentGameState = gameStates.start;
	};

	var update = function () {
		requestAnimFrame (update);
		var now = new Date().getTime();
		var dt = now - (time || now);
		time = now;

		renderer.render(stage);
	};
	
	that.startInit = startInit;
	that.update = update;

	return that;
};

var program = new Program();
program.startInit();
program.update();