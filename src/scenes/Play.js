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
        // add sounds/music
        this.music = this.sound.add("bg_music");
        this.music.setLoop(true);
        this.music.setVolume(0.4);
        this.wind = this.sound.add("windAmbience");
        this.wind.setLoop(true);
        this.wind.setVolume(0.9);
        this.wind.setRate(1.7);
        this.impact = this.sound.add("beepImpact");
        this.impact.setVolume(0.3);

        this.music.play();
        this.wind.play();

        this.land = this.sound.add("landing");
        this.running = this.sound.add("running");
        this.jump = this.sound.add("jump");


        // add background
        this.sky = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'sky'
        ).setOrigin(0, 0);

        this.backClouds = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'backClouds'
        ).setOrigin(0, 0);

        this.frontClouds = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'frontClouds'
        ).setOrigin(0, 0);

        this.backBackGround = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'backBackGround'
        ).setOrigin(0, 0);

        this.backGround = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'backGround'
        ).setOrigin(0, 0);

        this.backTrees = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'backTrees'
        ).setOrigin(0, 0);

        this.frontTrees = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'frontTrees'
        ).setOrigin(0, 0);

        this.ground = this.add.tileSprite(0,
            0,
            game.config.width,
            game.config.height,
            'groundImg'
        ).setOrigin(0, 0);

        // add player
        this.player = new Player(this, game.config.width/2, game.config.height/2, "player", 0);
        this.player.body.setGravityY(1000);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setDamping(true).setDrag(0.4);

        // player run animation
        // this.anims.create({
        //     key: `runanim`,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers(player, {start: 0, end: 7}), // normal use of spritesheet
        //     frameRate: 12,
        // })


        // add death wall 
        this.deathwall = this.add.tileSprite(0, 0, game.config.width/15, game.config.height * 1.1, 'deathwall').setOrigin(0,0);
        this.physics.add.existing(this.deathwall, true);

        // add floor
        this.floor = this.add.tileSprite(game.config.width/2, game.config.height*5/6, game.config.width * 1.1, game.config.height/6).setOrigin(0.5, 0);
        this.physics.add.existing(this.floor, true);
        console.log("floor size: " + this.floor.width + ", " + this.floor.height);
        


        // adding obstical generator
        this.gen = new MapGenerator(this)
        this.gen.SpawnObstical();
        this.numObsticals = 1;
        // spawning new obsticals at an interval
        this.time.addEvent( {
            delay: 2000, // time in ms
            loop: true,
            callback: () => {
                if (this.numObsticals < 50) { // hack balancing :/
                    this.numObsticals++;
                    this.gen.SpawnObstical();
                }
            },
            callbackScope: this
        })

        // adding colliders
        this.physics.add.collider(this.player, this.floor.body);
        this.physics.add.collider(this.player, this.deathwall, () => this.GameOver());
        this.physics.add.collider(this.player, this.gen.allHazards, () => this.PlayerHit());
        
        // adding score timer
        let scoreConfig = {
            fontFamily: 'Comic Sans',
            fontSize: "32px",
        }
        this.score = 0;
        this.scoreText = this.add.text(0, 0, "Score: " + this.score, scoreConfig);

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

        this.ground.tilePositionX += 5;
        this.backGround.tilePositionX += 2;
        this.backBackGround.tilePositionX += 1;
        this.backClouds.tilePositionX += 1.5;
        this.frontClouds.tilePositionX += 2;
        this.backTrees.tilePositionX += 3.5;
        this.frontTrees.tilePositionX += 4.5;



        this.player.update();
        this.gen.allHazards.getChildren().forEach((obstical) => obstical.update()); // wasnt working immediately when i put in MapGenerator update()...
        this.gen.update();
    }

    PlayerHit() {
        this.player.notJumped = true;
        this.impact.play();
    }

    GameOver() {
        console.log("game over");
        this.scene.start('gameoverScene', {score: this.score});
    }
}