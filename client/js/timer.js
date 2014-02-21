define(function() {

    var Timer = function(duration, startTime) {

        this.lastTime = startTime || 0;
        this.duration = duration;

        this.isOver = function(time) {
            var over = false;
       
            if((time - this.lastTime) > this.duration) {
                over = true;
                this.lastTime = time;
            }
            return over;
        }
    };

    return Timer;
});