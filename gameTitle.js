var PlataformasScroller = PlataformasScroller || {};

PlataformasScroller.GameTitle = function(){};
var tween;
var tween2;
var cursor;
PlataformasScroller.GameTitle.prototype = {
    preload: function () {
        
    },
    create: function () {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.add.image(0,0,'titleScreen');
    var botonPlay=this.game.add.button(260,320,"play",this.playTheGame,this);
    var botonCreditos = this.game.add.button(260,420,"creditos", this.creditos,this);
    cursor = this.add.image(230,340,"cursor");
        
    cursor.canMove=true;
   // tween= this.add.tween(cursor);
    },
    
   playTheGame: function(){
		this.game.state.start("Game");
	},
    creditos: function () {
        console.log("Creditos!!")
        
    },
    permitirMovimiento: function () {
        this.time.events.add(355, (function () {
         cursor.canMove = true;
        console.log("permito");
        }),this);
    },
    update: function () {
         if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN) && cursor.canMove){
             cursor.canMove=false;
              this.permitirMovimiento();
              console.log("Me muevo pabajo!!");
             this.add.tween(cursor).to({ y: 450 }, 200).start();

            
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.UP) && cursor.canMove){
             cursor.canMove=false;
            this.permitirMovimiento();
             console.log("Me muevo parriba!!");
             this.add.tween(cursor).to({ y: 340 }, 200).start();

            
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.ENTER))
            this.creditos();
    }
    
    
}