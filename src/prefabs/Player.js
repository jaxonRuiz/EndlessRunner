class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.groundLevel = game.config.height*6/7;
        this.maxEnergy = 68;
        this.jumpEnergy = this.maxEnergy;
        this.notJumped = false;
        this.health = 3;
        this.runningSpeed = 6;
    }

    create() {


    }

    update() {
        this.movementUpdate();
    }

    movementUpdate() {
        
        // maybe add in limited movement in the air in exchange for more projectiles or something
        /*if (keyDown.isDown && !this.body.onFloor()) {
            this.y += 5;
            if (this.y > this.groundLevel - 3) {
                this.y = this.groundLevel;
                this.body.setVelocityY(0);
            }
        }*/

        // use UP to boost midair
        // if (keyUp.isDown && !this.body.onFloor()) {
        //     //this.y -= 5;
        //     this.body.setVelocityY(this.body.velocity.y - 10);
        //     //console.log(this.body.velocity.y)
        // }

        // variable jumping height depending on button press
        if (!this.hitTop && keyJump.isDown && this.jumpEnergy > 0 && this.notJumped) {
            
            this.body.setVelocityY(this.body.velocity.y - this.jumpEnergy);
            // SOUND fwoosh (maybe)
            //this.y -= 10;
            this.jumpEnergy = this.jumpEnergy*0.95;
        }
        if (this.body.onFloor()) {
            // SOUND impact
            this.jumpEnergy = this.maxEnergy;
            this.notJumped = true;
        }
        if (keyLeft.isDown) {
            this.x -= this.runningSpeed/2;
        }
        if (keyRight.isDown) {
            // scale right movement so that player cant get past 2/3 of the screen
            let scaler = (game.config.width*2/3 - this.x) / game.config.width*2/3;
            this.x += this.runningSpeed * scaler;
        }
        // if (Phaser.Input.Keyboard.JustDown(keyRoll) && this.body.onFloor()) {
        //     this.y = this.groundLevel;
        //     console.log("debug button :D");
        // } 
    }
    getHit() {
        this.health--; 
        // try flashing character red when hit?
    }
}

// states list: 