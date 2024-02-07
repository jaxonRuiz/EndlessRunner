// hi there!
// still using semicolons because im still in C classes :(

let config = {
    type: Phaser.AUTO,
    width: 1920/2, // didnt want to do the math myself
    height: 1080/2,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Play, GameOver]
}
let game = new Phaser.Game(config);
let keyEnter, keyRoll, keyRestart, keyJump, keyUp, keyDown;