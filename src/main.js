// Game title: Surviving
// Author: jaxon ruiz
// ~8 hours worked
// (still using semicolons because of C trauma)
// I did not sufficiently preplan the runner, and changed my mind FAR too much.
// by the end my code is a mess of various attempted ideas, many of which are 
// suboptimal or incomplete.
// i feel like i have (er) "creative" coding solutions to some things. to say the least...

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
let keyEnter, keyRoll, keyRestart, keyJump, keyUp, keyDown, keyLeft, keyRight;
// kept having too many ideas, several unnecessary keys here