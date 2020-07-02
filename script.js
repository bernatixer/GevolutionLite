let food = [];
let entities = [];
let canvasWidth;
let canvasHeight;

function setup() {
  canvasWidth = 0.75*windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  generateFood();
} 

function draw() {
  background(220);

  // MOVE ENTITIES
  for (let i=0; i<entities.length; ++i) entities[i].move();
  
  // DRAW FOOD
  for (let i=0; i<food.length; ++i) food[i].draw();

  // DRAW ENTITIES
  for (let i=0; i<entities.length; ++i) entities[i].draw();

}

function generateFood() {
  for (let i=0; i<50; ++i) {
    let x = Math.floor(Math.random() * Math.floor(canvasWidth));
    let y = Math.floor(Math.random() * Math.floor(canvasHeight));
    food.push(new Food(x,y));
  }
}

function windowResized() {
  canvasWidth = 0.75*windowWidth;
  canvasHeight = windowHeight;
  resizeCanvas(canvasWidth, canvasHeight);
}
