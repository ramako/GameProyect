var PlataformasScroller = PlataformasScroller || {};

PlataformasScroller.Game = function(){};

PlataformasScroller.Game.prototype = {
    preload: function () {
          console.log("Estoy en el juego");
        this.load.image('background', 'assets/forest_evening.png');
        this.load.spritesheet('dude', 'assets/dude.png',32,48);
        this.load.audio('backgroundMusic', 'assets/battletheoutsiders.mp3');
      },
    create: function () {
        this.stage.disableVisibilityChange = true; // No pausa el juego cuando pierde el focus, musica continua sonando.
        this.add.image(0,0,'background');
       var music= this.add.audio('backgroundMusic');
       player = this.add.sprite(52,  150, 'dude');
        music.loop=true;
        music.play();
        
        
    },
    
    update: function () {
        
    }
    
};