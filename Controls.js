
var handleKey = function() {
	var hold = {};

	var that = {};

	var down = function(event){
		hold[event.keyCode] = true;

		if (program.currentGameState === gameStates.start) {
			if (hold[" ".charCodeAt(0)] === true) {
				program.gameInit();
			}
		}
	};

	var up = function(event){
		hold[event.keyCode] = false;
	};

	var update = function() {
		
		if (program.currentGameState === gameStates.game) {
			
		}
	};

	that.up = up;
	that.down = down;
	that.update = update;

	return that;
}();