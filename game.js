var PlataformasScroller = PlataformasScroller || {};
var music;
PlataformasScroller.Game = function(){};

PlataformasScroller.Game.prototype = {
    preload: function () {
          console.log("Estoy en el juego");
        this.load.image('background', 'assets/forest_evening.png');
        this.load.spritesheet('dude', 'assets/dude.png',32,48);
        this.load.audio('backgroundMusic', 'assets/battletheoutsiders.mp3');
        this.load.image('ground', 'assets/platform.png');
      },
    create: function () {
        this.stage.disableVisibilityChange = true; // No pausa el juego cuando pierde el focus, musica continua sonando.
         this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.image(0,0,'background');
       music= this.add.audio('backgroundMusic');
       player = this.add.sprite(52,  150, 'dude');
       this.physics.enable(player, Phaser.Physics.ARCADE);
       this.physics.arcade.checkCollision.down = false
       player.body.gravity.y=300;
        player.body.collideWorldBounds = true;
        music.loop=true;
        music.play();
        platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.world.height - 64, 'ground');
        ground.body.immovable = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = this.input.keyboard.createCursorKeys();
        
        player.checkWorldBounds=true;
                
        
    },
    dead: function () {
        console.log("YOU HAVE DIED");
        player.kill();
        music.stop();
        this.game.state.start("GameOver");
        },
    
    update: function () {
        this.physics.arcade.collide(player, platforms);
        player.body.velocity.x=0;

        player.events.onOutOfBounds.add(this.dead,this);
        
        if(player.body.touching.down) {
            player.jumps=2;
            player.jumping=false;
        }
        
        if(this.input.keyboard.upDuration(Phaser.Keyboard.UP) && player.jumping) {
            player.jumps--;
            player.jumping=false;   
        }
            
        
        if (cursors.left.isDown)
    {
        //  Mover hacia la izquierda
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Mover hacia la derecha
        player.body.velocity.x = 150;

        player.animations.play('right');
    } else
         {
        //  Pararse
        player.animations.stop();

        player.frame = 4;
        
        }
        
        
        // Doble salto
    if (cursors.up.isDown  && player.jumps>0 && this.input.keyboard.downDuration(Phaser.Keyboard.UP, 5)) { // controlamos que no este presionada mas de 5 ms porque
        console.log(player.jumps);                                                                         // si la dejasemos presionada no se decrementan los saltos
        player.jumping=true;                                                                                // y esta condicion siempre seria true haciendo que el pj vuele.
        player.body.velocity.y=-150
        //code
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y=200;
        //code
    }
    
        
    }
    
    
    
};