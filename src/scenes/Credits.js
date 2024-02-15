class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        let creditsConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "64px",
            backgroundColor: "#123456",
            align: "left"
        }
        
        this.add.text(game.config.width/2, game.config.height*0.1, "Credits", creditsConfig).setOrigin(0.5, 0.5);
        creditsConfig.fontSize = 34;
        let text = `Design: Jaxon Ruiz
Programming: Jaxon Ruiz
Art: Jaxon Ruiz
Animation: Jaxon Ruiz
Music: 
SFX: `
        this.add.text(game.config.width/2, game.config.height*0.45, text, creditsConfig).setOrigin(0.5, 0.5);
        creditsConfig.fontSize = 28;
        this.add.text(game.config.width/2, game.config.height*0.85, "Enter to return to menu", creditsConfig).setOrigin(0.5, 0.5);

        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyCredits = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.click = this.sound.add("click");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.click.play();
            this.scene.start("menuScene");
        }
    }
}