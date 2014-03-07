define(["jquery","game", "types"], function($, Game, Types) {

	var Client = function(host, port) {

		var self = this;

		this.host = host;
		this.port = port;

		this.socket = null;
		this.handlers = [];

		this.registerHandler = function() {
			this.handlers[Types.Messages.WELCOME] = this.receiveWelcome;
			this.handlers[Types.Messages.MOVE] = this.receiveMove;
			this.handlers[Types.Messages.SPAWN] = this.receiveSpawn;
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

		this.isReady = function() {
			return this.socket.readyState === 1;
		};

		this.handleAction = function(data) {			

			var action = data[0];

			if(self.handlers[action]) {
				this.handlers[action].call(this, data);
			}
		};

		/* Handlers implementation */

		this.receiveWelcome = function(data) {

			var id = data[1],
				hp = data[2],
				sp = data[3],
				x = data[4],
				y = data[5];

			 if(this.welcome_callback) {
                this.welcome_callback(id, hp, sp, x, y);
            }
		}; 

		this.receiveMove = function(data) {

			var id = data[1],
				x = data[2],
				y = data[3],
				spriteRow = data[4];

			if(this.move_callback) {
                this.move_callback(id, x, y, spriteRow);
            }
		};

		this.receiveSpawn = function(data) {

			var id = data[1],
				x = data[2],
				y = data[3];

			if(this.spawn_callback) {
                this.spawn_callback(id, x, y);
            }
		};

		/* Callbacks */

		this.onWelcome = function(callback) {
            this.welcome_callback = callback;
        };

        this.onMove = function(callback) {
            this.move_callback = callback;
        };

        this.onSpawn = function(callback) {
            this.spawn_callback = callback;
        };

        /* Sender action methods */

        this.sendWelcome = function() {
        	this.send([Types.Messages.WELCOME]);
        };

        this.sendMove = function(direction) {
        	this.send([Types.Messages.MOVE, direction]);
        };

	};

	return Client;
});