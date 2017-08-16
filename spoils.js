function setup(){
  createCanvas(windowWidth, windowHeight/2);
  background(0,0,0);
}
function draw(){
  noStroke();
  fill(255,255,255);
  if(mouseIsPressed){
    ellipse(mouseX,mouseY,dist(mouseX,mouseY,pmouseX,pmouseY),dist(mouseX,mouseY,pmouseX,pmouseY));
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight/2);
}
