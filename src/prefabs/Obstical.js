class Obstical extends Phaser.GameObjects.Sprite {
    constructor(scene, y, texture, speed) {
        super(scene, game.config.width, y, texture, 0);
        
        this.speed = speed;
        scene.physics.add.existing(this); // maybe might want circular hitboxes
        scene.add.existing(this);
        this.body.setVelocityX(-speed);
        this.body.setCircle(this.width/2);
        this.body.mass = 0.7;
        //this.body.immovable = true;
    }
    update() {
        if (this.generator.liveObsticals.has(this)){
            this.checkReset();
        }
    }

    // tying individual object to generator holder
    // !!! MAKE SURE TO CALL EVERY TIME AN OBSTICAL IS MADE !!!
    setGenerator(generator) {
        this.generator = generator;
    }

    isGone() {
        if (this.x + this.width/2 < 0) return true;
        return false;
    }

    // check if object needs to reset, and does so if needed
    checkReset() {
        if (this.x - this.width/2 < 0) {
            this.body.setVelocityX(0);
            this.x = game.config.width + this.width/2;
            this.generator.hitEnd(this);
        } else {
            this.body.setVelocityX(-this.speed);
        }
    }

    // resets obstical when recycling
    reset(randy, randspeed) {
        //this.body.immovable = true;
        this.y = randy;
        this.body.mass = 0.7;
        this.x = game.config.width + this.width/2;
        this.body.setVelocityY(0);
        this.body.setVelocityX(-randspeed);
    }
    
    

}

// have several obstical types, with varying sizes. 
// require long jump(?)
// object to slide under
// small jump
// crater
// flying objects