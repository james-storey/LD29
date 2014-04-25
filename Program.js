

var Program = function () {
	var init () {

		update();
	};

	var update () {
		requestAnimFrame (update);

	};

	init();
}();