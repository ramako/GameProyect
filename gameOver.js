var PlataformasScroller = PlataformasScroller || {};

PlataformasScroller.GameOver = function(){}; 

PlataformasScroller.GameOver.prototype = {
     preload: function () {
     this.load.image('gameOver', 'assets/GameOver.png');
    this.load.audio('gameOverMusic', 'assets/gameOver.mp3');
     },
    
    create: function () {
    music= this.add.audio('gameOverMusic');
    var gameOver=this.add.image(0,0,'gameOver')
    gameOver.scale.x=0.7
    gameOver.scale.y=0.7
    music.play();
    
    },
    
    playAgain: function () {
    
    }
    
}