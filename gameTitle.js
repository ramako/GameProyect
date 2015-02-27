var PlataformasScroller = PlataformasScroller || {};

PlataformasScroller.GameTitle = function(){};
var tween;
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
    this.add.tween(cursor)
            .to({
                x: cursor.x - 10
            }, 700, Phaser.Easing.Quadratic.Out)
            .to({
                x: cursor.x
            }, 400, Phaser.Easing.Quadratic.In)
            .loop()
            .start();
    },
    
   playTheGame: function(){
		this.game.state.start("Game");
	},
    creditos: function () {
    var style = { font: "25px Arial", fill: "#aa0344", align: "center" };
    var text = this.add.text(this.world.centerX, this.world.centerY, "Versión de desarrollo \n Pablo Casado Arenas", style);
        
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
             console.log(cursor.y);
            
        }
        else if (this.input.keyboard.isDown(Phaser.Keyboard.UP) && cursor.canMove){
             cursor.canMove=false;
            this.permitirMovimiento();
             console.log("Me muevo parriba!!");
             this.add.tween(cursor).to({ y: 340 }, 200).start();
             console.log(cursor.y);
            
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.ENTER))
            if( cursor.y==450)
            this.creditos(); // Crear nueva imagen con boton "salir" para deshacer los creditos.
            else
            this.playTheGame();

    }
    

    
    
}