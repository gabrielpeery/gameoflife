class Food extends GameObject {
    constructor(args) {
        args = {
            label     : "food",
            color     : "rgb(39, 200, 42)",
            height    : 10,
            width     : 10,
            x         : random(0, width),
            y         : random(0, height),
            layer     : 1,
        }
        super(args);
        this.collider = new EllipseCollider(this);
    }

    update() {
        this.collider.position = this.position;
    }

    collision (other) {
        if (other.label === "eye") {
            //other.color = this.color;
            other.parent.canSeeFood = true;
        }
        if (other.label === "bot") {
            this.position.x = random(0, width);
            this.position.y = random(0, height);
        }
    }

    draw () {
        fill(this.color);
        stroke(this.color);
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }
}
