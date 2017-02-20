/* global XEngine Player*/

var GamePlay = function (game) {
	this.player = null;
};

GamePlay.prototype = {
	
	start: function () {
		this.player = new Player(this.game, this.game.width /2, 800, 'player');
	},
	
	update : function (deltaTime) {

	},
};