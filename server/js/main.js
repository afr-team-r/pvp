var Server = require("./ws.js"),
	Game = require("./game.js"),
	Player = require("./player.js");

function main() {

	// Instancia do servidor
	var server = new Server(5000),
		// Apenas um mundo, por enquanto
		game = new Game();

	/* Implementa o callback de onConnect do servidor */
	server.onConnect(function(connection) {

			/* Se o mundo atual ainda nao esta carregado */
			if(game && !game.isReady()) {

				/* Carrega-o */
				game.init();

				var wait = setInterval(function() {
					/* Quando estiver pronto */
					if(game.isReady()) {
						clearInterval(wait);
						/* Chama o callback de player conectado ao mundo */
						game.connect_callback(new Player(connection, game));
					}
				}, 500);

			} else { /* Mundo ja estava carregado */

				/* Apenas chama o callback de player conectado ao mundo */
				game.connect_callback(new Player(connection, game));
			}
	});
};

/* Inicia o servidor */
main();