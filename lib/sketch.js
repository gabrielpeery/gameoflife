var agent;
var bot;
var food = [];
var stop = false;
function setup() {
    createCanvas(720, 400);
    background(200);
    bot = new Bot({
        x: 300,
        y: 200,
        height: 15,
        width: 15,
        label: "bot",
        layer: 99,
    });
    //agent = new Agent({
    //    x: width/2,
    //    y: height/2,
    //    height: 20,
    //    width: 20,
    //    numInputs: 27,
    //    numActions: 9,
    //});
    for (var i = 0; i < 1; i++) {
        food.push(new Food({}));
    }
    food[0].position = createVector(450, 210);
}

function draw() {
    background("rgb(232, 234, 236)");
    Game.update();
    //ellipse(-10,0,4,4);
}


function keyPressed () {
    if (keyCode === 27) {
        stop = !stop;
    }
    bot.keyPressed(keyCode);
}
