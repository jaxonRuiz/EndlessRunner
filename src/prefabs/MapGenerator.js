class MapGenerator {
    constructor() {
        this.obsticalTypes = ["placeholder", "placeholder2"];
        this.spawnRate = 1;
        this.liveObsticals = [];
        this.minHeight = game.config.height * 2/3;
        this.maxSpeed = 300;
        this.minSpeed = 150;
        this.obsticalsGroup = new Group();
    }
    GeneratorUpdate(scene) {

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

    ClearDeadObsticals() {
        if (Obstical.isGone(this.liveObsticals[0])) {
            console.log("destroyed obstical");
            this.liveObsticals[0].destroy();
            this.liveObsticals.shift();
        }
    }
}