class Collider {
    constructor(parent) {
        this.parent = parent;
        this.position = parent.position;
        this.width = parent.width;
        this.height = parent.height;
        this.radius = parent.radius;
        this.history = [];
        Game.colliders.push(parent);
    }

    collisionStack (object) {
        if (this.history.length >= 5) {
            this.history.shift()
            this.history.push(object);
            return;
        }
        this.history.push(object);
    }

    detect() {
        var hit;
        Game.colliders.forEach(other => {
            if (other === this.parent) return;
            hit = this.collision(other);
        })
        if (hit) return hit;
    }

    get type() {
        return this.type = this._type;
    }

    set type(type) {
        return this._type = type;
    }
}

class BoxCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'box';
    }
}

class EllipseCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'ellipse';
    }

    update() {
        var hit;
        for (var i = 0; i < Game.colliders.length; i++){
            other = Game.colliders[i];
            hit = this.collision(other);
            if (hit) break;
        }
        if (hit) {
            this.colliding = hit;
        }
        else {
            this.colliding = false;
        }
    }

    collision(other) {
        if (this.position.dist(other.collider.position) <= this.radius + other.collider.radius) {
            this.parent.collision(other);
            other.collision(this.parent);
            return other;
        }
    }

}

class LineCollider extends Collider {
    constructor(parent) {
        super(parent);
        this.type = 'Line';
    }

    collision(other) {
        //console.log((this.position.dist(other.collider.position) + this.parent.collider.position.dist(other.collider.position)) <= (this.position.dist(this.parent.collider.position)));
        var collided;
        if (
            ((this.position.dist(other.collider.position) - other.radius) +
            (this.position2.dist(other.collider.position) - other.radius)) <= (this.position.dist(this.position2))) {
            this.parent.collision(other);
            other.collision(this.parent);
        }
    }

}
