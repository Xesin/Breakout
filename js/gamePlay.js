/* global XEngine Player Ball*/
var currentLevel = 1;
var GamePlay = function (game) {
	this.player = null;
	this.ball = null;
	this.bricks = null;
};

GamePlay.prototype = {
	
	start: function () {
		this.game.add.sprite(0,0, 'background');
		this.game.physics.startSystem();
		this.player = new Player(this.game, this.game.width /2, 650, 'player');
		this.game.add.existing(this.player);
		this.bricks = this.game.add.group();
		this.setupLevel(1);
		this.spawnBall();
		this.ball.launch();
		this.win = false;
	},
	
	update : function (deltaTime) {
		if(!this.ball.inPlatForm){
			this.game.physics.overlap(this.ball, this.player);
			this.game.physics.overlap(this.ball, this.bricks);
		}
		if(this.bricks.childCount() == 0 && this.win == false){
			currentLevel++;
			this.win = true;
			this.game.input.onInputDown.addOnce(function(){
				this.game.state.restart();
			}, this);
		}
	},
	
	setupLevel: function (level) {
		var imageData = this.game.cache.image('level'+level).data;
		var line = 0;
		var column = 0;
		for(var i=0; i< imageData.length; i++){
			var pixelData = imageData[i];
			if(column > 17){ 
				column = 0;
				line++;
			}
			if(pixelData.r == 255 && pixelData.g == 255 && pixelData.b == 255){
				this.spawnBlock('blockPurple', i - (line * 18) , line);
			}else if(pixelData.r == 255){
				this.spawnBlock('blockRed', i- (line * 18), line);
			}else if(pixelData.g == 255){
				this.spawnBlock('blockGreen', i- (line * 18), line);
			}else if(pixelData.b == 255){
				this.spawnBlock('blockBlue', i- (line * 18), line);
			}
			column++;
		}
	},
	
	spawnBlock: function (sprite, column, line) {
		var spriteObject = this.bricks.add(new XEngine.Sprite(this.game, (column+1) * 64, (line +1 )*32, sprite));
		this.game.physics.enablePhysics(spriteObject);
		spriteObject.body.gravity = 0;
	},
	
	spawnBall: function () {
		this.ball = this.game.add.existing(new Ball(this.game, this.game.width / 2 - 30, this.game.height /2, 'ball', this.player));
	},
	
	lostBall:function () {
		this.ball.body.velocity.setTo(0);
		this.ball.inPlatForm = true;	
		this.player.lifes--;
		this.game.input.onInputDown.addOnce(function () {
			this.ball.launchFromPlatform();
		},this);
	},
};