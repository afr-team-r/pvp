var ws = require("websocket").server;
var http = require("http");

/** Configuracoes **/

var porta = 5000;

/** Acessos HTTP:5000 retornarao 404 **/

var server = http.createServer(function(request,response) {
	response.writeHead(404);
	response.end();

}).listen(porta, function() {
	console.log("HTTP na porta 5000 retornando 404 ......... OK");
});

/** O tratamento do socket **/

var socketServer = new ws({httpServer: server,autoAcceptConnections: false});

console.log("WebSocket na porta 5000 esperando conexoes ......... OK");

var jogadores = [];

/** Ao receber uma requisicao **/
socketServer.on("request", function(request) {

	if(jogadores.length < 200) {

		var connection = request.accept("echo-protocol", request.origin);

		console.log("Conexao aceita - IP: " + connection.remoteAddress);
		jogadores.push(connection);

		/** Trata as mensagens enviadas pelos jogadores **/
		connection.on("message", function(event) {
			var content = JSON.parse(event.utf8Data);
			console.log("IN: " + JSON.stringify(content));
		});

		/** Trata fechamento da conexao **/
		connection.on("close", function(reasonCode, description) {
			console.log("Conexao fechada - Codigo " + reasonCode + ": " + description);
		});

	} else {
		request.reject(406,"Lotado!");	
		console.log("Conexao negada!");
	}

	console.log("Numero de jogadores no servidor: " + jogadores.length);	
});


/** Utils **/

function sendAll(msg) {
	for(i=0; i<jogadores.length;i++) {
    	jogadores[i].sendUTF(msg);
		console.log("OUT: " + msg);
	}
}


