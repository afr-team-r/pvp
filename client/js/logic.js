require(["scenes/GameScene"], function(gameScene) {

new gameScene().init("GameScene");

});

/*var initApp = function() {

	function Iniciar() {

		ctx = document.getElementById("canvas").getContext("2d");

		$("#hostInput").val("ws://localhost:5000");

		registerHtmlCallbacks();

		Atualizar();

	//	return setInterval(Atualizar, 20);
	}

	function Desenhar() {

		 this.player = this.scene.createElement();

		 this.player.beginPath();
		 this.player.fillStyle = "red";
		 this.player.arc(coord.x, coord.y, 10, 0, Math.PI*2, true);
		 this.player.fill();

		 stage.append(this.player);

	/*	for(var i =0; i < serverCoord.length; i++) {
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.arc(JSON.parse(serverCoord[i]).x, JSON.parse(serverCoord[i]).y,10, 0, Math.PI*2, true);
			ctx.fill();
		} 

	}

	function LimparTela() {

 		this.tela = canvas.scene.createElement();

		this.tela.fillStyle = "white";
		this.tela.strokeStyle = "black";
		this.tela.beginPath();
		this.tela.rect(0, 0, WIDTH, HEIGHT);
		this.tela.closePath();
		this.tela.fill();
		this.tela.stroke();

		stage.append(this.tela);
	}

	function Atualizar(stage) {
		LimparTela();    
		Desenhar();
	}

	function KeyDown(evt){
		switch (evt.keyCode) {
		    case 38:  /*seta para cima 
		        if (coord.y - speed > 0){
		            coord.y -= speed;
		        }
		        break
		    case 40:  /*set para baixo
		        if (coord.y + speed < HEIGHT){
		            coord.y += speed;
		        }
		        break;
		    case 37:  /*set para esquerda
		        if (coord.x - speed > 0){
		            coord.x -= speed;
		        }
		        break;
		    case 39:  /*seta para direita
		        if (coord.x + speed < WIDTH){
		            coord.x += speed;
		        }
		        break;
		}

		socket.send(JSON.stringify(coord));
	}

	/** REGISTER CALLBACKS *

	function registerHtmlCallbacks() {

	   $("#connectButton").click(function() {
	   		socket = new WebSocket($("#hostInput").val(), "echo-protocol");
			registerSocketCallbacks();
	   });

		window.addEventListener('keydown', KeyDown, true);
	}

	function registerSocketCallbacks() {

		socket.addEventListener("open", function(event) {
		      $("#status").html("Connected!");
		 });

		socket.addEventListener("message", function(event) {
			var messagejson = JSON.parse(event.data);

		//	coord.x = serverCoord.x;
		//	coord.y = serverCoord.y;

			serverCoord = messagejson.slice(0);		

		});

		socket.addEventListener("error", function(err) {
			 $("#status").html("Not connected - HOST INVALID!");	
		});

		socket.addEventListener("close", function(err) {
			 $("#status").html("Not connected - CLOSED CONNECTION!");	
		});
	}  

	/** START THE FUNCTION*

	Iniciar();
};

//initApp(); */

