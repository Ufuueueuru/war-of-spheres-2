//War of Spheres by Justin Wise
var playerX;
var playerY;
var playerL = 50;
var playerLM = 50;
var level = 1;//1
var EXP = 0;
var enemyX = [];
var enemyY = [];
var enemyL = [];
var enemyT = [];
var keys = [];
var frame = 0;
var wait = 500;//500
var endGame = false;
var defense = 0;//0
var attack = 1;//1
var randomKey = 16;
var easterEgg = false;
var speed = 1;
var target = [
  
];

function drawEnemy(){
  fill(0, 21, 255);
  text('Army size: ' + enemyX.length,230,45);
  if(wait <= 0){
    text('Spawn speed: 500',230,55);
  }else{
    text('Spawn speed: ' + (500 - wait),230,55);
  }
  if(level >= 50){
    text("Press space to use tracking missiles",230,70);
    if(keys[32]){
      while(target.length < 10 && !(target.length >= enemyY.length) && EXP > 50){
        EXP -= 50;
        target.push({
          x: playerX + random(-100,100),
          y: playerY + random(-100,100),
          target: floor(random(0,enemyY.length))
        });
      }
    }
  }
  if(easterEgg === true || frameRate < 20){
    fill(0, 0, 0);
    text('The lag is REAL!!!!',145,390);
  }
  pop();
  if(level > 34 && playerL < playerLM){
    playerL += 6;
  }
  for(var i = 0;i < target.length;i ++){
    textSize(20);
    fill(255, 50, 90);
    text("Missile Deck:",10,110);
    text("Missile "+(i+1)+" in use",10,130+30*i);//(i+1)
    textSize(12);
    fill(0, 100, 255);
    ellipse(target[i].x, target[i].y, 15, 15);
    target[i].x += enemyX[target[i].target]/25 - target[i].x/25;
    target[i].y += enemyY[target[i].target]/25 - target[i].y/25;
    if(dist(target[i].x, target[i].y, enemyX[target[i].target], enemyY[target[i].target]) <= 30){
      enemyX.splice(target[i].target,1);
      enemyY.splice(target[i].target,1);
      enemyL.splice(target[i].target,1);
      enemyT.splice(target[i].target,1);
      target.splice(i,1);
    }else{
      if(enemyY.length === i){
        target.splice(i,1);
      }else{
        if(isNaN(target[i].x) || isNaN(target[i].y)){
          target.splice(i,1);
        }
      }
    }
  }
  for(var t = 0;t < enemyY.length;t++){
    if(level > 10 && enemyL[t] < 50){
      enemyL[t] += 0.1;
    }
    if(level > 40 && enemyL[t] < 150){
      enemyL[t] += 1;
    }
    if(enemyL[t] <= 0){
      enemyX.splice(t,1);
      enemyY.splice(t,1);
      enemyL.splice(t,1);
      enemyT.splice(t,1);
      if(enemyT[t] === 0){
        EXP += 40;
      }else{
        if(enemyT[t] === 1){
          EXP += 80;
        }
      }
    }
    fill(140, 255, 0);
    rectMode(CENTER);
    rect(enemyX[t],enemyY[t] + 15,enemyL[t]/2,10);
    rectMode(CORNER);
    if(enemyT[t] === 0){
      fill(242, 78, 78);
    }else{
      if(enemyT[t] === 1){
        fill(242, 242, 78);
        playerL -= 0.3;
        stroke(200 + 50*sin(frameCount/10), 242 + 50*sin(frameCount/10), 50 + 50*sin(frameCount/10),100);
        strokeWeight(10);
        line(enemyX[t],enemyY[t],playerX,playerY);
        strokeWeight(1);
      }
    }
    ellipse(enemyX[t],enemyY[t],20,20);
    stroke(0,0,0);
    strokeWeight(1);
    enemyX[t] += playerX/500 - enemyX[t]/500;
    enemyY[t] += playerY/500 - enemyY[t]/500;
    if(enemyT[t] === 1){
      enemyX[t] -= playerX/200 - enemyX[t]/200;
      enemyY[t] -= playerY/200 - enemyY[t]/200;
    }
    if(level > 15){
      enemyX[t] += playerX/500 - enemyX[t]/500;
      enemyY[t] += playerY/500 - enemyY[t]/500;
    }
    enemyX[t] = constrain(enemyX[t],10,windowWidth-10);
    enemyY[t] = constrain(enemyY[t],10,windowHeight-10);
    if(level > 30 && random(0,3000) < 1){
      playerL -= 100;
      stroke(242, 54, 54);
      strokeWeight(50);
      line(enemyX[t],enemyY[t],playerX,playerY);
      stroke(0,0,0);
      strokeWeight(1);
      enemyT[t] = 1;
    }
    if(dist(playerX,playerY,enemyX[t],enemyY[t]) < 200 && enemyX.length < random(50,100) && level > 20){
      enemyX[t] -= playerX/100 - enemyX[t]/100;
      enemyY[t] -= playerY/100 - enemyY[t]/100;
      if(level > 15){
        enemyX[t] -= playerX/100 - enemyX[t]/100;
        enemyY[t] -= playerY/100 - enemyY[t]/100;
      }
    }
    for(var q = 0;q < enemyY.length;q++){
      if(dist(enemyX[q],enemyY[q],enemyX[t],enemyY[t]) <= 20){
        enemyX[t] -= enemyX[q]/10 - enemyX[t]/10;
        enemyY[t] -= enemyY[q]/10 - enemyY[t]/10;
        if(level > 15){
          enemyX[t] -= enemyX[q]/10 - enemyX[t]/10;
          enemyY[t] -= enemyY[q]/10 - enemyY[t]/10;
        }
      }
    }
    if(enemyL.length < enemyX.length){//flux capacitor
      enemyL.push(random(10,50));
    }
    if(isNaN(enemyX[t])){
      enemyX[t] = random(10,windowWidth-10);
    }
    if(isNaN(enemyY[t])){
      enemyY[t] = random(10,windowHeight-10);
    }
    if(isNaN(enemyT[t])){
      if(level >= 60){
        enemyT[t] = floor(random(0,2));
      }else{
        enemyT[t] = 0;
      }
    }
    if(dist(playerX,playerY,enemyX[t],enemyY[t]) <= 25){
      if(playerL > 0){
        playerL -= 15 - defense;
        if(level > 50){
          playerL -= 30 - defense;
        }
      }
      if(enemyL[t] > 0){
        enemyL[t] -= attack;
      }
      enemyX[t] -= playerX/5 - enemyX[t]/5;
      enemyY[t] -= playerY/5 - enemyY[t]/5;
      playerX -= enemyX[t]/5 - playerX/5;
      playerY -= enemyY[t]/5 - playerY/5;
    }
  }
  fill(242, 78, 78);
};

function drawPlayer(){
    fill(4, 0, 255);
    ellipse(playerX,playerY,30,30);
};

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
    keys[keyCode] = true;
};

function keyReleased(){
    keys[keyCode] = false;
};


function setup(){
  createCanvas(windowWidth,windowHeight);
  playerX = windowWidth/2;
  playerY = windowHeight/2
}

function draw() {
    if(endGame === false){
      if(level > 200){
        wait = 5;
        if(playerL < playerLM){
          playerL += 2;
        }
      }
      background(22, 184, 7);
      if(keys[randomKey]){
        EXP += level * 2;
      }
      playerX = constrain(playerX,15,windowWidth-15);
      playerY = constrain(playerY,15,windowHeight-15);
      playerL = constrain(playerL,0,playerLM);
      push();
      scale(((windowWidth+windowHeight)/2)/800);
      noStroke();
      fill(0, 0, 0);
      text(EXP + ' / ' + level * 95 + ' exp',10,50);
      text(round(playerL) + ' / ' + playerLM + ' life',120,50);
      text('attack: ' + attack,230,15);
      text('defense: ' + defense,230,25);
      text('level: ' + level,230,35);
      rect(10,10,100,20,5);
      rect(120,10,100,20,5);
      fill(255, 0, 0);
      rect(123,12,(95/playerLM) * playerL,16,5);
      fill(0, 13, 255);
      rect(12,12,EXP / level,17,5);
      drawEnemy();
      drawPlayer();
      if(EXP >= level * 95){
        level ++;
        EXP = 0;
        if(speed < 6){
          speed += 0.2;
        }
        if(defense < 10){
          defense += 1;
        }
        attack += 1;
        playerLM += 30;
        playerL += 30;
      }
      if(keys[38]){
        playerY -= speed;
      }
      if(keys[39]){
        playerX += speed;
      }
      if(keys[37]){
        playerX -= speed;
      }
      if(keys[40]){
        playerY += speed;
      }
      if(playerL < playerLM){
        playerL += 0.5;
      }
      frameRate(10000);
      if(easterEgg){
        frameRate(random(1,1000));
      }
      if(frameCount - frame > wait && enemyX.length < 300){
        frame = frameCount;
        enemyX.push(random(0,windowWidth));
        enemyY.push(random(0,windowHeight));
        enemyL.push(random(10,50));
        if(level >= 60){
          if(random(0,100) < 5){
          	enemyT.push(1);
          }else{
            enemyT.push(0);
          }
        }else{
          enemyT.push(0);
        }
        if(wait > 30){
          wait -= 10;
        }
        if(wait < 0){
          wait = 0;
        }
        EXP += floor(random(0,10));
      }
      if(playerL <= 0){
        endGame = true;
      }
    }else{
      noStroke();
      background(255, 255, 255);
      textSize(50);
      textAlign(CENTER);
      text('GAME\nOVER',windowWidth/2,windowHeight/2);
      textSize(12);
      text('Press enter to\nrestart',windowWidth/2,windowHeight/2+100);
      textAlign(LEFT);
      if(keys[13]){
        playerX = windowWidth/2;
        playerY = windowHeight/2;
        playerL = 50;
        playerLM = 50;
        level = 1;//1
        EXP = 0;
        enemyX = [];
        enemyY = [];
        enemyL = [];
        keys = [];
        frame = frameCount;
        wait = 500;//500
        endGame = false;
        defense = 0;//0
        attack = 1;//1
        randomKey = 16;
        easterEgg = false;
        speed = 1;
        target = [];
      }
    }
};
