/* global XEngine */

function initGame(argument) {
    var game = new XEngine.Game(600,800, 'gameCanvas');
    
    game.frameLimit = 60;														
    game.setBackgroundColor('black');	
    game.scale.scaleType = XEngine.Scale.SHOW_ALL;
    game.scale.updateScale();
    game.state.add('loading', Loading);												//Añadimos el estado del menú
    game.state.start('loading');
}

var Loading = function (game) {
	
};

Loading.prototype = {
	
	preload: function () {														//Cargamos los assets del juego
		
	},
	
	start: function () {
	    var text = this.game.add.text(50,50, 'Cosa', 20, 'Arial', 'white');
	    text.anchor.setTo(0.5);
	},
	
	update : function (deltaTime) {

	},
};