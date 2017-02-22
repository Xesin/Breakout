/* global XEngine Player*/

var Ball = function(game, posX, posY, sprite){
    XEngine.Sprite.call(this, game, posX, posY, sprite);
    this.anchor.setTo(0.5);
    this.game.physics.enablePhysics(this);
    this.body.gravity = 0;
    this.body.staticFriction = 0;
    this.body.restitution = 1;
    this.directionAngle = 0;
    this.alreadyCollide = false;
};


Ball.prototype = Object.create(XEngine.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.launch = function () {
    this.body.velocity.x = 0;
    this.body.velocity.y = -250;
};

Ball.prototype.update = function () {
    this.alreadyCollide = false;
    if(this.body.max.x > this.game.width){
        this.body.position.x = this.game.width - this.width;
        this.body.velocity.x *= -1;
    }else if (this.body.min.x < 0){
        this.body.position.x = this.width;
        this.body.velocity.x *= -1;
    }else if(this.body.max.y > this.game.height){
        this.destroy();
    }else if(this.body.min.y < 0){
        this.body.position.y = this.height;
        this.body.velocity.y *= -1;
    }
};
    
Ball.prototype.onCollision = function (other) {
    if(this.alreadyCollide) return;
    if(Player.prototype.isPrototypeOf(other)){
        this.alreadyCollide = true;
        if(this.body.velocity.y < 0) return;                                    //No hacer nada con la colisión si la bola ya está yendo hacía los bloques
        var diff = other.position.x - this.position.x;
        this.body.velocity.y *= -1;                                             //Invertimos la velocidad vertical
        this.body.velocity.x = (-10 * diff);                                    //Ajustamos la velocidad horizontal según en qué parte de la paleta ha chocado
    }else if(other){
        this.alreadyCollide = true;
        if(this.position.x > other.position.x + other.width || this.position.x < other.position.x){
            this.body.velocity.x *= -1;
        }else if(this.position.y >= other.position.y + other.height || this.position.y <= other.position.y){
            this.body.velocity.y *= -1;
        }
        other.destroy();
    }
};