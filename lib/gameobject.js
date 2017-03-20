window._gameObjects = window._gameObjects || [];

class GameObject {
    constructor(args) {
        this.label          = args.label;
        this.width          = args.width ? args.width : 1;
        this.height         = args.height ? args.height :  1;
        this.shape          = args.shape || 'ellipse';
        this.color          = args.color || "rgb(0)";
        this.stroke         = args.stroke || "rgb(0)";
        this.position       = createVector(args.x, args.y);
        this.velocity       = createVector(0,0);
        this.acceleration   = createVector(0,0);
        this.collider       = args.collider;
        this.radius         = this.width/2;
        this.layer          = args.layer || 0;
        this.parent         = args.parent;

        Game.gameObjects.push(this);
        if (typeof Game.drawLayers[args.layer] !== 'undefined')
             Game.drawLayers[args.layer].push(this);
        else {
            Game.drawLayers[args.layer] = [this];
        }
    }

    collision (other) {
    }

    _update() {
        this.update();
    }

    _draw () {
        this.draw();
    }

    update() {
    }

    draw () {
    }

    serialize() {
        return {
            position:   this.position.array(),
            width:      this.width,
            height:     this.height,
            shape:      this.shape,
            color:      this.color,
        }
    }
}

//function GameObject (args) {
//    this.width          = args.width || 0;
//    this.height         = args.height || 0;
//    this.collider       = args.collider || null;
//    this.shape          = args.shape || 'ellipse';
//    this.color          = args.color || "rgb(0)";
//    this.stroke         = args.stroke || "rgb(0)";
//    this.position       = args.position || createVector(0,0);
//    this.velocity       = createVector(0,0);
//    this.acceleration   = createVector(0,0);
//    this.drawCallback   = args.draw || function () {};
//    this.updateCallback = args.update || function () {};
//
//    window._gameObjects.push(this);
//}

//GameObject.prototype.update = function() {
//    this.draw();
//    if (this.updateCallback) {
//        this.updateCallback();
//    }
//    if (this.drawCallback) {
//        this.drawCallback();
//    }
//}

//GameObject.prototype.draw = function() {
//    push();
//
//    fill(this.color);
//    stroke(this.stroke);
//    window[this.shape](this.position.x, this.position.y, this.width, this.height);
//
//    pop();
//}
//
//GameObject.prototype.serialize = function () {
//        return {
//            position:   this.position.array(),
//            width:      this.width,
//            height:     this.height,
//            shape:      this.shape,
//            color:      this.color,
//        }
//    }
