// hi there!
// still using semicolons because im still in C classes :(

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
let keyROLL, keyJUMP, keyLEFT, keyRIGHT;
