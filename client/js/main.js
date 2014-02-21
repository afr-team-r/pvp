require(["jquery","game"], function($, Game) {

	var initGame = function() {

		/**  Canvas **/
		var background = document.getElementById("background");
		var entities = document.getElementById("entities");
		var foreground = document.getElementById("foreground");

		/** Cria o objeto do jogo **/
		game = new Game();

		/* Carrega tudo necssario */
		game.setup(background,entities, foreground);

		/** Inicia o jogo **/
		game.init();
	}

	initGame();
});