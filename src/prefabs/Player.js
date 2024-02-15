class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.groundLevel = game.config.height*6/7;
        this.maxEnergy = 100;
        this.jumpEnergy = this.maxEnergy;
        this.notJumped = false;
        this.health = 3;
        this.runningSpeed = 6;

        this.land = scene.sound.add("landing");
        this.land.setVolume(5);
        this.running = scene.sound.add("running");
        this.jump = scene.sound.add("jump");
        this.jump.setVolume(0.5);
        this.nowRunning = false;
        this.justLanded = false;
        console.log("Player size: " + this.width + ", " + this.height)

        this.anims.play("runanim");
    }

    update() {
        this.movementUpdate();
    }

    movementUpdate() {
        if (!this.hitTop && keyJump.isDown && this.jumpEnergy > 0) {
            //this.notJumped = false;
            this.body.setVelocityY(this.body.velocity.y - 20);
            // SOUND fwoosh (maybe)
            //this.y -= 10;
            this.jumpEnergy = this.jumpEnergy - 2;
        }
        if (!this.hitTop && keyJump.isDown && this.jumpEnergy > 0 && this.notJumped) {
            this.notJumped = false;
            this.body.setVelocityY(this.body.velocity.y - 70);
            // SOUND fwoosh (maybe)
            //this.y -= 10;
            this.jumpEnergy = this.jumpEnergy - 1;
        }

        if (this.body.onFloor()) {
            // SOUND impact
            if (!this.notJumped) {
                this.land.play();
            }
            this.jumpEnergy = this.maxEnergy;
            this.notJumped = true;
        }
        if (keyLeft.isDown) {
            this.body.setVelocityX(this.body.velocity.x - this.runningSpeed/2)
            //this.x -= this.runningSpeed/2;
            if (!this.nowRunning) {
                //this.running.play();
                this.nowRunning = true;
            }
        }
        if (keyRight.isDown) {
            // scale right movement so that player cant get past 2/3 of the screen
            let scaler = (game.config.width*2/3 - this.x) / game.config.width*2/3;
            this.body.setVelocityX(this.body.velocity.x + (this.runningSpeed*scaler))
            if (!this.nowRunning) {
                this.running.play();
                this.nowRunning = true;
            }
            //this.x += this.runningSpeed * scaler;
        }
        if (keyRight.isUp && keyLeft.isUp) {
            this.nowRunning = false;
            this.running.stop();
        }

    }
    getHit() {
        this.health--; 
        // try flashing character red when hit?
    }
}

// states list: 