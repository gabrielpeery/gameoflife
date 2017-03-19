function Eye (loc, id, parent) {
    this.loc = loc;
    this.id = id;
    this.parent = parent;
    this.color = "rgb(0,0,0)";
    this.collisionObj;
    
    this.setColor = function (color) {
        colors = {
            green: "rgb(39, 200, 42)",
            black: "rgb(0, 0, 0)",
            red: "rgb(200, 42, 39)"
        }
        this.color = color;
    }

    this.update = function() {
        this.loc = this.parent.loc.copy().add(p5.Vector.fromAngle(radians(this.id * 30)).mult(parent.range));
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
        objLocation = obj.distToBot + this.loc.dist(obj.loc)
        parDist  = parent.loc.dist(this.loc);
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
            line(this.loc.x, this.loc.y, parent.loc.x, parent.loc.y);
        pop();
    }
}
