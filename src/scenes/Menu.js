class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load background images
        this.load.image("backClouds", "./assets/imgs/clouds1.PNG");
        this.load.image("frontClouds", "./assets/imgs/clouds2.PNG");
        this.load.image("groundImg", "./assets/imgs/ground.PNG");
        this.load.image("sky", "./assets/imgs/sky.PNG");
        this.load.image("backTrees", "./assets/imgs/treesA.PNG");
        this.load.image("frontTrees", "./assets/imgs/treesB.PNG");
        this.load.image("backGround", "./assets/imgs/ground2.PNG");
        this.load.image("backBackGround", "./assets/imgs/ground3.PNG");

        // load audio
        this.load.audio("bg_music", "./assets/sounds/bossTime.mp3");
        this.load.audio("beepImpact", "./assets/sounds/beepImpact.wav");
        this.load.audio("cartoonJump", "./assets/sounds/cartoonJump.wav");
        this.load.audio("click", "./assets/sounds/click.wav");
        this.load.audio("landing", "./assets/sounds/hit.wav");
        this.load.audio("jump", "./assets/sounds/jumpy.wav");
        this.load.audio("windAmbience", "./assets/sounds/windBirds.wav");
        this.load.audio("running", "./assets/sounds/running.mp3");
    }
    

    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "52px",
            backgroundColor: "#AB8888",
            align: "center"
        }
        
        this.add.text(game.config.width/2, game.config.height*0.4, "Surviving FlashAnim", menuConfig).setOrigin(0.5, 0.5);
        menuConfig.fontSize = 34;
        this.add.text(game.config.width/2, game.config.height*0.75, "Enter to begin", menuConfig).setOrigin(0.5, 0.5);
        this.add.text(0, game.config.height, "Shift to go to credits", {fontSize: 20}).setOrigin(0, 1);
        menuConfig.fontSize = 28;
        this.add.text(game.config.width/2, game.config.height*0.85, "Space to fly | A/D to move", menuConfig).setOrigin(0.5, 0.5);

        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyCredits = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.click = this.sound.add("click");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.click.play();
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyCredits)) {
            this.click.play();
            this.scene.start("creditsScene");
        }
    }
}