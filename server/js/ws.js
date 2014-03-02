var ws = require("websocket").server;
var http = require("http");

var Connection = function(id, connection, server) {

	var self = this;

    this.connection = connection;
    this.server = server;
    this.id = id;
    
    onClose = function(callback) {
        this.close_callback = callback;
    };
    
    listen = function(callback) {
        this.listen_callback = callback;
    };
    
    close = function(logError) {
        console.log("Closing connection to "+this.connection.remoteAddress+". Error: "+logError);
        this.connection.close();
    };

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

			delete self.connections[self.id];
	});	

};

var Server = function(port) {

	var self = this;

	this.numberOfConnections = 0;
	this.connections = {};

	httpserver = http.createServer(function(request,response) {
		response.writeHead(404);
		response.end();
	}).listen(port, function() {
		console.log("HTTP na porta " +port+ " retornando 404 ......... OK");
	});

	var socketServer = new ws({httpServer: httpserver, autoAcceptConnections: false});

	socketServer.on("request", function(request) {

			connection = request.accept("echo-protocol", request.origin);
			console.log("Conexao aceita - IP: " + connection.remoteAddress);

			var c = new Connection(self.numberOfConnections, connection, self);

			if(self.connection_callback) 
				self.connection_callback(c);

			self.addConnection(c);			
	});

	this.deleteConnection = function(id) {
		delete this.connections[id];
		this.numberOfConnections--;
	};

	this.addConnection = function(connection) {
		this.connections[connection.id] = connection;
		this.numberOfConnections++;
	};

	 this.onConnect = function(callback) {
        this.connection_callback = callback;
    };

};

module.exports = Server;

