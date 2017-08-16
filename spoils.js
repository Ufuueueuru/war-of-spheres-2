function setup(){
  createCanvas(windowWidth,windowHeight);
}
function draw(){
  background(100,0,0);
  fill(255,255,255);
  ellipse(mouseX,mouseY,50,50);
}
function windowResized(){
  resizeCanvas(windowWidth,windiwHeight);
}
