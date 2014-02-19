define([], function() {

var imageLoader = new function() {

	this.ready = 0;

	this.tilesheet = new Image();
	this.tilesheet.src = "resources/images/tilesheet.png";

	this.foresttiles = new Image();
	this.foresttiles.src = "resources/images/foresttiles.png";

	this.druid = new Image();
	this.druid.src = "resources/images/druid.png";

	this.ready = 1;
}

return imageLoader;

});