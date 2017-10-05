var playerX;
var playerY;
var playerL = 50;
var playerLM = 50;
var level = 1;//1
var EXP = 0;
var enemyX = [];
var enemyY = [];
var enemyL = [];
var keys = [];
var frame = 0;
var wait = 500;//500
var endGame = false;
var defense = 0;//0
var attack = 1;//1
var randomKey = 16;
var easterEgg = false;
var speed = 1;

var drawEnemy = function(){
  if(level > 49){
      text("Press space to send bomb",230,70);
  }
  fill(0, 21, 255);
  text('Army size: ' + enemyX.length,230,45);
  if(wait <= 0){
      text('Spawn speed: 500',230,55);
  }else{
      text('Spawn speed: ' + (500 - wait),230,55);
  }
  if(easterEgg === true){
      fill(0, 0, 0);
      text('The lag is REAL!!!!',145,390);
  }
  pop();
    if(level > 14 && playerL < playerLM){
        playerL += 1;
    }
    for(var t = 0;t < enemyY.length;t++){
        if(level > 49 && keys[32] && EXP >= 5 && enemyX.length > 2 ){
            enemyL[t] -= attack/15;
            EXP -= 10;
        }
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
            EXP += 40;
        }
        fill(140, 255, 0);
        rectMode(CENTER);
        rect(enemyX[t],enemyY[t] + 15,enemyL[t]/2,10);
        rectMode(CORNER);
        fill(242, 78, 78);
        ellipse(enemyX[t],enemyY[t],20,20);
        /*if(enemyX[t] < playerX){
            enemyX[t] += 0.1;
            if(level > 15){
                enemyX[t] += 0.4;
            }
        }
        if(enemyX[t] > playerX){
            enemyX[t] -= 0.1;
            if(level > 15){
                enemyX[t] -= 0.4;
            }
        }
        if(enemyY[t] < playerY){
            enemyY[t] += 0.1;
            if(level > 15){
                enemyY[t] += 0.4;
            }
        }
        if(enemyY[t] > playerY){
            enemyY[t] -= 0.1;
            if(level > 15){
                enemyY[t] -= 0.4;
            }
        }*/
        enemyX[t] += playerX/500 - enemyX[t]/500;
        enemyY[t] += playerY/500 - enemyY[t]/500;
        if(level > 15){
            enemyX[t] += playerX/500 - enemyX[t]/500;
            enemyY[t] += playerY/500 - enemyY[t]/500;
        }
        if(level > 200){
            wait = 0;
        }
        enemyX[t] = constrain(enemyX[t],10,windowWidth-10);
        enemyY[t] = constrain(enemyY[t],10,windowHeight-10);
        if(level > 30 && random(0,10000) < 1){
            playerL -= 100;
            fill(71, 9, 115);
            ellipse(enemyX[t],enemyY[t],500,500);
        }
        if(dist(playerX,playerY,enemyX[t],enemyY[t]) < 200 && enemyX.length < random(50,100) && level > 20){
            enemyX[t] -= playerX/100 - enemyX[t]/100;
            enemyY[t] -= playerY/100 - enemyY[t]/100;
            if(level > 15){
                enemyX[t] -= playerX/100 - enemyX[t]/100;
                enemyY[t] -= playerY/100 - enemyY[t]/100;
            }
            /*if(enemyX[t] > playerX){
                enemyX[t] ++;
                if(level > 15){
                    enemyX[t] ++;
                }
            }
            if(enemyX[t] < playerX){
                enemyX[t] --;
                if(level > 15){
                    enemyX[t] --;
                }
            }
            if(enemyY[t] > playerY){
                enemyY[t] ++;
                if(level > 15){
                    enemyY[t] ++;
                }
            }
            if(enemyY[t] < playerY){
                enemyY[t] --;
                if(level > 15){
                    enemyY[t] --;
                }
            }*/
        }
        for(var q = 0;q < enemyY.length;q++){
            if(dist(enemyX[q],enemyY[q],enemyX[t],enemyY[t]) <= 20){
                enemyX[t] -= enemyX[q]/10 - enemyX[t]/10;
                enemyY[t] -= enemyY[q]/10 - enemyY[t]/10;
                if(level > 15){
                    enemyX[t] -= enemyX[q]/10 - enemyX[t]/10;
                    enemyY[t] -= enemyY[q]/10 - enemyY[t]/10;
                }
                /*if(enemyX[t] < enemyX[q]){
                    enemyX[t] -= 2;
                    enemyX[q] += 2;
                }
                if(enemyX[t] > enemyX[q]){
                    enemyX[t] += 2;
                    enemyX[q] -= 2;
                }
                if(enemyY[t] < enemyY[q]){
                    enemyY[t] -= 2;
                    enemyY[q] += 2;
                }
                if(enemyY[t] > enemyY[q]){
                    enemyY[t] += 2;
                    enemyY[q] -= 2;
                }*/
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
            /*
            if(enemyX[t] < playerX){
                enemyX[t] -= 5;
                playerX += 5;
            }
            if(enemyX[t] > playerX){
                enemyX[t] += 5;
                playerX -= 5;
            }
            if(enemyY[t] < playerY){
                enemyY[t] -= 5;
                playerY += 5;
            }
            if(enemyY[t] > playerY){
                enemyY[t] += 5;
                playerY -= 5;
            }*/
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
    background(22, 184, 7);
    if(keys[randomKey]){
        EXP += level * 2;
    }
    /*println(enemyY[0]);
    println(enemyX[0]);
    println(enemyL[0]);*/
    playerX = constrain(playerX,15,windowWidth-15);
    playerY = constrain(playerY,15,windowHeight-15);
    drawPlayer();
    push();
    scale(windowWidth/800);
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
    if(EXP >= level * 95){
        level ++;
        EXP = 0;
        if(speed < 10){
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
        background(255, 255, 255);
        textSize(50);
        textAlign(CENTER);
        text('GAME\nOVER',windowWidth/2,windowHeight/2);
        textSize(12);
        text('Press enter to\nrestart',windowWidth/2,windowHeight/2+100);
        textAlign(BASELINE);
        if(keys[13]){
            //restart
          playerX = windowWidth/2;
          playerY = windwoHeight/2;
          playerL = 50;
          playerLM = 50;
          level = 1;//1
          EXP = 0;
          enemyX = [];
          enemyY = [];
          enemyL = [];
          keys = [];
          frame = 0;
          wait = 500;//500
          endGame = false;
          defense = 0;//0
          attack = 1;//1
          randomKey = 16;
          easterEgg = false;
          speed = 1;
        }
    }
};
