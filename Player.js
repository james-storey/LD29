

var Player = function (startingBody) {
	var that = {};

	var keyAction = false;

	var currentAttachment = startingBody;

	var shape = game.add.graphics(0, 0);
	shape.name = "player";

	shape.lineStyle(3, 0x0000ff, 1);
	shape.drawRect(-30, -30, 60, 60);
	game.camera.follow(currentAttachment.shape, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

	currentAttachment.group.add(shape);
	//var lis = new Signal();
	//shape.Signal.add(listener,this);
	var switchBodies = function (target) {
		// play anim
		currentAttachment = target;
		game.camera.follow(currentAttachment.shape, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

		// automatically removes from the last display group, no need to
		// call group.remove first
		currentAttachment.group.add(shape);

		// trigger a thought callout
		game.time.events.add(1000, function() {
			currentAttachment.think();
		});

		that.currentAttachment = currentAttachment;
	};

	var nudge = function(x,y) {
		if(!game.tweens.isTweening(currentAttachment.shape)){
			var nudgetween = game.add.tween(currentAttachment.shape);
			if(x != 0)nudgetween.to({x: currentAttachment.shape.position.x + x*25}, 100, Phaser.Easing.Linear.None, true)
						  .to({x: currentAttachment.shape.position.x}, 100, Phaser.Easing.Linear.None, true);
			if(y != 0)nudgetween.to({y: currentAttachment.shape.position.y + y*25}, 100, Phaser.Easing.Linear.None, true)
						  .to({y: currentAttachment.shape.position.y}, 100, Phaser.Easing.Linear.None, true);
		}
	};

	var update = function() {
		if(keyAction === false) {
			if(upKey.isDown === true)
			{
				nudge(0,-1);
			}
			else if(downKey.isDown === true)
			{
				nudge(0, 1);
			}
			else if(rightKey.isDown === true)
			{
				nudge(1, 0);
			}
			else if(leftKey.isDown === true)
			{
				nudge(-1, 0);
			}
			else if(spaceKey.isDown === true)
			{
				var closestHost = null;
				var shortestDist = 999999;
				characters.forEach(function(elem) {

					if(elem !== currentAttachment)
					{
						var e = elem.shape.position;
						var c = currentAttachment.shape.position;
						var dist = Phaser.Math.distance(e.x, e.y, c.x, c.y);
						console.log(dist);
						if(dist < shortestDist)
						{
							shortestDist = dist;
							closestHost = elem;
						}
					}
				});

				if(shortestDist < 100)
				{
					switchBodies(closestHost);
				}
			}
			keyAction = true;
		}

		if(upKey.isDown === false &&
			downKey.isDown === false &&
			rightKey.isDown === false &&
			leftKey.isDown === false &&
			spaceKey.isDown === false)
		{
			keyAction = false;
		}

		shape.x = currentAttachment.shape.position.x;
		shape.y = currentAttachment.shape.position.y;
	};

	var debugUpdate = function () {
		var speed = 10;
		if(upKey.isDown === true)
		{
			shape.y -= speed;
		}
		else if(downKey.isDown === true)
		{
			shape.y += speed;
		}
		else if(rightKey.isDown === true)
		{
			shape.x += speed;
		}
		else if(leftKey.isDown === true)
		{
			shape.x -= speed;
		}

	};

	var debugMode = function(isDebug)
	{
		if(isDebug)
		{
			that.update = debugUpdate;
			game.camera.follow(shape);
		}
		else
		{
			that.update = update;
			game.camera.follow(currentAttachment.shape,
				Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
		}
	};

	that.shape = shape;
	that.nudge = nudge;
	that.update = update;
	//that.nudgetween = nudgetween;
	that.debugMode = debugMode;
	that.switchBodies = switchBodies;
	that.currentAttachment = currentAttachment;
	return that;
};
