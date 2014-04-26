
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
		player = Player();
		characters.push(Person());
	};

	var update = function () {
		requestAnimFrame (update);
		var now = new Date().getTime();
		var dt = now - (time || now);
		time = now;

		player.update(dt);
		characters.forEach(function (elem) {
			elem.update(dt);
		});
		renderer.render(stage);
	};
	
	that.startInit = startInit;
	that.update = update;

	return that;
};

var program = new Program();
program.startInit();
program.update();