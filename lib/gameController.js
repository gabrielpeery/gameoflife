class Game {
    constructor() {
        this.gameObjects = [];
        this.drawLayers = {};
        this.colliders = [];
    }

    update() {
        Object.keys(this.drawLayers).forEach( layer => {
            this.drawLayers[layer].forEach( object => {
                object.draw();
                object.update();
                if (object.collider) {
                    object.collider.detect();
                }
            });
        });
    }

    draw() {

    }
}

Game = new Game;
