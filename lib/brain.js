var _history = [];
window.env = {
    getNumStates: function() {
        return 8; // x,y,vx,vy, puck dx,dy
    },

    getMaxNumActions: function() {
        return 5; // left, right, up, down, nothing
    },

    sampleNextState: function(action) {
        _history.push();
        if (agent.gotFood) {
            return 3;
        }
        if (action === "towardFood" && !agent.foodToSeek) {
            return -1;
        }
        else if (action === "towardFood" && agent.foodToSeek) {
            return 2;
        }
        return 0;
    },
}

window.spec = { 
    alpha: 0.05,
    experience_add_every: 1,
    epsilon: 0.99,
};

window.brain = new RL.DQNAgent(this.env, spec);
