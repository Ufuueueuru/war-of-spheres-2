function setup(){
  createCanvas(windowWidth, windowHeight/2);
  background(0,0,0);
}
function draw(){
  fill(255,255,255);
  if(mouseIsPressed){
    ellipse(mouseX,mouseY,50,50);
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight/2);
}
