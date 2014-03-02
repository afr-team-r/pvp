Types = require("./types.js");

module.exports = Game = function() {

	this.entities = {};
	this.entitiesGrid = [];

	this.onPlayerConnect = function(callback) {
        this.connect_callback = callback;
    };	

	 this.onPlayerConnect(function(player) {
	 	console.log(player);
	 });
};