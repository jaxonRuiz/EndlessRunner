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
        // add player
        this.player = new Player(this, game.config.width/2, game.config.height/2, "player", 0);
        this.player.body.setGravityY(1000);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setDamping(true).setDrag(0.5);

        // add floor
        this.floor = this.add.tileSprite(game.config.width/2, game.config.height*6/7, game.config.width * 1.1, game.config.height/4, 'floor');
        this.physics.add.existing(this.floor, true);
        
        // add death wall 
        this.deathwall = this.add.tileSprite(0, 0, game.config.width/15, game.config.height * 1.1, 'deathwall').setOrigin(0,0);
        this.physics.add.existing(this.deathwall, true);

        // adding obstical generator
        this.gen = new MapGenerator(this)
        this.gen.SpawnObstical();
        
        // spawning new obsticals at an interval
        this.time.addEvent( {
            delay: 2000, // time in ms
            loop: true,
            callback: () => {
                this.gen.SpawnObstical();
            },
            callbackScope: this
        })

        // adding colliders
        this.physics.add.collider(this.player, this.floor.body);
        this.physics.add.collider(this.player, this.deathwall, () => this.GameOver());
        this.physics.add.collider(this.player, this.gen.allHazards, () => this.PlayerHit());

        // adding score timer
        this.score = 0;
        this.scoreText = this.add.text(0, 0, "Score: " + this.score);

        // score timer
        this.time.addEvent( {
            delay: 250, // time in ms
            loop: true,
            callback: () => {
                this.score++;
                this.scoreText.text = "Score: " + this.score;
            },
            callbackScope: this
        })

        // keys (many of these is redundant)
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRoll = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // if (Phaser.Input.Keyboard.JustDown(keyRestart)) {
        //     this.scene.start('gameoverScene');
        // }



        this.player.update();
        this.gen.allHazards.getChildren().forEach((obstical) => obstical.update()); // wasnt working immediately when i put in MapGenerator update()...
        this.gen.update();
    }

    PlayerHit() {
        console.log("player hit!");
        // SOUND
    }

    GameOver() {
        console.log("game over");
        this.scene.start('gameoverScene');
    }
}