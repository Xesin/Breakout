/* global XEngine Player*/

var Ball = function(game, posX, posY, sprite, player){
    XEngine.Sprite.call(this, game, posX, posY, sprite);
    this.anchor.setTo(0.5);
    this.game.physics.enablePhysics(this);
    this.body.gravity = 0;
    this.body.staticFriction = 0;
    this.body.restitution = 1;
    this.directionAngle = 0;
    this.alreadyCollide = false;
    this.inPlatForm = false;
    this.playerRef = player;
};


Ball.prototype = Object.create(XEngine.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.launch = function () {
    this.body.velocity.x = 250;
    this.body.velocity.y = 400;
};

Ball.prototype.launchFromPlatform = function () {
    this.body.velocity.x = 150;
    this.body.velocity.y = -400;
    this.inPlatForm = false;
};

Ball.prototype.update = function () {
    this.alreadyCollide = false;
    if(this.inPlatForm){
        this.body.position.x = this.playerRef.position.x;
        this.body.position.y = this.playerRef.position.y - (this.playerRef.height / 2) - (this.width / 2);
    }else{
        if(this.body.max.x > this.game.width){                                      //Colisiona con el mundo por la derecha
            this.game.add.audio('hit', true);
            this.body.position.x = this.game.width - this.width / 2;
            this.body.velocity.x *= -1;
        }else if (this.body.min.x < 0){                                             //Colisiona con el mundo por la izquierda
            this.game.add.audio('hit', true);
            this.body.position.x = this.width / 2;
            this.body.velocity.x *= -1;
        }else if(this.body.max.y > this.game.height){                               //Colisiona con el mundo por abajo
            this.game.state.currentState.lostBall();
        }else if(this.body.min.y < 0){                                              //Colisiona con el mundo por arriba
            this.game.add.audio('hit', true); 
            this.body.position.y = this.height / 2;
            this.body.velocity.y *= -1;
        }
    }
    
    
};
    
Ball.prototype.onCollision = function (other) {
    if(this.alreadyCollide) return;
    var audio = this.game.add.audio('hit', true);
    audio.onComplete.addOnce(function () {
        audio.destroy();
    });
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