var test;
var _agent;
var arr = [];
function Agent(args) {
    this.x         = args.x;
    this.y         = args.y;
    this.width     = args.width || 16;
    this.height    = args.height || 16;
    this.position  = createVector(args.x, args.y);
    //this.actionSet = ['up', 'down', 'left', 'right', 'sleep'];
    this.actionSet = ['right', 'up', 'left', 'down', 'sleep', 'towardFood'];
    this.states    = ['canSeeFood', 'cannotSeeFood', 'die'];
    this.direction = 
    this.moveSpeed = 3;
    this.hp        = 100;
    this.score     = 0;
    this.angle     = 0;
    this.foodInSight = [];
    this.range       = 100;
    this.score       = {
        food: 0,
        poison: 0,
        hp: 100,
    };
    this.reward = 0;
    this.history = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    };

    this.update = function() {
        var nearest;
        for (var i in this.foodInSight) {
            if (this.foodInSight[i]) {
                nearest = this.foodInSight[i];
                nearest = nearest.distanceToAgent > this.foodInSight[i].distanceToAgent ? this.foodInSight[i] : nearest;
            }
            this.foodToSeek = nearest ? nearest : null;
        }
        var agent = brain;
        var action = agent.act(this.states);
        this.action = this.actionSet[action];
        this.history[action] += 1;
        this.reward += env.sampleNextState(this.actionSet[action]);
        //this.move(this.actionSet[action]);
        brain.learn(this.reward);
    },

    this.addForce = function(force) {
    }


    this.move = function(action) {
        if (this.position.x + this.width/2 >= width) {
            this.position.x = width;
        }
        if (this.position.x + this.width/2 <= 0) {
            this.position.x = 0;
        }
        if (this.position.y + this.width/2 >= height) {
            this.position.y = height;
        }
        if (this.position.y + this.width/2 <= 0) {
            this.position.y = 0;
        }
        switch (action) {
            case 'up':
                this.position.y -= this.moveSpeed;
                //this.position.add(this.forward);
                //this.forward = createVector(this.position.x, this.position.y + 10);
                break;
            case 'down':
                this.position.y += this.moveSpeed;
                break;
            case 'left' :
                this.position.x -= this.moveSpeed;
                break;
            case 'right':
                this.position.x += this.moveSpeed;
                break;
            case 'towardFood': 
                if (this.foodToSeek) {
                    this.position.lerp(this.foodToSeek.position, 0.8);
                }
                break;
        }
    }

    this.rotate = function(angle) {
        this.angle = this.angle || 0;
        this.angle += radians(angle);
    }

    this.render = function() {
        rotate(this.angle);
        push();
        stroke('rbga(255,255,255,255,0.1)')
        fill('rgba(0,255,0, 0.1)');
        ellipse(0, 0, this.range + this.width - 2, this.range + this.width - 2);
        pop();
        ellipse(0, 0, this.width, this.height);
        line(0,0, this.forward.x, this.forward.y);
        this.eyes();
        /*test += 0.1;
        _angle = [0, 30, 60, 90, 120, 150, 180];
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle, this.position);
        _angle = [0, 30, 60, 90, 120, 150, 180];
        for (var i in _angle) {
            push();
            translate(this.position.x, this.position.y);
            rads = radians(_angle[i])
            arr[i] = rads;
            rotate(rads);
            line(0, 0, 0, 30);
            pop();
        }
        fill(127,127);
        stroke(0);
        ellipse(0,0,this.width, this.height);
        pop();
        test = test > 6.1 ? 0 : test;
        */
    }

    this.eyes = function() {
        var eyes = [];
        _angle = [-90, -30, -60, 0, 30, 60, 90];
        translate(0,0);
        for (var i in _angle) {
            eyes[i] = p5.Vector.fromAngle(radians(_angle[i])).mult(30);
            eye = eyes[i];
            if (typeof eye.x === 'undefined') eye.x = 0;
            //line(0,0, eye.x, eye.y);
        }
        this._eyes = eyes;
    }

    this.run = function() {
        push();
        translate(this.position.x, this.position.y);
        this.forward = p5.Vector.fromAngle(this.angle).mult(4);
        //_angle = [0, 30, 60, 90, 120, 150, 180];
        //for (var i in _angle) {
        //    this.eyes[i] = p5.Vector.fromAngle(_angle[i]);
        //}
        this.update();
        this.render();
        this._eyes[0].x = test;
        pop();
    }
}

