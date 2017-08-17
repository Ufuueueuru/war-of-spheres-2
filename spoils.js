function setup(){
  createCanvas(windowWidth, windowHeight/2);
  background(0,0,0);
}
function draw(){
  noStroke();
  fill(255,255,255);
  if(mouseIsPressed){
    ellipse(mouseX,mouseY,constrain(50-dist(mouseX,mouseY,pmouseX,pmouseY,0,100)),constrain(50-dist(mouseX,mouseY,pmouseX,pmouseY,0,100)));
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight/2);
}
