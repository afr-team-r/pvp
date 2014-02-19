define(["jquery"], function($) {

	var Properties = new function() {

		var self = this;
		var propertiesFile = "resources/properties.json";

		this.propertiesMap = null;
		this.ready = 0;

		$.get(propertiesFile, function(data) {
			self.propertiesMap = data;		
			self.ready = 1;	
		}, 'json');

		this.get = function(key) {
			return this.propertiesMap[key];
		}

		this.set = function(key, value) {
			this.propertiesMap[key] = value;
		}
	}

	return Properties;
});