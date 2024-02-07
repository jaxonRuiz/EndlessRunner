class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "72px",
            backgroundColor: "#CC7777",
            align: "center"
        }
        this.add.text(game.config.width/2, game.config.height*0.4, "GAME OVER", menuConfig).setOrigin(0.5, 0.5);
        menuConfig.fontSize = 34;
        this.add.text(game.config.width/2, game.config.height*0.75, "R to restart", menuConfig).setOrigin(0.5, 0.5);
        this.ARRkey = this.input.keyboard.addKey.apply(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(ARRkey)) {
            this.scene.start("playScene");
        }
    }
}