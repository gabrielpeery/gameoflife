function Bot(args) {
    GameObject.call(this, args);
    this.loc        = createVector(args.x,args.y);
    this.vel        = createVector(0,0);
    this.acc        = createVector(0,0);
    this.width      = args.width  || 15;
    this.height     = args.height || 15;
    this.range      = 40;
    this.actionSet  = [];
    this.badActions = [];
    this.eyes       = [];

    for (var i = 0; i < 12; i ++) {
        this.eyes[i] = new Eye(this.loc.copy().add(p5.Vector.fromAngle(radians(i * 30)).mult(this.range)), i, this);
    }

    this.keyCodes = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            65: 'left',
            87: 'up',
            68: 'right',
            83: 'down',
            87: 'sleep',
            32: 'sleep',
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
        this.vel.limit(0.2);
        this.vel.add(this.acc);
        this.loc.add(this.vel);
    }


    this.draw = function () {
        push();
            fill("rgb(102, 178, 229)");
            stroke("rgb(49, 115, 159)");
            this.eyes.forEach( eye => eye.draw());
            ellipse(this.loc.x, this.loc.y, 15,15);
        pop();
    }

    this.move = function(keyCode) {
        this.dir = this.keyCodes[keyCode];
        if (!this.badActions[this.dir]) {
            this.applyForce(this.forces[this.dir]);
        }
    }

    this.applyForce = function (force) {
        this.acc = force;
    }

    this.sleep = function () {
        this.acc.setMag(0); 
        this.vel.setMag(0); 
    }

    this.edges = function() {
        if (this.loc.x + 2 + this.width/2 >= width) {
            this.loc.x -= 2;
            this.badActions['right'] = true;
        }
        if (this.loc.x - 2 - this.width/2 <= 0) {
            this.loc.x += 2;
            this.badActions['left'] = true;;
        }
        if (this.loc.y + 2 + this.width/2 >= height) {
            this.loc.y -= 2;
            this.badActions['down'] = true;
        }
        if (this.loc.y - 2 - this.width/2 <= 0) {
            this.loc.y += 2;
            this.badActions['up'] = true;;
        }
    }

    this.keyPressed = function (keyCode) {
        this.move(keyCode);
    }
}
