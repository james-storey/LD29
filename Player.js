

var Player = function (startingBody) {
	var that = {};

	Entity(that);
	var keyAction = false;

	var currentAttachment = startingBody;

	var shape = game.add.graphics(0, 0);
	shape.lineStyle(3, 0x0000ff, 1);
	shape.drawRect(-30, -30, 60, 60);


	var switchBodies = function (target) {
		// play anim
		currentAttachment = target;
	};

	var nudge = function(x,y) {
		currentAttachment.shape.position.x += x * 100;
		currentAttachment.shape.position.y += y * 100;
	};

	that.update = function() {
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
						var dist = Math.sqrt(Math.pow(elem.shape.position.x - currentAttachment.shape.position.x, 2) +
											Math.pow(elem.shape.position.y - currentAttachment.shape.position.y, 2));
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

		if(upKey.isDown === false && downKey.isDown === false && rightKey.isDown === false && leftKey.isDown === false && spaceKey.isDown === false)
		{
			keyAction = false;
		}

		shape.position.x = currentAttachment.shape.position.x;
		shape.position.y = currentAttachment.shape.position.y;
	};

	that.shape = shape;
	that.nudge = nudge;
	that.switchBodies = switchBodies;
	return that;
};