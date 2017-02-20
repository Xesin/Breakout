/* global XEngine*/

var Player = function(game, posX, posY, sprite){
    XEngine.Sprite.call(this, game, posX, posY, sprite);
    this.anchor.setTo(0.5);
    this.game.physics.enablePhysics(this);
    this.body.gravity = 0;
};


Player.prototype = Object.create(XEngine.Sprite);
Player.prototype.constructor = Player;

Player.prototypeExtends = {
    update: function (deltaTime) {
        this.updateMovement();
    },
    
    updateMovement: function () {
        this.position.x = this.input.pointer.x;    
    },
    
};

Object.apply(Player.prototype, Player.prototypeExtends);