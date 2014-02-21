define(["timer"], function(Timer) {
	
	var Animation = function(numFrames, currentFrame, frameRate, loop) {

		this.currentFrame = currentFrame;

		var timer = new Timer(frameRate);
		var counter = 0;

		this.animate = function() {

			if(loop || counter < numFrames) {
				if(timer.isOver(new Date().getTime())) {

					this.currentFrame = (this.currentFrame+1) % numFrames;
					counter++;
				}
			}
		};
	};

	return Animation;

});