class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load sprites
        // this.load.image('player', './assets/art/player.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "52px",
            backgroundColor: "#AB8888",
            align: "center"
        }
        this.add.text(game.config.width/2, game.config.height*0.4, "Escape from FlashAnim", menuConfig).setOrigin(0.5, 0.5);
        menuConfig.fontSize = 34;
        this.add.text(game.config.width/2, game.config.height*0.75, "Enter to begin", menuConfig).setOrigin(0.5, 0.5);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.scene.start("playScene");
        }        
    }
}