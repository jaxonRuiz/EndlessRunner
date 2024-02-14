class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.spritesheet("player", "./assets/art/player.png", {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        this.load.image("floor", "./assets/art/floor.png");
        this.load.image("placeholder", "./assets/art/asdf.png");
        

    }
    
    init() {
    }

    

    create() {
        this.player = new Player(this, game.config.width/2, game.config.height/2, "player", 0);
        this.player.body.setGravityY(1000);
        this.floor = this.add.tileSprite(game.config.width/2, game.config.height*6/7, game.config.width * 1.1, game.config.height/4, 'floor');
        this.physics.add.existing(this.floor, true);
        this.player.body.setCollideWorldBounds(true);

        this.gen = new MapGenerator(this)
        this.gen.SpawnObstical();


        this.physics.add.collider(this.player, this.floor.body);
        this.physics.add.collider(this.player, this.gen.allHazards, () => this.PlayerHit());
        




        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRoll = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRestart)) {
            this.scene.start('menuScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRoll)) {
            this.gen.SpawnObstical(this);
        }

        this.player.update();
        this.gen.allHazards.getChildren().forEach((obstical) => obstical.update()); // wasnt working immediately when i put in MapGenerator update()...
        this.gen.update();
    }

    PlayerHit() {
        console.log("player hit!");
    }

}