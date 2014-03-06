define(["jquery","game", "types"], function($, Game, Types) {

	var Client = function(host, port) {

		var self = this;

		this.host = host;
		this.port = port;

		this.socket = null;
		this.handlers = [];

		this.registerHandler = function() {
			this.handlers[Types.Messages.WELCOME] = this.receiveWelcome;
		};
        
		this.init = function() {

			 var url = "ws://"+ this.host +":"+ this.port +"/";
			 socket = new WebSocket(url, "echo-protocol");

			socket.addEventListener("open", function(event) {
				alert("Connected!");
			});

			socket.addEventListener("close", function(err) {
				alert("Connection lost!");
			});

			socket.addEventListener("message", function(event) {
				var messagejson = JSON.parse(event.data);
				
				self.handleAction(messagejson);
			});

			this.registerHandler();
		
		};

		this.send = function(msg) {
			socket.send(JSON.stringify(msg));
		}

		this.handleAction = function(data) {			

			var action = data[0];

			if(self.handlers[action]) {
				this.handlers[action].call(this, data);
			}
		};

		/* Handlers implementation */

		this.receiveWelcome = function(data) {
			alert("Received welcome: " + data);

			 if(this.welcome_callback) {
                this.welcome_callback(id, hp, sp, x, y);
            }
		}; 

		/* Callbacks */

		  this.onWelcome = function(callback) {
            this.welcome_callback = callback;
        };

        /* Sender action methods */

        this.sendWelcome = function() {
        	this.send([Types.Messages.WELCOME]);
        };

	};

	return Client;
});