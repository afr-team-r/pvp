define(["canvas"], function(canvasFactory) {

var canvas = canvasFactory.canvasAnimation;

var Player = function(element) {

	var playerElement = element;
	var speed = 5;
	var animationFrequence = 6;

	var spriteAnimation = {
                images: "img_id",
                animations: {
                    down: {
                        frames: [0,2],
                        size: {
                            width: 32,
                            height: 32
                        },
                        frequence: animationFrequence
                    },
                    up: {
                        frames: [36,38],
                        size: {
                            width: 32,
                            height: 32
                        },
                        frequence: animationFrequence
                    },
                    left: {
                        frames: [12,14],
                        size: {
                            width: 32,
                            height: 32
                        },
                        frequence: animationFrequence
                    },
                    right: {
                        frames: [24,26],
                        size: {
                            width: 32,
                            height: 32
                        },
                        frequence: animationFrequence
                    }
                }
            };

     var animation = canvas.Animation.new(spriteAnimation);
     animation.add(playerElement);

     this.getX = function() {
     	return x;
     }

     this.getY = function() {
     	return y;
     }

     this.getPlayerElement = function() {
     	return playerElement;
     }

     this.moveDown = function() {
     	playerElement.y+=speed;
		animation.play("down", "stop");
     }

     this.moveUp = function() {
     	playerElement.y-=speed;
		animation.play("up", "stop");
     }

     this.moveRight = function() {
     	playerElement.x+=speed;
		animation.play("right", "stop");
     }

     this.moveLeft = function() {
     	playerElement.x-=speed;
		animation.play("left", "stop");
     }
}

return Player;

});