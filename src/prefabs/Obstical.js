class Obstical extends Phaser.GameObjects.Sprite {
    constructor(scene, y, texture, speed) {
        super(scene, game.config.width, y, texture, 0);

        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.body.setVelocityX(-speed)
    }
    isGone() {
        if (this.x + this.width/2 < 0) return true;
        return false;
    }
}

// have several obstical types, with varying sizes. 
// require long jump(?)
// object to slide under
// small jump
// crater
// flying objects