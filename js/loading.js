/* global XEngine */

function initGame(argument) {
    var game = new XEngine.Game(600,800, 'gameCanvas');
    
    game.frameLimit = 60;														
    game.setBackgroundColor('black');	
    game.state.add('loading', Loading);												//Añadimos el estado del menú
    game.state.start('loading');
}

var Loading = function (game) {
	
};

Loading.prototype = {
	
	preload: function () {														//Cargamos los assets del juego
		
	},
	
	start: function () {
	    
	},
	
	update : function (deltaTime) {

	},
};