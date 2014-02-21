define(["map"], function(Map) {


	var Updater = function(game) {

		this.game = game;

		this.player = game.player;
		this.world = game.world;

		this.running = 1;

		this.start = function() {
			this.running = 1;
		}

		this.stop = function() {
			this.running = 0;
		}

		this.update = function() {
			this.player.move(this.world);
		}


	};

return Updater;

});