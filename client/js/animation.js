define(["timer"], function(Timer) {
	
	var Animation = function(numFrames, currentFrame, frameRate, loop) {

		this.numFrames = numFrames;
		this.currentFrame = currentFrame;

		var timer = new Timer(frameRate);
		var counter = numFrames;

		this.animate = function() {

			if(loop || counter < numFrames) {
				if(timer.isOver(new Date().getTime())) {

					this.currentFrame = (this.currentFrame+1) % this.numFrames;
					counter++;
				}
			}
		};

		this.restartAnimation = function() {
			counter = 0;
		};


	};

	return Animation;

});