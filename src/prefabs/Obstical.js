class Obstical extends Phaser.GameObjects.Sprite {
    constructor(scene, y, texture, speed) {
        super(scene, game.config.width, y, texture, 0);
        
        this.speed = speed;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.body.setVelocityX(-speed);
    }
    update() {
        this.checkReset();
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
        if (this.x  + this.width/2 < 0) {
            console.log("object hit end, adding to deadObsticals");
            this.body.setVelocityX(0);
            this.generator.hitEnd(this);
        } else {
            this.body.setVelocityX(-this.speed);

        }
    }

    // resets obstical when recycling
    reset(randy, randspeed) {
        this.y = randy;
        this.body.setVelocityX(-randspeed);
    }
    flag() {
        console.log("I EXIST!!");
    }
    

}

// have several obstical types, with varying sizes. 
// require long jump(?)
// object to slide under
// small jump
// crater
// flying objects