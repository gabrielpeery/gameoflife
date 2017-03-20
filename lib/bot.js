class Bot extends GameObject {
    constructor(args) {
        super(args);
        this.collider = new EllipseCollider(this);
        this.range = 45;
        this.eyes = [];
        for (var i = 0; i < 12; i ++) {
                console.log(this.position.copy().add(p5.Vector.fromAngle(radians(i * 30)).mult(this.range)));
            this.eyes[i] = new Eye({
                position: this.position.copy().add(p5.Vector.fromAngle(radians(i * 30)).mult(this.range)),
                parent: this,
                id: i,
                layer: 2,
            });
        }
    }

    update() {
        this.edges();
        //this.eyes.forEach( eye => eye.update());
        this.velocity.limit(0.2);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }


    draw() {
        push();
            fill("rgb(102, 178, 229)");
            stroke("rgb(49, 115, 159)");
            //this.eyes.forEach( eye => eye.draw());
            ellipse(this.position.x, this.position.y, 15,15);
        pop();
    }

    move(keyCode) {
        this.dir = this.keyCodes[keyCode];
        this.applyForce(this.forces[this.dir]);
    }

    applyForce(force) {
        this.acceleration = force;
    }

    sleep() {
        this.acceleration.setMag(0);
        this.velocity.setMag(0);
    }

    edges() {
        if (this.position.x + 2 + this.width/2 >= width) {
            this.position.x -= 2;
        }
        if (this.position.x - 2 - this.width/2 <= 0) {
            this.position.x += 2;
        }
        if (this.position.y + 2 + this.width/2 >= height) {
            this.position.y -= 2;
        }
        if (this.position.y - 2 - this.width/2 <= 0) {
            this.position.y += 2;
        }
    }

    keyPressed(keyCode) {
        this.move(keyCode);
    }

    get forces() {
        return {
            right: createVector(1,0),
            left:  createVector(-1,0),
            up:    createVector(0,-1),
            down:  createVector(0,1),
            sleep: createVector(0,0),
        }
    }

    get keyCodes() {
        return {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            65: 'left',
            87: 'up',
            68: 'right',
            83: 'down',
        }
    }
}

/*
    this.keyCodes = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            65: 'left',
            87: 'up',
            68: 'right',
            83: 'down',
        }

    this.forces = {
        right: createVector(1,0),
        left:  createVector(-1,0),
        up:    createVector(0,-1),
        down:  createVector(0,1),
        sleep: createVector(0,0),
    }

    this.update = function() {
        this.draw();
        this.edges();
        this.eyes.forEach( eye => eye.update());
        this.velocity.limit(0.2);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }


    this.draw = function () {
        push();
            fill("rgb(102, 178, 229)");
            stroke("rgb(49, 115, 159)");
            this.eyes.forEach( eye => eye.draw());
            ellipse(this.position.x, this.position.y, 15,15);
        pop();
    }

    this.move = function(keyCode) {
        this.dir = this.keyCodes[keyCode];
        if (!this.badActions[this.dir]) {
            this.applyForce(this.forces[this.dir]);
        }
    }

    this.applyForce = function (force) {
        this.acceleration = force;
    }

    this.sleep = function () {
        this.acceleration.setMag(0);
        this.velocity.setMag(0);
    }

    this.edges = function() {
        if (this.position.x + 2 + this.width/2 >= width) {
            this.position.x -= 2;
            this.badActions['right'] = true;
        }
        if (this.position.x - 2 - this.width/2 <= 0) {
            this.position.x += 2;
            this.badActions['left'] = true;;
        }
        if (this.position.y + 2 + this.width/2 >= height) {
            this.position.y -= 2;
            this.badActions['down'] = true;
        }
        if (this.position.y - 2 - this.width/2 <= 0) {
            this.position.y += 2;
            this.badActions['up'] = true;;
        }
    }

    this.keyPressed = function (keyCode) {
        this.move(keyCode);
    }
    this.test = function() {
        new Collider;
    }
}
*/
