define(["scenes/Scene", "canvas", "Player"], function(Scene, canvasFactory, Player) {


var GameScene = function() {

	var canvas = canvasFactory.canvasAll;

	var readyFunction = function(stage) {

			/* REMOVER DEPOIS, SUBSTITUIR POR MAPA */
			var WIDTH = 1500;
			var HEIGHT = 600;

			this.tela = this.createElement();

			this.tela.fillStyle = "white";
			this.tela.strokeStyle = "black";
			this.tela.beginPath();
			this.tela.rect(0, 0, WIDTH, HEIGHT);
			this.tela.closePath();
			this.tela.fill();
			this.tela.stroke();

			stage.append(this.tela);
			/* /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ */


			this.jogador = new Player(this.createElement())
       		stage.append(this.jogador.getPlayerElement());

       		// FIXME: WTF
       		this.jogador.moveRight();

			canvas.Input.keyDown([Input.Left, Input.Right]);
			canvas.Input.keyUp([Input.Left, Input.Right]);
	};

	var renderFunction = function(stage) {

			if (canvas.Input.isPressed(Input.Right)) {
	            this.jogador.moveRight();
	        } else if (canvas.Input.isPressed(Input.Left)) {
	        	this.jogador.moveLeft();
	        } else if (canvas.Input.isPressed(Input.Up)) {
	        	this.jogador.moveUp();
	        } else if (canvas.Input.isPressed(Input.Bottom)) {
	        	this.jogador.moveDown();
	        }

	    	stage.refresh();
	};

	  var sceneObj = {
	    name: "GameScene",
	    materials: {
	    	images: {
	    		img_id: "resources/images/sprites.png"
	    	}
	    },
	    ready: readyFunction,
	    render: renderFunction
	 };

	this.createScene(sceneObj);
}

GameScene.prototype = new Scene();

return GameScene;
});