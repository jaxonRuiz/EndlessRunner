class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "72px",
            backgroundColor: "#CC7777",
            align: "center"
        }
        this.add.text(game.config.width/2, game.config.height*0.25, "GAME OVER", menuConfig).setOrigin(0.5, 0.5);
        menuConfig.fontSize = 54;
        this.add.text(game.config.width/2, game.config.height*0.45, "Score: " + this.score, menuConfig).setOrigin(0.5, 0.5);
        menuConfig.fontSize = 34;
        this.add.text(game.config.width/2, game.config.height*0.75, "R to restart", menuConfig).setOrigin(0.5, 0.5);
        keyRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.text(0, game.config.height, "Shift to go to credits", {fontSize: 20}).setOrigin(0, 1);
        keyCredits = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.click = this.sound.add("click");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRestart)) {
            this.click.play();
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyCredits)) {
            this.click.play();
            this.scene.start("creditsScene");
        }
        
    }
}