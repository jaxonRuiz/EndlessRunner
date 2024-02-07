class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.groundLevel = game.config.height*6/7;
        this.maxEnergy = 58;
        this.jumpEnergy = this.maxEnergy;
        this.notJumped = false;
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
            
            //this.y -= 10;
            this.jumpEnergy = this.jumpEnergy*0.95;
        }
        if (this.body.onFloor()) {
            this.jumpEnergy = this.maxEnergy;
            this.notJumped = true;
        }
        // if (Phaser.Input.Keyboard.JustDown(keyRoll) && this.body.onFloor()) {
        //     this.y = this.groundLevel;
        //     console.log("debug button :D");
        // } 
    }

}

// states list: 