function Food (id) {
    this.name      = "food";
    this.color     = "rgb(39, 200, 42)"
    this.width     = 10;
    this.height    = 10;
    this.x         = random(0, width);
    this.y         = random(0, height);
    this.loc  = createVector(this.x, this.y);
    this.id        = id;

    this.update = function() {
        this.distToBot = int(dist(bot.loc.x, bot.loc.y, this.loc.x, this.loc.y));
        //if (d <= (agent.width/2 + this.width/2)) {
        //    agent._lastScore = agent.score;
        //    agent.gotFood = 3;
        //    this.loc.x = random(0, width);
        //    this.loc.y = random(0, height);
        //}
        //if (d <= agent.range) {
        //    this.distanceToAgent = d;
        //    agent.foodInSight[this.id] = this;
        //}
        //else {
        //    agent.foodInSight[this.id] = null;
        //}
    },

    this.render = function() {
        push();
        fill(this.color);
        noStroke();
        ellipse(this.loc.x, this.loc.y, this.width, this.height);
        pop();
    }

    this.collide = function(obj) {
        for (var i in agent._eyes) {
            if (this.loc.dist(agent._eyes[i]) <= this.width){
                console.log("hit");
            }
        }
    }

    this.run = function() {
        this.update();
        this.render();
    }
}
