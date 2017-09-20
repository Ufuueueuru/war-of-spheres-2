var apple = {//apple object
  x: 0,
  y: 0
}
var snake = {//snake object
  x: [100],
  y: [100],
  xV: [10],
  yV: [0]
};
var lastKey;
var keys = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  apple.x = floor(random(0,windowWidth)/10)*10;
  apple.y = round(random(0,windowHeight)/10)*10;
}

function draw() {
  background(0, 0, 0);
  noStroke();
  fill(255,0,0);
  rect(apple.x,apple.y,10,10);//apple
  fill(0,255,0);
  for(var i = snake.x.length-1;i >= 0;i --){
    rect(snake.x[i],snake.y[i],10,10);
    snake.x[i] += snake.xV[i];
    snake.y[i] += snake.yV[i];
    if(i > 0){
      //if(!(snake.x[i] === snake.x[i-1] && snake.y[i] === snake.y[i-1])){
        snake.xV[i] = snake.xV[i-1];
        snake.yV[i] = snake.yV[i-1];
      //}
    }else{
      if(snake.x[i] === apple.x && snake.y[i] === apple.y){
        snake.x.push(snake.x[snake.x.length-1]);
        snake.y.push(snake.y[snake.y.length-1]);
        snake.xV.push(0);
        snake.yV.push(0);
      }
    }
  }
  if(keys[39]){
    lastKey = 39;
  }
  if(keys[37]){
    lastKey = 37;
  }
  if(keys[38]){
    lastKey = 38;
  }
  if(keys[40]){
    lastKey = 40;
  }
  if(lastKey === 39){//right
    snake.xV[0] = 10;
    snake.yV[0] = 0;
  }
  if(lastKey === 37){//left
    snake.xV[0] = -10;
    snake.yV[0] = 0;
  }
  if(lastKey === 38){//up
    snake.xV[0] = 0;
    snake.yV[0] = -10;
  }
  if(lastKey === 40){//down
    snake.xV[0] = 0;
    snake.yV[0] = 10;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  keys[keyCode] = true;
}

function keyReleased(){
  keys[keyCode] = false;
}
