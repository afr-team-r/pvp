define(["canvas"], function(canvasFactory) {

var Scene = function() {

	var name;
	var canvas;
	var canvas_scene;

	var self = this;

	this.init = function(sceneName) {
		this.setName(sceneName);

		return self;
	}

	this.setName = function(newName) {
		name = newName;
	}

	this.getName = function() {
		return name;
	}

	this.createScene = function(sceneObject) {

		canvas = canvasFactory.canvasInput.ready(function() {
	        canvas.Scene.call(name);
	 });

	 canvas.Scene.new(sceneObject);
	}

};

return Scene;
});