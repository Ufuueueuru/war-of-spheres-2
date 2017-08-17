function setup(){
  createCanvas(windowWidth, windowHeight/2);
  background(0,0,0);
}
function draw(){
  noStroke();
  fill(255,255,255);
  strokeWeight(10-dist(mouseX,mouseY,pmouseX,pmouseY,0,100));
  if(mouseIsPressed){
    line(mouseX,mouseY,pmouseX,pmouseY);
  }
}
function windowResized(){
  background(0,0,0);
  resizeCanvas(windowWidth, windowHeight/2);
}
