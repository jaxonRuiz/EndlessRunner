// hi there!
// still using semicolons because im still in C classes :(

let config = {
    type: Phaser.AUTO,
    width: 1920/2, // didnt want to do the math myself
    height: 1080/2,
    scene: [Menu, Play, GameOver]
}
let game = new Phaser.Game(config);
let keyROLL, keyJUMP, keyLEFT, keyRIGHT;
