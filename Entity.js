

var Entity = function (sub) {
	var that = sub || {};

	var execute = function(name) {
		// return a function, if it exists apply all 'actual' args after the first to the function
		var args = [arguments[1]];
		return that[name] && that[name].apply(null, args);
	};

	var update = function() {

	};

	that.execute = execute;
	that.update = update;

	return that;	
};