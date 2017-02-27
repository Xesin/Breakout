/* global XEngine Player Ball*/
var currentLevel = 1;
var GamePlay = function (game) {
	this.player = null;
	this.ball = null;
	this.bricks = null;
	this.textStyle = {
		font: 'PressStart',
		font_size: 20,
		font_color: 'white',
		stroke_width: 8,
		stroke_color: 'black'
	};
};

GamePlay.prototype = {
	
	start: function () {
		this.game.add.sprite(0,0, 'background');

		this.game.physics.startSystem();
		this.player = new Player(this.game, this.game.width /2, 650, 'player');
		this.game.add.existing(this.player);
		this.bricks = this.game.add.group();
		this.setupLevel(currentLevel);
		this.spawnBall();
		this.ball.launch();
		this.win = false;
		this.game.input.onKeyDown.add(function (event) {
			if(event.keyCode == 83){
				this.skipLevel();
			}
		}, this);
		if(currentLevel != 3){
			this.game.add.text(15,15, 'Pulsa S para pasar de nivel', this.textStyle);
		}
	},
	
	update : function (deltaTime) {
		if(!this.ball.inPlatForm){
			this.game.physics.overlap(this.ball, this.player);
			this.game.physics.overlap(this.ball, this.bricks);
		}
		if(this.bricks.childCount() == 0 && this.win == false){
			this.win = true;
			this.stopBall();
			if(currentLevel == 3){
				var text = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Te has pasado el juego!!! Haz click para volver al menú', this.textStyle);
				text.anchor.setTo(0.5);
				this.game.input.onInputDown.addOnce(function(){
					this.game.state.start('menu');
				}, this);
			}else{
				var nextLevelText = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Te has pasado el nivel!!! Haz click para ir al siguiente', this.textStyle);
				nextLevelText.anchor.setTo(0.5);
				currentLevel++;
				this.game.input.onInputDown.addOnce(function(){
					this.game.state.restart();
				}, this);
			}
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
		this.stopBall();
		this.player.lifes--;
		if(this.player.lifes <= 0){
			var text = this.game.add.text(this.game.width / 2, this.game.height / 2, 'No te quedan vidas :(. Click para volver a intentar', this.textStyle);
			text.anchor.setTo(0.5);
			this.game.pause = true;
			this.game.input.onInputDown.addOnce(function () {
				this.game.pause = false;
				this.game.state.restart();
			},this);
		}else{
			this.game.input.onInputDown.addOnce(function () {
				this.ball.launchFromPlatform();
			},this);
		}
		
	},
	
	stopBall: function () {
		this.ball.body.velocity.setTo(0);
		this.ball.inPlatForm = true;	
	},
	
	skipLevel: function () {
		if(currentLevel < 3){
			currentLevel++;
			this.game.state.restart();
		}
	}
};