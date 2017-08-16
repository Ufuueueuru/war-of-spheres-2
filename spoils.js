function setup(){
  createCanvas(400,400);
}
function draw(){
  background(0,0,0);
  fill(0,0,0);
  ellipse(mouseX,mouseY,10,10);
}
window.onresize = function(){
  canvas.size(window.width,window.height);
}
