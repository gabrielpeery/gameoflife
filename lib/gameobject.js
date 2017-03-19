window._gameObjects = window._gameObjects || [];
function GameObject (args) {
    this.width    = args.width;
    this.height   = args.height;
    this.collider = args.collider;
    this.shape    = args.shape;
    this.color    = args.color || "rgb(0)";
    this.stroke   = args.stroke || "rgb(0)";
    this.loc      = args.loc;
    this.drawCallback = args.draw;
    this.updateCallback = args.update;
    window._gameObjects.push(this);
}

GameObject.prototype.update = function() {
    this.draw();
    if (this.updateCallback) {
        this.updateCallback();
    }
    if (this.drawCallback) {
        this.drawCallback();
    }
}

GameObject.prototype.draw = function() {
    push();

    fill(this.color);
    stroke(this.stroke);
    window[this.shape](this.loc.x, this.loc.y, this.width, this.height);

    pop();
}

