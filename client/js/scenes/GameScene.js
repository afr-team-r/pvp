define(["coords", "scenes/Scene", "canvas"], function(Coords, Scene, canvasFactory) {


var GameScene = function() {

	var canvas = canvasFactory.canvasInput;
	var coords = new Coords();

	var readyFunction = function(stage) {

			var speed = 20;

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


			this.player = this.createElement();

			this.player.beginPath();
			this.player.fillStyle = "red";
			this.player.arc(coords.x, coords.y, 10, 0, Math.PI*2, true);
			this.player.fill();

			stage.append(this.player);	

			canvas.Input.keyDown([Input.Left, Input.Right]);
			canvas.Input.keyUp([Input.Left, Input.Right]);
	};

	var renderFunction = function(stage) {

			if (canvas.Input.isPressed(Input.Right)) {
	            this.player.x++;
	            coords.x++;
	        } else if (canvas.Input.isPressed(Input.Left)) {
	        	this.player.x--;
	        	coords.x--;
	        } else if (canvas.Input.isPressed(Input.Up)) {
	        	this.player.y--;
	        	coords.y--;
	        } else if (canvas.Input.isPressed(Input.Bottom)) {
	        	this.player.y++;
	        	coords.y++;
	        }

	    	stage.refresh();
	};

	  var sceneObj = {
	    name: "GameScene",
	    ready: readyFunction,
	    render: renderFunction
	 };

	this.createScene(sceneObj);
}

GameScene.prototype = new Scene();

return GameScene;
});