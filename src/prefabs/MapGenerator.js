class MapGenerator {
    constructor(scene) {
        this.scene = scene
        this.obsticalTypes = ["placeholder", "placeholder2"];
        this.spawnRate = 1;
        this.liveObsticals = new Set();
        this.deadObsticals = new Set();
        this.minHeight = game.config.height * 2/3;
        this.maxSpeed = 300;
        this.minSpeed = 150;
        this.allHazards = this.scene.physics.add.group(); // originally i was intending to have a greater variety of obsticals, but i dont have time :(
    }

    update() {
        
    }

    // i know its spelt wrong
    SpawnObstical() { // change to addObstical()?
        // maybe put a distribution curve or something fancy 
        let randY = Math.random()*this.minHeight;
        //let randTexture = this.obsticalTypes[Math.floor(Math.random() * this.numObsticals)]
        let randSpeed = Math.random() * (this.maxSpeed-this.minSpeed) + this.minSpeed;
        let obstical = new Obstical(this.scene, randY, "randTexture", randSpeed);
        obstical.setGenerator(this);
        this.scene.add.existing(obstical);
        this.allHazards.add(obstical); // adding to physics group
        this.liveObsticals.add(obstical); // adding to internal list (MAYBE NOT NECESSARY)
    }

    updateGroup() {

    }

    // resets obsticals that hit end to recycle them
    RecycleObstical() {
        _obsticals = this.deadObsticals.values();
        if (_obsticals.length > 0) {
            // resetting obstical
            console.log("recyled obstical");
            let randY = Math.random()*this.minHeight;
            let randSpeed = Math.random() * (this.maxSpeed-this.minSpeed) + this.minSpeed;
            let obstical = _obsticals[0];
            obstical.reset(randY, randSpeed);
            this.deadObsticals.delete(this);
            this.liveObsticals.add(this);
        }

    }

    // call when obstical hits the end of screen
    hitEnd(_obstical) {
        this.deadObsticals.add(_obstical);
        this.liveObsticals.add(_obstical);
    }
}