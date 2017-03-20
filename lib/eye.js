class Eye extends GameObject {
    constructor(args) {
        super(args);
        this.id = args.id;
        this.label = 'eye';
        this.color = 'rgb(0, 0, 0)';
        this.width = 2;
        this.height = 2;
        this.shape = 'line';
        this.layer = 0;
        this.collider = new LineCollider(this);
    }

    update() {
        this.position = this.parent.position.copy().add(p5.Vector.fromAngle(radians(this.id * 30)).mult(this.parent.range));
        this.collider.position = this.position;
        this.collider.position2 = this.parent.position.copy().add(p5.Vector.fromAngle(radians(this.id * 30)).mult(15));
    }

    draw() {
        fill(this.color);
        stroke(this.color);
        if (this.collider.position2) line(this.collider.position.x, this.collider.position.y, this.collider.position2.x, this.collider.position2.y);
    }

    collision(other) {
        this.color = other.color;
    }
}
/*
function Eye (position, id, parent) {
    this.position= position;
    this.id = id;
    this.parent = parent;
    this.color = "rgb(0,0,0)";
    this.collisionObj;

    this.setColor = function (color) {
        colors = {
            // green: "rgb(39, 200, 42)",
            black: "rgb(0, 0, 0)",
            red: "rgb(200, 42, 39)"
        }
        this.color = color;
    }

    this.update = function() {
        this.position = this.parent.position.copy().add(p5.Vector.fromAngle(radians(this.id * 30)).mult(parent.range));
        if (food.length) {
            food.forEach( data => {
                //console.log(this.collision(data));
            })
        }
        //if (collisionObj) {
        //    console.log(collisionObj);
        //    this.collisionObj = this.collisionObj && this.collisionObj.distToBot < collisionObj.distToBot ? collisionObj : this.collisionObj;
        //}
    }

    this.collision = function(obj) {
        if (!obj) return;
        objLocation = obj.distToBot + this.position.dist(obj.position)
        parDist  = parent.position.dist(this.position);
        if ((parDist - objLocation) * -1 <= (obj.width-5)/2) {
            return obj;
        }
    }

    this.draw = function() {
        push();
            strokeWeight(1.5);
            if (this.collidingObj) {
                stroke(this.collidingObj.color);
            }
            else {
                stroke(this.color);
            }
            line(this.position.x, this.position.y, parent.position.x, parent.position.y);
        pop();
    }
}*/
