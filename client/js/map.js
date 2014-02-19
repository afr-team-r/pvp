define(["jquery","game", "imageLoader"], function($,Game, ImageLoader) {

	var Map = function(layers) {

			var self = this;

			/** VARIAVEIS **/

			this.layers = layers;
			this.tileset = ImageLoader.foresttiles;

			this.tileSize = null;
			this.rowTileCount = null;
			this.colTileCount = null;
			this.imageNumTiles = null;

			this.ready = 0;

			this.getLayer = function(layerId) {
				return this.layers[layerId];
			}

			/** Retorna o vetor com as posicoes de colisao **/
			this.getColisaoGrid = function() {
				return this.layers[3].values;  
			}

			/** Retorna o valor do vetor de colisoes para x e y **/
			this.getColisaoValue = function(x ,y) {
				return this.getColisaoGrid()[(y*this.colTileCount) + x];
			}

			/**  Inicia o mapa, lendo do json mapFile **/
			this.init = function(mapFile) {

				$.get(mapFile, function(data) {

					self.tileSize = data.tilewidth;
					self.imageNumTiles = data.tilesets[0].imagewidth/self.tileSize;
					self.colTileCount = data.width;
					self.rowTileCount = data.height;

					$.each(self.layers, function(k,v) {
						self.layers[k].values = data.layers[k].data;
					});

					self.ready = 1;

				}, 'json');
			};	
	};

	return Map;
});