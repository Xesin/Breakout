/* global XEngine*/

var Player = function(game, posX, posY, sprite){
    XEngine.Sprite.call(this, game, posX, posY, sprite);
    this.anchor.setTo(0.5);
    this.game.physics.enablePhysics(this);
    this.body.gravity = 0;
    this.lifes = 3;
};


Player.prototype = Object.create(XEngine.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update  = function (deltaTime) {
        this.updateMovement();
}
    
Player.prototype.updateMovement = function () {
        this.position.x = this.game.input.pointer.x;    
}

//Object.assign(Player.prototype, Player.prototypeExtends);