var ws = require("websocket").server;
var http = require("http");

/********* CONNECTION *********/

/* Classe para abstrair uma conexao */
var Connection = function(id, connection, server) {

	var self = this;

    this.connection = connection;
    this.server = server;
    this.id = id;

    /* CALLBACKS */
    
    this.onClose = function(callback) {
        this.close_callback = callback;
    };
    
    this.listen = function(callback) {
        this.listen_callback = callback;
    };

    /* METODOS */
    
    this.close = function(logError) {
        console.log("Closing connection to "+this.connection.remoteAddress+". Error: "+logError);
        this.connection.close();
    };

    this.send = function(msg) {
    	var msgStr = JSON.stringify(msg);

		console.log("Sending " + msgStr);
		self.connection.send(msgStr);
    };

    /* CHAMA OS CALLBACKS */

	this.connection.on("message", function(message) {
		if(self.listen_callback) {
			if(message.type == 'utf8') {
				try {
					self.listen_callback(JSON.parse(message.utf8Data));
				} catch(e) {
					throw e;
				}
			}
		}
	});

	this.connection.on("close", function(reasonCode, description) {
			console.log("Conexao fechada - Codigo " + reasonCode + ": " + description);

			if(self.close_callback)
				self.close_callback();

			self.server.deleteConnection(self.id);
	});	
};

/********** SERVER ***********/

/* Classe que reperesenta o servidor geral do jogo */
var Server = function(port) {

	var self = this;

	/* apenas para saber quantos estao online no geral */
	this.numberOfConnections = 0;

	/* Os IDs que serao atribuidos as conexoes,
	   esse valor eh incrementado a cada nova conexao */
	this.connectionsId = 0;

	/* Estrutura para armazenar todas as conexoes */
	this.connections = {};

	/* Servidor HTTP respondendo */
	httpserver = http.createServer(function(request,response) {
		response.writeHead(404);
		response.end();
	}).listen(port, function() {
		console.log("HTTP na porta " +port+ " ......... OK");
	});

	/* Socket server (precisa ser severamente melhorado) */
	var socketServer = new ws(
		{
			httpServer: httpserver, 
			autoAcceptConnections: false
		}
	);

	/* Ao receber uma nova conexao */
	socketServer.on("request", function(request) {

			/* Aceita essa nova conexao */
			connection = request.accept("echo-protocol", request.origin);
			console.log("Conexao aceita - IP: " + connection.remoteAddress);

			/* cria objeto Connection */
			var c = new Connection(self.connectionsId++, connection, self);

			/* Chama o callback onconnect */
			if(self.connection_callback) 
				self.connection_callback(c);

			/* Adiciona a nova conexao a estrutura */
			self.addConnection(c);			
	});

	/* METODOS */

	this.deleteConnection = function(id) {
		delete this.connections[id];
		this.numberOfConnections--;

		console.log(this.numberOfConnections + " players online");
	};

	this.addConnection = function(connection) {
		this.connections[connection.id] = connection;
		this.numberOfConnections++;

		console.log(this.numberOfConnections + " players online");
	};

	/* Callbacks */

	this.onConnect = function(callback) {
        this.connection_callback = callback;
    };
};

module.exports = Server;

