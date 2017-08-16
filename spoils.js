function setup(){
  createCanvas(400,400);
}
function draw(){
  background(0,0,0);
  fill(255,255,255);
  ellipse(mouseX,mouseY,50,50);
}
function windowResized(){
  resizeCanvas(windowWidth,windiwHeight);
}
