require(["jquery","game"], function($, Game) {

	var initGame = function() {

		/**  Canvas **/
		var background = document.getElementById("background");
		var entity = document.getElementById("entity");
		var foreground = document.getElementById("foreground");

		/** Cria o objeto do jogo **/
		game = new Game();

		/* Carrega tudo necssario */
		game.setup(background,entity, foreground);

		/** Inicia o jogo **/
		game.init();
	}

	initGame();
});