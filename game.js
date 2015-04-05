var PlataformasScroller = PlataformasScroller || {};
var music;
PlataformasScroller.Game = function(){};

PlataformasScroller.Game.prototype = {
    preload: function () {
          console.log("Estoy en el juego");
        this.load.image('background', 'assets/forest_evening.png');
        this.load.spritesheet('dude', 'assets/dude.png',32,48);
        this.load.audio('backgroundMusic', 'assets/battletheoutsiders.mp3');
        this.load.tilemap('testmap', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);  // this loads the json tilemap created with tiled (cachekey, filename, type of tilemap parser)
        this.load.image('forest-2', 'assets/forest-2.png');
        this.load.spritesheet('enemy', 'assets/king_cobra.png',96,96);
      },
    create: function () {
        this.stage.disableVisibilityChange = true; // No pausa el juego cuando pierde el focus, musica continua sonando.
         this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.tileSprite(0,0,2000,1440,'background');
       music= this.add.audio('backgroundMusic');
       player = this.add.sprite(52,  150, 'dude');
       this.physics.enable(player, Phaser.Physics.ARCADE);
       this.physics.arcade.checkCollision.down = false
       player.body.gravity.y=300;
        player.body.collideWorldBounds = true;

        enemy = this.add.sprite(77,160,'enemy');
        this.physics.enable(enemy,Phaser.Physics.ARCADE);
        enemy.body.gravity.y=300;
        enemy.body.collideWorldBounds = true;
        enemy.frame=2
        enemy.animations.add('left', [9,10,11]);
        enemy.animations.add('right', [3,4,5]);

        music.loop=true;
        music.play();
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = this.input.keyboard.createCursorKeys();

        player.checkWorldBounds=true;

       mymap = this.add.tilemap('testmap');
        mymap.addTilesetImage('forest-2');
        layermain = mymap.createLayer('Layer1');

        mymap.setCollisionByExclusion([0],true, 'Layer1');

        this.camera.follow(player);
        this.world.setBounds(0, 0, 4000, 1280);

    },
    dead: function () {
        console.log("YOU HAVE DIED");
        player.kill();
        music.stop();
        this.game.state.start("GameOver");
        },

    update: function () {
        this.physics.arcade.collide(player,layermain);
        this.physics.arcade.collide(enemy,layermain);
       // this.physics.arcade.collide(player,enemy,this.dead,null,this); Activar para colisiones contra la cobra
        player.body.velocity.x=0;
        enemy.body.velocity.x=0;
        player.events.onOutOfBounds.add(this.dead,this);



        if(player.body.onFloor()) {
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
        enemy.animations.play('left');
        enemy.body.velocity.x=-100;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Mover hacia la derecha
        player.body.velocity.x = 150;
        player.animations.play('right');

        enemy.animations.play('right');
        enemy.body.velocity.x=100;

    } else
         {
        //  Pararse
        player.animations.stop();
        enemy.animations.stop();
        player.frame = 4;
        enemy.frame = 2;

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
