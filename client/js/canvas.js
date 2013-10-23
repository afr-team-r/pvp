define(function() {

return {
	canvas : CE.defines("canvas"),
	canvasInput : CE.defines("canvas").extend(Input),
	canvasAnimation : CE.defines("canvas").extend(Animation),
	canvasAll : CE.defines("canvas").extend(Animation).extend(Input)
};

});