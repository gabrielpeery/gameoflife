var agent;
var bot;
var food = [];
function setup() {
    createCanvas(720, 400);
    background(200);
    bot = new Bot({
        x: 300,
        y: 200,
        height: 15,
        width: 15,
    });
    //agent = new Agent({
    //    x: width/2,
    //    y: height/2,
    //    height: 20,
    //    width: 20,
    //    numInputs: 27,
    //    numActions: 9,
    //});
    for (var i = 0; i < 30; i++) {
        food.push(new Food(i));
    }
}

function draw() {
    background("rgb(232, 234, 236)");
    for (var i in food) {
        push();
        food[i].run();
        pop();
    }
    if (window._gameObjects.length) {
        window._gameObjects.forEach( data => {
            data.update();
        });
    }
    //ellipse(-10,0,4,4);
}


function keyPressed () {
    bot.keyPressed(keyCode);
}
