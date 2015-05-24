/* global player */
var PlataformasScroller = PlataformasScroller || {};
var music;
var enemy = enemy || {};  // namespace para enemigos.
enemy.snake = function () {}; //clase enemiga snake
var targetAngle;
var proyectil;
var reverseEnemyTriggers;
var misil1;
var explosion;
var animation;
var enemyBoss;
 var explotado=false;
var cerrado=true;
var layercerrar;

PlataformasScroller.Game = function(){};

PlataformasScroller.Game.prototype = {
    preload: function () {
          console.log("Estoy en el juego");
        this.load.image('background', 'assets/forest_evening.png');
        this.load.spritesheet('dude', 'assets/dude.png',32,48);
        this.load.audio('backgroundMusic', 'assets/battletheoutsiders.mp3');
        this.load.tilemap('testmap', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);  // Carga del mapa mediante json
        this.load.image('forest-2', 'assets/forest-2.png');
        this.load.spritesheet('snake', 'assets/king_cobra.png',96,96);
        this.load.image('proyectil', 'assets/diamond.png');
        this.load.image('misil','assets/rocket.png')
        this.load.image('smoke','assets/smoke.png')
        this.load.spritesheet('explosion', 'assets/explosion.png',128,128);
      },
   render: function () {

       this.game.debug.bodyInfo(player, 32, 32);
       this.game.debug.body(player);

   },

    
    create: function () {
        
       
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 580; // Gravedad del mundo
        

        this.stage.disableVisibilityChange = true; // No pausa el juego cuando pierde el focus, musica continua sonando.
        
        
        

        this.add.tileSprite(0,0,2000,640,'background');
       music= this.add.audio('backgroundMusic');
       player = this.add.sprite(3660,  150, 'dude');
       this.physics.enable(player, Phaser.Physics.ARCADE);
       this.physics.arcade.checkCollision.down = false
        player.body.collideWorldBounds = true;
        
        
            misil1 = this.game.add.existing(
        new Misil(this.game, 1400, 700)
    );
    misil1.body.allowGravity=false;
        
        explosion=this.add.sprite(500,200,'explosion');
        animation= explosion.animations.add('boom', [0,1,2,3], 60, false);
        explosion.visible=false;
        explosion.anchor.setTo(0.5, 0.5);
        
        
        console.log(misil1);
        enemy.snake = this.add.sprite(479,60,'snake');
        this.physics.enable(enemy.snake,Phaser.Physics.ARCADE);
        enemy.snake.body.collideWorldBounds = true;
        enemy.snake.frame=2
        enemy.snake.animations.add('left', [9,10,11]);
        enemy.snake.animations.add('right', [3,4,5]);
        enemy.snake.fireRate = 1700; // el delay del disparo.
        enemy.snake.shootTime=0;
        enemy.snake.body.velocity.x=-40;
        
        music.loop=true;
       // music.play();
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = this.input.keyboard.createCursorKeys();

        player.checkWorldBounds=true;

        mymap = this.add.tilemap('testmap');
        mymap.addTilesetImage('forest-2');
        //mymap.setTileIndexCallback(1,this.prueba,this);
        layermain = mymap.createLayer('Layer1');
        
        mymap.setCollisionByExclusion([0],true, 'Layer1');

        this.camera.follow(player);
        this.world.setBounds(0, 0, 4450, 640);
        
        proyectiles = this.add.group();
        proyectiles.enableBody=true;
        proyectiles.physicsBodyType = Phaser.Physics.ARCADE;
        proyectiles.outOfBoundsKill=true;
        
        
         reverseEnemyTriggers = this.add.group();
        reverseEnemyTriggers.enableBody = true;
        reverseEnemyTriggers.physicsBodyType = Phaser.Physics.ARCADE;
        var leftTrigger = this.add.sprite(427, 180, null, 0, reverseEnemyTriggers);
        leftTrigger.body.setSize(4, 32, 0, 0);
        var rightTrigger = this.add.sprite(605, 180, null, 0, reverseEnemyTriggers);
        rightTrigger.body.setSize(4, 32, 0, 0);
        reverseEnemyTriggers.setAll('body.allowGravity', false);
        
        
        enemyBoss=this.add.sprite(3996, 150, 'dude');
        enemyBoss.tint=0x0000FF0
        
       // this.physics.enable(enemyBoss,Phaser.Physics.ARCADE);
        enemyBoss.animations.add('left', [0, 1, 2, 3], 10, true);
        enemyBoss.animations.add('right', [5, 6, 7, 8], 10, true);
        
    },
    dead: function () {
        console.log("YOU HAVE DIED");
        player.kill();
        music.stop();
        this.game.state.start("GameOver");
        },
    
    misilDead: function () {
        misil1.visible=false;
        explosion.x=misil1.x;
         explosion.y=misil1.y;
         explosion.visible=true;
         //explosion.kill();
         animation=explosion.animations.play('boom',40,false,true);
        explosion.events.onAnimationComplete.add(function() {
        player.visible=false;
        explosion.kill();
        misil1.kill();
        player.kill();
        music.stop();
        this.game.state.start("GameOver");
            
        },this)
        


    }, 
    
    shoot: function () {

            if(enemy.snake.shootTime + enemy.snake.fireRate < this.time.time) {
        proyectil= proyectiles.create(enemy.snake.body.x,enemy.snake.body.y,'proyectil');
        this.physics.enable(proyectil, Phaser.Physics.ARCADE);
        
        this.physics.arcade.moveToObject(proyectil, player,300);

        enemy.snake.shootTime = this.time.time;
    }
    },
    

    update: function () {
        //console.log(Object.getOwnPropertyNames(misil))
        //console.log(misil.SPEED)
       // Misil.actualizar();
       // this.physics.arcade.overlap(player,proyectil,this.dead,null,this);
        
        
        this.physics.arcade.collide(layermain,proyectil);
        this.physics.arcade.collide(player,layermain);
        this.physics.arcade.collide(enemy.snake,layermain);
        this.physics.arcade.collide(enemyBoss,layermain);
        this.physics.arcade.collide(player,layercerrar);
       // this.physics.arcade.collide(player,proyectil,this.dead,null,this); Activar para colisiones contra el proyectil de la cobra
        player.body.velocity.x=0;
        
        if(player.x - misil1.x >0 && explotado==false) {
            
            
            if(misil1.x >3050 ) { //cambiar a 3000 pixeles
                 explosion.x=misil1.x;
                 explosion.y=misil1.y;
                 explosion.visible=true;
                animation=explosion.animations.play('boom',40,false,true);
                 explosion.events.onAnimationComplete.add(function() {
                     misil1.kill(); 
                     explosion.kill();
                     explosion.visible=false;
                     
                 })
                 explotado=true;
                misil1.smokeEmitter.on=false;
            }
            misil1.actualizar();

        }
        
        
        player.events.onOutOfBounds.add(this.dead,this);
        
        if(player.x>= 3670 && cerrado) {
            cerrado=false;
            this.camera.unfollow();
            this.camera.setPosition(player.x+200,640);
            layercerrar = mymap.createLayer('cerrar');
            mymap.setCollisionByExclusion([0],true, 'cerrar');
            this.physics.enable(enemyBoss,Phaser.Physics.ARCADE);
            
        }
     
        
     this.physics.arcade.collide(misil1,player,this.misilDead,null,this);

        this.physics.arcade.overlap(enemy.snake, reverseEnemyTriggers, function() {
            enemy.snake.body.velocity.x *=-1;
             if(enemy.snake.body.velocity.x>0)
                enemy.snake.animations.play('right');
            else
                enemy.snake.animations.play('left');
            
        });
        

        this.shoot();
        
        if(!cerrado) { //IA enemiga , el enemigo se movera por arriba y lanzara bombas. Jugador ha de tratar de escalar y alcanzarlo
            
            enemyBoss.body.velocity.y=100;
            
        }
        
        if(player.body.onFloor()) {
            player.jumps=2;
            player.jumping=false;
            player.y=player.y;

          }



        if(this.input.keyboard.upDuration(Phaser.Keyboard.UP) && player.jumping) {
            player.jumps--;
            player.jumping=false;
        }


        if (cursors.left.isDown)
    {
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
    if (cursors.up.isDown  && player.jumps>0 && this.input.keyboard.downDuration(Phaser.Keyboard.UP, 1)) { // controlamos que no este presionada mas de 5 ms porque                                                                                                             // si la dejasemos presionada no se decrementan los saltos
        player.jumping=true;                                                                                // y esta condicion siempre seria true haciendo que el pj vuele.
        player.body.velocity.y=-300
 

    }



    }



};
