var fs = require("fs");

 	/* for now, LAYERS:

		 0: background
		 1: objects not passable
		 2: objects passable
		 3: colision
 	*/

/* Reperesentacao de um
	mapa de colisoes */
var Map = function() {

	var self = this;

	/* Se esta carregado */
	this.ready = false;
	
	/* Altura, largura e 
		o array de colisoes */
	this.width;
	this.height;
	this.colisions = [];

	/* Carrega a bagassa */
	this.init = function() {

		/* O nome do mapa devera ser dinamico, dependendo do mundo escolhido */
	    fs.readFile("../map/mapa.json", 'utf8', function(err, json_string) {
	        if(err) {
	            console.error("Could not open config file:", err.path);
	        } else {
	        	/* Parseia o json lido para um objeto */
	        	var json = JSON.parse(json_string);

	        	/* Popula as propriedades  */
	        	self.colisions = json.layers[3].data;
	        	self.width = json.width;
	        	self.height = json.height;

	        	/* E eh isso */
	        	console.log("Colisions loaded: width: " + self.width + " | height: " + self.height);
	        	self.ready = true;
	        }
	    });
	};

	/* Retorna o numero da colisao naquela posicao do mapa.
		Diferente de zero, ha colisao */
	this.isColision = function(x,y) {
		return this.colisions[(y*this.width) + x];
	};
};

module.exports = Map;