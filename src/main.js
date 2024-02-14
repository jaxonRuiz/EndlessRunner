// Game title: Escape from FlashAnim
// Author: jaxon ruiz
// ~8 hours worked
// (still using semicolons because of C trauma)

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