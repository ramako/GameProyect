var Misil = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'misil');

    // Centramos el punto de pivoteo
    this.anchor.setTo(0.5, 0.5);

    // Fisicas del misil
    game.physics.enable(this, Phaser.Physics.ARCADE);

    //Constantes
    this.SPEED = 165; 
    this.TURN_RATE = 5; 
    this.WOBBLE_LIMIT = 15; //grados
    this.WOBBLE_SPEED = 250; // ms
     this.SMOKE_LIFETIME = 3000; // ms
    
     this.wobble = this.WOBBLE_LIMIT;
    this.game.add.tween(this)
        .to(
            { wobble: -this.WOBBLE_LIMIT },
            this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
            Number.POSITIVE_INFINITY, true
        );
    
        this.smokeEmitter = this.game.add.emitter(-100, 0, 100);
    
    this.smokeEmitter.gravity = 0;
    this.smokeEmitter.setXSpeed(0, 0);
    this.smokeEmitter.setYSpeed(-80, -50); // hacer que el humo vaya hacia arriba
    
        this.smokeEmitter.setAlpha(1, 0, this.SMOKE_LIFETIME,
        Phaser.Easing.Linear.InOut);

    // crear humo
    this.smokeEmitter.makeParticles('smoke');

    // Start emitting smoke particles one at a time (explode=false) with a
    // lifespan of this.SMOKE_LIFETIME at 50ms intervals
    this.smokeEmitter.start(false, this.SMOKE_LIFETIME, 50);

};

Misil.prototype = Object.create(Phaser.Sprite.prototype);
Misil.prototype.constructor = Misil;


Misil.prototype.actualizar= function () {
    
    this.smokeEmitter.x = this.x;
    this.smokeEmitter.y = this.y;
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        player.x, player.y
    );
     targetAngle += this.game.math.degToRad(this.wobble);

    if (this.rotation !== targetAngle) {
        // Diferencia del angulo actual y el angulo objetivo
        var delta = targetAngle - this.rotation;

        // 180 - 180 para que sea mas rapido
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Sentido agujas del reloj
            this.angle += this.TURN_RATE;
        } else {
            // Contrario a las agujas del reloj
            this.angle -= this.TURN_RATE;
        }

        // Si estan cerca simplemente el angulo sera el del objetivo
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // Vector velocidad basado en this.rotation y this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
    
};