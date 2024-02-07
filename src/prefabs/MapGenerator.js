class MapGenerator {
    constructor() {
        this.obsticalTypes = ["placeholder", "placeholder2"];
        this.numObsticals = 1; // im tired
        this.liveObsticals = [];
        this.level = 1;
        this.minHeight = game.config.height * 2/3;
        this.maxSpeed = 300;
        this.minSpeed = 150;
    }


    // i know its spelt wrong
    SpawnObstical(scene) {
        // maybe put a distribution curve or something fancy 
        let randY = Math.random()*this.minHeight;
        console.log(this.obsticalTypes);
        //let randTexture = this.obsticalTypes[Math.floor(Math.random() * this.numObsticals)]
        let randSpeed = Math.random() * (this.maxSpeed-this.minSpeed) + this.minSpeed;
        let obstical = new Obstical(scene, randY, "randTexture", randSpeed);
        scene.add.existing(obstical);

        this.liveObsticals.push(obstical);
    }
}