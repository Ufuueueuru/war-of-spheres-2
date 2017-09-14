/* @pjs preload="Title.png";*/
var playerNum = 1;
var keySelect = [false,0];
var menu = 3;//0: main menu, 1: settings, 2: character select, 3: intro, 4: actual battle
var arena = "classic";//what arena you are in
var keys = [];
var fire = [];
var title;//images
var quotePic;
var floweyPic;
var glitchPic;
var fawfulPic;//images
var slideX = [0,0];
var slideY = [0,0];
var loading = 0;
var picCount = 0;
var pause = false;
var keyCodes = [
  "",//0
  "",//1
  "",//2
  "break",//3
  "",//4
  "",//5
  "",//6
  "",//7
  "backspace",//8
  "tab",//9
  "",//10
  "",//11
  "clear",//12
  "enter",//13
  "",//14
  "",//15
  "shift",//16
  "ctrl",//17
  "alt",//18
  "pause/break",//19
  "caps\nlock",//20
  "",//21
  "",//22
  "",//23
  "",//24
  "",//25
  "",//26
  "escape",//27
  "conversion",//28
  "non-conversion",//29
  "",//30
  "",//31
  "spacebar",//32
  "page\nup",//33
  "page\ndown",//34
  "end",//35
  "home ",//36
  "left",//37
  "up",//36
  "right",//39
  "down",//40
  "select",//41
  "print",
  "execute",//43
  "Print\nScreen",
  "insert ",//45
  "delete",
  "",//47
  "0",//48
  "1",//49
  "2",
  "3",
  "4",//52
  "5",
  "6",
  "7",//55
  "8",
  "9",//57
  ":",
  ";",//59
  "<",//60
  "=",//61
  "",//62
  "ß",
  "@",//64
  "a",
  "b",//66
  "c",
  "d",//68
  "e",//69
  "f",
  "g",//71
  "h",
  "i",
  "j",//74
  "k",
  "l",//76
  "m",
  "n",//78
  "o",
  "p",//80
  "q",
  "r",//82
  "s",
  "t",//84
  "u",
  "v",//86
  "w",
  "x",//88
  "y",
  "z",//90
  "Left ⌘",//91
  "right\nwindow\nkey",
  "Right ⌘",//93
  "",//94
  "",//95
  "num\n0",
  "num\n1",//97
  "num\n2",
  "num\n3",//99
  "num\n4",
  "num\n5",//101
  "num\n6",
  "num\n7",//103
  "num\n8",
  "num\n9",//105
  "*",
  "+",//107
  "num\n.",
  "-",//109
  ".",
  "/",//111
  "f1",
  "f2",//113
  "f3",
  "f4",//115
  "f5",
  "f6",//117
  "f7",
  "f8",//119
  "f9",
  "f10",//121
  "f11",
  "f12",
  "f13",//124
  "f14",
  "f15",//126
  "f16",
  "f17",//128
  "f18",
  "f19",//130
  "f20",
  "f21",//132
  "f22",
  "f23",//134
  "f24",
  "",//136
  "",//137
  "",//138
  "",//139
  "",//140
  "",//141
  "",//142
  "",//143
  "num\nlock",//144
  "scroll\nlock",
  "",//146
  "",//147
  "",//148
  "",//149
  "",//150
  "",//151
  "",//152
  "",//153
  "",//154
  "",//155
  "",//156
  "",//157
  "",//158
  "",//159
  "^",
  "!",//161
  "#",
  "$",//163
  "ù",//164
  "page\nbackward",//165
  "page\nforward",//166
  "",//167
  "",//168
  ")",//169
  "*",//170
  "~ + * key",//171
  "",//172
  "mute/\nunmute",
  "decrease\nvolume\nlevel",//174
  "increase\nvolume\nlevel",
  "next",//176
  "previous",
  "stop",//178
  "play/\npause",
  "e-mail",//180
  "mute/\nunmute",
  "decrease\nvolume",//182
  "increase\nvolume",//183
  "",//184
  "",//185
  ";",//186
  "=",//187
  ",",
  "-",//189
  ".",
  "/",//191
  "grave\naccent",//192
  "?",//193
  "num .",//194
  "",//195
  "",//196
  "",//197
  "",//198
  "",//199
  "",//200
  "",//201
  "",//202
  "",//203
  "",//204
  "",//205
  "",//206
  "",//207
  "",//208
  "",//209
  "",//210
  "",//211
  "",//212
  "",//213
  "",//214
  "",//215
  "",//216
  "",//217
  "",//218
  "[",//219
  "\\",//220
  "]",
  "'",//222
  "`",//223
  "⌘",//224
  "altgr",
  "< /git >",//226
  "",//227
  "",//228
  "",//229
  "GNOME",//230
  "ç",
  "",//232
  "XF86Forward",
  "XF86Back",//234
  "",
  "",//236
  "",
  "",//238
  "",
  "alphanumeric",//240
  "",
  "hiragana/katakana",//242
  "half-width/full-width",
  "kanji",//244
  "",//245
  "",//246
  "",
  "",//248
  "",
  "",//250
  "",//251
  "",//252
  "",//253
  "none",//254
  "toggle touchpad"//255
];
var choose = {
  place: true,
  one: {
    x: 120,
    y: 380
  },
  two: {
    x: 340,
    y: 380
  },
  three: {
    x: 560,
    y: 380
  },
  four: {
    x: 780,
    y: 380
  }
}
var controls = [
  {
    up: 38,
    left: 37,
    down: 40,
    right: 39,
    attack: 90,
    special: 88,
    shield: 67,
    pause: 32
  },
  {
    up: 87,
    left: 65,
    down: 83,
    right: 68,
    attack: 70,
    special: 71,
    shield: 72,
    pause: 32
  },
  {
    up: 254,
    left: 254,
    down: 254,
    right: 254,
    attack: 254,
    special: 254,
    shield: 254,
    pause: 254
  },
  {
    up: 254,
    left: 254,
    down: 254,
    right: 254,
    attack: 254,
    special: 254,
    shield: 254,
    pause: 254
  }
];
function keyButton(x,y,inp){
  fill(70,70,70);//one button
  rect(x,y,100,100,10);
  fill(0,0,0);
  rect(x + 10,y + 10,80,80,10);//one button
  fill(255,255,255);
  textSize(18);
  text(keyCodes[inp],x + 50,y + 50);
}
function backButton(){
  textSize(45);
  fill(255,90,90);
  rect(800,0,100,100);
  fill(0,0,0);
  text("Back",850,50);
  if(mouseX > 800 && mouseY < 100 && mouseIsPressed){
    menu = 0;
    fire = [];
  }
}
var attack = [
  {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    time: 0,
    player: 0,
    damage: 0,
    launch: 0
  }
];
var player = [
  {
    x: 0,
    y: 0,
    cpu: false,
    damage: 0,
    xVel: 0,
    yVel: 0,
    look: 0,//0: neither 1: up 2: down
    dir: 1,//1: right 2: left
    attacking: false,
    inv: 0,
    character: {
      pic: undefined,
      
    }
  },
  {
    x: 0,
    y: 0,
    cpu: true,
    damage: 0,
    xVel: 0,
    yVel: 0,
    look: 0,
    dir: 1,
    attacking: false,
    inv: 0,
    character: {
      pic: undefined,
      
    }
  },
  {
    x: 0,
    y: 0,
    cpu: true,
    damage: 0,
    xVel: 0,
    yVel: 0,
    look: 0,
    dir: 1,
    attacking: false,
    inv: 0,
    character: {
      pic: undefined,
      
    }
  },
  {
    x: 0,
    y: 0,
    cpu: true,
    damage: 0,
    xVel: 0,
    yVel: 0,
    look: 0,
    dir: 1,
    attacking: false,
    inv: 0,
    character: {
      pic: undefined,
    }
  },
];

function setup() {
  createCanvas(900,500);
  title = loadImage("Title.png");
  fawfulPic = loadImage("Fawful.png");
  quotePic = loadImage("Quote.png");
  floweyPic = loadImage("Flowey.png");
  glitchPic = loadImage("Glitch.png");
}

function draw() {
  angleMode(DEGREES);
  background(0,0,0);
  textAlign(CENTER,CENTER);
  if(menu === 3){//intro
    push();
    translate(850,450);
    push();
    rotate(frameCount*2);
    fill(255,255,255);
    ellipse(0,0,100,100);
    fill(0,0,0);
    rect(-50,10,100,10);
    rect(-30,-50,20,100);
    pop();
    pop();
    textSize(40);
    fill(255,255,255);
    textAlign(LEFT);
    if(loading > 100){
      loading = 100;
    }
    text("Loading...".substring(0,7+((frameCount/10) % 4)),500,450);
    text(loading+"%",700,450);
    textAlign(CENTER,CENTER);
    if(loading >= 100){
      menu = 0;
    }
    if(frameCount % 10 === 0){
      loading += round(random(0,10));
    }
  }
  if(menu === 0){//main menu
    //println(fire.length);
    noStroke();
    for(var i = 0;i < fire.length;i ++){
      fill(200,70 + random(-50,50),50,100);
      triangle(fire[i][0] + random(-10,10),fire[i][1] + random(-10,10),fire[i][2] + random(-10,10),fire[i][3] + random(-10,10),fire[i][4] + random(-10,10),fire[i][5] + random(-10,10));
      fire[i][0] += random(2,5);
      fire[i][1] -= random(2,5);
      fire[i][2] += random(2,5);
      fire[i][3] -= random(2,5);
      fire[i][4] += random(2,5);
      fire[i][5] -= random(2,5);
      if(fire[i][5] < 0){
        fire.splice(i,1);
      }
    }
    if(frameCount % 30){
      fire.push([random(0,600),random(200,500),random(0,600),random(200,500),random(0,600),random(200,500)]);
    }
    image(title,0,0);
    push();
    translate(-300 + slideX[0],0 + slideY[0]);
    fill(230,40,40);
    ellipse(400,350,100,100);
    rect(400,300,150,100);
    fill(250,40,40);
    ellipse(400,350,80,80);
    rect(400,310,140,80);
    noFill();
    stroke(230,20,20);
    strokeWeight(5);
    arc(400,350,70,70,210,260);
    fill(0,0,0,150);
    noStroke();
    textSize(60);
    text("Fight!",455,350);
    pop();
    if(dist(mouseX,mouseY,100,350) < 50 || (mouseX > 100 && mouseX < 250 && mouseY > 300 && mouseY < 400)){
      slideX[0] = (mouseX-pmouseX)/2;
      slideY[0] = (mouseY-pmouseY)/2;
    }else{
      slideY[0] = 0;
      slideX[0] = 0;
    }
    if(dist(mouseX,mouseY,700,350) < 50 || (mouseX > 700 && mouseX < 850 && mouseY > 300 && mouseY < 400)){
      slideX[1] = (mouseX-pmouseX)/2;
      slideY[1] = (mouseY-pmouseY)/2;
    }else{
      slideY[1] = 0;
      slideX[1] = 0;
    }
	push();
    translate(300 + slideX[1],0 + slideY[1]);
    fill(230,40,40);
    ellipse(400,350,100,100);
    rect(400,300,150,100);
    fill(250,40,40);
    ellipse(400,350,80,80);
    rect(400,310,140,80);
    noFill();
    stroke(230,20,20);
    strokeWeight(5);
    arc(400,350,70,70,210,260);
    fill(0,0,0,150);
    noStroke();
    textSize(45);
    text("Settings",455,350);
    pop();    
    fill(255,255,255);
    textSize(35);
    text("Version 0.0.1 Pre",450,350);
    textSize(20);
    text("All characters belong to Nintendo, Studio Pixel, or Toby Fox",450,480);
  }
  if(menu === 1){//settings
    noStroke();
    backButton();
    fill(50,50,50);
    rect(0,((playerNum-1)*133)-10,72,120);
    rect(0,0,62,100);
    rect(0,133,62,100);
    rect(0,266,62,100);
    rect(0,400,62,100);
    textSize(50);
    fill(220,130,130);
    text("P1",31,50);
    fill(130,130,220);
    text("P2",31,183);
    fill(130,220,130);
    text("P3",31,316);
    fill(220,130,220);
    text("P4",31,450);
    fill(30,150,70);
    textSize(130);
    text("Settings",450,100);
    if(keySelect[0] === false){
      if(mouseX < 62 && mouseY > 0 && mouseY < 100 && mouseIsPressed){
        playerNum = 1;
      }
      if(mouseX < 62 && mouseY > 133 && mouseY < 233 && mouseIsPressed){
        playerNum = 2;
      }
      if(mouseX < 62 && mouseY > 266 && mouseY < 366 && mouseIsPressed){
        playerNum = 3;
      }
      if(mouseX < 62 && mouseY > 400 && mouseY < 500 && mouseIsPressed){
        playerNum = 4;
      }
    }
    //player controls
    textSize(25);
    fill(255,255,255);
    text("Up",250,170);
    text("Left",140,440);
    text("Down",250,440);
    text("Right",360,440);
    text("Attack",470,220);
    text("Special",580,220);
    text("Shield",690,220);
    text("Pause",800,220);
    keyButton(200,200,controls[playerNum-1].up);//button
    keyButton(200,310,controls[playerNum-1].down);
    keyButton(90,310,controls[playerNum-1].left);
    keyButton(310,310,controls[playerNum-1].right);
    keyButton(420,250,controls[playerNum-1].attack);//button
    keyButton(530,250,controls[playerNum-1].special);
    keyButton(640,250,controls[playerNum-1].shield);
    keyButton(750,250,controls[playerNum-1].pause);
    if(mouseX > 200 && mouseX < 300 && mouseY > 200 && mouseY < 300 && mouseIsPressed){
      keySelect = [true,0];
    }
    if(mouseX > 90 && mouseX < 190 && mouseY > 310 && mouseY < 410 && mouseIsPressed){
      keySelect = [true,1];
    }
    if(mouseX > 200 && mouseX < 300 && mouseY > 310 && mouseY < 410 && mouseIsPressed){
      keySelect = [true,2];
    }
    if(mouseX > 310 && mouseX < 410 && mouseY > 310 && mouseY < 410 && mouseIsPressed){
      keySelect = [true,3];
    }
    if(mouseX > 420 && mouseX < 520 && mouseY > 250 && mouseY < 350 && mouseIsPressed){
      keySelect = [true,4];
    }
    if(mouseX > 530 && mouseX < 630 && mouseY > 250 && mouseY < 350 && mouseIsPressed){
      keySelect = [true,5];
    }
    if(mouseX > 640 && mouseX < 740 && mouseY > 250 && mouseY < 350 && mouseIsPressed){
      keySelect = [true,6];
    }
    if(mouseX > 750 && mouseX < 850 && mouseY > 250 && mouseY < 350 && mouseIsPressed){
      keySelect = [true,7];
    }
    if(keySelect[0] === true){
      fill(0,0,0,90);
      rect(0,0,900,500);
      fill(255,255,255);
      text("Type any key/n(Escape to cancel)",450,250);
    }
  }
  if(menu === 2){//character select
    backButton();
    fill(90,90,90);
    for(var i = 0;i < 15;i ++){
      rect((i % 5)*90 + 230,(i % 3)*90,80,80,10);
    }
    image(fawfulPic,237,5,67,72);
    image(quotePic,325,2);
    image(floweyPic,411,1,78,78);
    image(glitchPic,501,1,78,78);
    
    if(choose.one.x > 230 && choose.one.x < 310 && choose.one.y < 80){
      player[0].character = {
        pic: fawfulPic
      }
    }else{
      if(choose.one.x > 320 && choose.one.x < 400 && choose.one.y < 80){
        player[0].character = {
          pic: quotePic
        }
      }else{
        if(choose.one.x > 410 && choose.one.x < 490 && choose.one.y < 80){
          player[0].character = {
            pic: floweyPic
          }
        }else{
          if(choose.one.x > 490 && choose.one.x < 570 && choose.one.y < 80){
            player[0].character = {
              pic: glitchPic
            }
          }
        }
      }
    }
    
    if(choose.two.x > 230 && choose.two.x < 310 && choose.two.y < 80){
      player[1].character = {
        pic: fawfulPic
      }
    }else{
      if(choose.two.x > 320 && choose.two.x < 400 && choose.two.y < 80){
        player[1].character = {
          pic: quotePic
        }
      }else{
        if(choose.two.x > 410 && choose.two.x < 490 && choose.two.y < 80){
          player[1].character = {
            pic: floweyPic
          }
        }else{
          if(choose.two.x > 490 && choose.two.x < 570 && choose.two.y < 80){
            player[1].character = {
              pic: glitchPic
            }
          }
        }
      }
    }
    
    if(choose.three.x > 230 && choose.three.x < 310 && choose.three.y < 80){
      player[2].character = {
        pic: fawfulPic
      }
    }else{
      if(choose.three.x > 320 && choose.three.x < 400 && choose.three.y < 80){
        player[2].character = {
          pic: quotePic
        }
      }else{
        if(choose.three.x > 410 && choose.three.x < 490 && choose.three.y < 80){
          player[2].character = {
            pic: floweyPic
          }
        }else{
          if(choose.three.x > 490 && choose.three.x < 570 && choose.three.y < 80){
            player[2].character = {
              pic: glitchPic
            }
          }
        }
      }
    }
    
    if(choose.four.x > 230 && choose.four.x < 310 && choose.four.y < 80){
      player[3].character = {
        pic: fawfulPic
      }
    }else{
      if(choose.four.x > 320 && choose.four.x < 400 && choose.four.y < 80){
        player[3].character = {
          pic: quotePic
        }
      }else{
        if(choose.four.x > 410 && choose.four.x < 490 && choose.four.y < 80){
          player[3].character = {
            pic: floweyPic
          }
        }else{
          if(choose.four.x > 490 && choose.four.x < 570 && choose.four.y < 80){
            player[3].character = {
              pic: glitchPic
            }
          }
        }
      }
    }
    rect(20,290,200,200,10);
    rect(240,290,200,200,10);
    rect(460,290,200,200,10);
    rect(680,290,200,200,10);
    picCount = 0;
    if(player[0].character.pic !== undefined){
      image(player[0].character.pic,21,291,198,198);
      picCount ++;
    }
    
    if(player[1].character.pic !== undefined){
      image(player[1].character.pic,241,291,198,198);
      picCount ++;
    }
    
    if(player[2].character.pic !== undefined){
      image(player[2].character.pic,461,291,198,198);
      picCount ++;
    }
    
    if(player[3].character.pic !== undefined){
      image(player[3].character.pic,681,291,198,198);
      picCount ++;
    }
    rect(20,440,200,150,10);
    rect(240,440,200,150,10);
    rect(460,440,200,150,10);
    rect(680,440,200,150,10);
    fill(220,130,130);
    textSize(30);
    if(player[0].cpu === false){
      text("Player 1",120,470);
    }else{
      text("CPU 1",120,470);
    }
    fill(130,130,220);
    if(player[1].cpu === false){
      text("Player 2",340,470);
    }else{
      text("CPU 2",340,470);
    }
    fill(130,220,130);
    if(player[2].cpu === false){
      text("Player 3",560,470);
    }else{
      text("CPU 3",560,470);
    }
    fill(220,130,220);
    if(player[3].cpu === false){
      text("Player 4",780,470);
    }else{
      text("CPU 4",780,470);
    }
    choose.place = false
    fill(220,130,130);
    ellipse(choose.one.x,choose.one.y,50,50);//
    if(dist(mouseX,mouseY,choose.one.x,choose.one.y) < 25 && mouseIsPressed && choose.place === false){
      choose.one.x = mouseX;
      choose.one.y = mouseY;
      choose.place = true;
    }
    if(keys[controls[0].up]){
      choose.one.y -= 3;
    }
    if(keys[controls[0].down]){
      choose.one.y += 3;
    }
    if(keys[controls[0].left]){
      choose.one.x -= 3;
    }
    if(keys[controls[0].right]){
      choose.one.x += 3;
    }//
    choose.one.x = constrain(choose.one.x,25,875);
    choose.two.x = constrain(choose.two.x,25,875);
    choose.three.x = constrain(choose.three.x,25,875);
    choose.four.x = constrain(choose.four.x,25,875);
    choose.one.y = constrain(choose.one.y,25,475);
    choose.two.y = constrain(choose.two.y,25,475);
    choose.three.y = constrain(choose.three.y,25,475);
    choose.four.y = constrain(choose.four.y,25,475);
    fill(130,130,220);
    ellipse(choose.two.x,choose.two.y,50,50);//
    if(dist(mouseX,mouseY,choose.two.x,choose.two.y) < 25 && mouseIsPressed && choose.place === false){
      choose.two.x = mouseX;
      choose.two.y = mouseY;
      choose.place = true;
    }
    if(keys[controls[1].up]){
      choose.two.y -= 3;
    }
    if(keys[controls[1].down]){
      choose.two.y += 3;
    }
    if(keys[controls[1].left]){
      choose.two.x -= 3;
    }
    if(keys[controls[1].right]){
      choose.two.x += 3;
    }//
    fill(130,220,130);
    ellipse(choose.three.x,choose.three.y,50,50);//
    if(dist(mouseX,mouseY,choose.three.x,choose.three.y) < 25 && mouseIsPressed && choose.place === false){
      choose.three.x = mouseX;
      choose.three.y = mouseY;
      choose.place = true;
    }
    if(keys[controls[2].up]){
      choose.three.y -= 3;
    }
    if(keys[controls[2].down]){
      choose.three.y += 3;
    }
    if(keys[controls[2].left]){
      choose.three.x -= 3;
    }
    if(keys[controls[2].right]){
      choose.three.x += 3;
    }//
    fill(220,130,220);
    ellipse(choose.four.x,choose.four.y,50,50);//
    if(dist(mouseX,mouseY,choose.four.x,choose.four.y) < 25 && mouseIsPressed && choose.place === false){
      choose.four.x = mouseX;
      choose.four.y = mouseY;
      choose.place = true;
    }
    if(keys[controls[3].up]){
      choose.four.y -= 3;
    }
    if(keys[controls[3].down]){
      choose.four.y += 3;
    }
    if(keys[controls[3].left]){
      choose.four.x -= 3;
    }
    if(keys[controls[3].right]){
      choose.four.x += 3;
    }//
    if(picCount > 1){
      fill(180,130,50,150);
      rect(0,220,900,60,5);
      fill(180,50,50,150);
      rect(10,225,880,50,5);
      fill(0,0,0,200);
      text("Press attack to start",450,250);
      for(var i = 0;i < player.length;i ++){
        if(player[i].character.pic !== undefined && keys[controls[i].attack]){
          menu = 4;
        }
      }
    }
  }
  if(menu === 4){//actually in the battle
    fill(255,255,255);
    rect(-1,-1,902,502);
    if(pause === false){ 
      push();
      translate(450,250);
      if(arena === "classic"){
        fill(0,0,0);
        rect(-225,0,450,200);
      }
      imageMode(CENTER);
      picCount = 0;
      for(var i = 0;i < player.length;i ++){
        if(player[i].character.pic !== undefined){
          if(player[i].inv > 0){
            player[i].inv --;
          }
          picCount ++;
          if(player[i].inv < 1 || player[i].inv % 2 === 0){
            image(player[i].character.pic,player[i].x,player[i].y,50,60);
          }
          if(i === 0){
            fill(220,130,130);
          }
          if(i === 1){
            fill(130,130,220);
          }
          if(i === 2){
            fill(130,220,130);
          }
          if(i === 3){
            fill(220,130,220);
          }
          textSize(25);
          text("Player " + (i + 1),player[i].x,player[i].y - 40);
          if(player[i].xVel > 0){
              player[i].xVel = floor(player[i].xVel*100)/110;
          }else{
              player[i].xVel = ceil(player[i].xVel*100)/110;
          }
          player[i].x += player[i].xVel;
          player[i].y += player[i].yVel;
          if(keys[controls[i].right] && player[i].attacking === false && player[i].xVel < 2.5){
            player[i].xVel ++;
            player[i].dir = 1;
          }
          if(keys[controls[i].left] && player[i].attacking === false && player[i].xVel > -2.5){
            player[i].xVel --;
            player[i].dir = 2;
          }
    if(!(player[i].x > -250 && player[i].x < 250 && player[i].y > -30 && player[i].y < 225)){
            player[i].yVel += 0.4;
            if(player[i].jump && keys[controls[i].up] && player[i].yVel > -2 && player[i].attacking === false){
              player[i].yVel = -7;
              player[i].jump = false;
            }
          }
          if(player[i].x > -250 && player[i].x < 250 && player[i].y > -30 && player[i].y < 225){
            player[i].yVel = -0.7;
            if(player[i].y + player[i].yVel <= -30){
              player[i].yVel = 0;
            }
            if(keys[controls[i].up] && player[i].attacking === false){
              player[i].yVel -= 7;
              player[i].jump = true;
            }
          }
          if(keys[controls[i].pause]){
            pause = true;
          }
          if(player[i].y > -20 && player[i].y < 215){
            if(player[i].x > -255 && player[i].x < -230){
              player[i].xVel = -1;
            }
            if(player[i].x < 255 && player[i].x > 230){
              player[i].xVel = 1;
            }
          }
          if(player[i].y > 170 && player[i].x > -250 && player[i].x < 250 && player[i].y < 225){
            player[i].yVel = 1;
          }
          if(player[i].y > 750){
            player[i].damage = 0;
            player[i].inv = 100;
            player[i].x = 0;
            player[i].y = -30;
            player[i].yVel = 0;
            player[i].xVel = 0;
          }
          if(keys[controls[i].attack] && player[i].attacking === false){
            player[i].attacking = true;
            if(player[i].dir === 1){
              attack.push({
                x: player[i].x + 25,
                y: player[i].y - 20,
                w: 50,
                h: 50,
                time: 100,
                player: i,
                damage: 5,
                launch: 0.3
              });
            }
            if(player[i].dir === 2){
              attack.push({
                x: player[i].x - 75,
                y: player[i].y - 20,
                w: 50,
                h: 50,
                time: 100,
                player: i,
                damage: 5,
                launch: 0.3
              });
            }
          }
        }
        for(var u = 0;u < attack.length;u ++){
          if(i === attack[u].player){
            player[i].attacking = true;
          }
          fill(0,0,0);
          attack[u].time --;
          rect(attack[u].x,attack[u].y,attack[u].w,attack[u].h);
          if(attack[u].x + attack[u].w > player[i].x - 25 && attack[u].x < player[i].x + 25 && attack[u].y + attack[u].h > player[i].y - 30 && attack[u].y < player[i].y + 30){
            if(player[i].x >= attack[u].x + attack[u].w/2 && i !== attack[u].player){
              if(player[i].inv < 1){
                player[i].damage += attack[u].damage;
                player[i].xVel += player[i].damage * 2 * attack[u].launch;
                player[i].yVel -= player[i].damage / 2 * attack[u].launch;
                attack[u].time = 0;
                player[i].inv = 50;
              }
            }else{
              if(player[i].x < attack[u].x + attack[u].w/2 && i !== attack[u].player){
                if(player[i].inv < 1){
                  player[i].damage += attack[u].damage;
                  player[i].xVel -= player[i].damage * 2 * attack[u].launch;
                  player[i].yVel -= player[i].damage / 2 * attack[u].launch;
                  attack[u].time = 0;
                  player[i].inv = 50;
                }
              }
            }
          }
          if(attack[u].time <= 0){
            player[attack[u].player].attacking = false;
            attack.splice(u,1);
          }
        }
      }
      imageMode(CORNERS);
      pop();
      textSize(28);
      for(var i = 0;i < picCount;i ++){
        if(i === 0){
          fill(220,130,130,150);
        }
        if(i === 1){
          fill(130,130,220,150);
        }
        if(i === 2){
          fill(130,220,130,150);
        }
        if(i === 3){
          fill(220,130,220,150);
        }
        rect(i * 900/picCount,450,900/picCount,50,10);
        fill(100 + player[i].damage,100 - player[i].damage,100 - player[i].damage,200);
        text("Player "+ (i + 1),i * 900/picCount + (900/picCount)/2,460);
        text(round(player[i].damage) + "%",i * 900/picCount + (900/picCount)/2,490);
      }
    }
    if(pause === true){
      fill(100,100,100,200);
      ellipse(400,250,50,50);
      ellipse(500,250,50,50);
      fill(50,50,50,230);
      textSize(70);
      text("Paused",450,200);
      text("Exit",400,250);
      text("Unpause",500,250);
      if(dist(mouseX,mouseY,400,250) <= 25 && mouseIsPressed){
        pause = false;
        menu = 0;
      }
      if(dist(mouseX,mouseY,500,250) <= 25 && mouseIsPressed){
        pause = false;
      }
    }
  }
  /*stroke(255,255,255);
  line(450,0,450,500);//debug
  line(0,250,900,250);//debug
  noStroke();*/
  /*if(keys[controls[0].up]){
    background(50,50,100);
  }*/
  /*stroke(0,0,0);
  strokeWeight(2);
  line(0,0,0,500);
  line(0,500,900,500);
  line(900,500,900,0);
  strokeWeight(1);
  line(900,0,0,0);
  noStroke();*/
}

function mouseClicked(){
  if(menu === 2 && choose.place === false){
    if(mouseX > 20 && mouseX < 220 && mouseY > 290 && mouseY < 490){
      if(player[0].cpu === true){
        player[0].cpu = false;
      }else{
        player[0].cpu = true;
      }
    }
    if(mouseX > 240 && mouseX < 440 && mouseY > 290 && mouseY < 490){
      if(player[1].cpu === true){
        player[1].cpu = false;
      }else{
        player[1].cpu = true;
      }
    }
    if(mouseX > 460 && mouseX < 660 && mouseY > 290 && mouseY < 490){
      if(player[2].cpu === true){
        player[2].cpu = false;
      }else{
        player[2].cpu = true;
      }
    }
    if(mouseX > 680 && mouseX < 880 && mouseY > 290 && mouseY < 490){
      if(player[3].cpu === true){
        player[3].cpu = false;
      }else{
        player[3].cpu = true;
      }
    }
  }
  if(menu === 0){
    if(dist(mouseX,mouseY,700,350) < 50 || (mouseX > 700 && mouseX < 850 && mouseY > 300 && mouseY < 400)){
      menu = 1;
      playerNum = 1;
    }
    if(dist(mouseX,mouseY,100,350) < 50 || (mouseX > 100 && mouseX < 250 && mouseY > 300 && mouseY < 400)){
      menu = 2;
      choose = {
  	place: true,
  	one: {
      	  x: 120,
    	  y: 380
        },
        two: {
          x: 340,
          y: 380
        },
        three: {
          x: 560,
          y: 380
        },
        four: {
          x: 780,
          y: 380
        }
      }
    }
  }
}

function keyPressed(){
  keys[keyCode] = true;
}

function keyReleased(){
  keys[keyCode] = false;
  if(menu === 1){
    if(keySelect[0] === true){
      if(keySelect[1] === 0){
        controls[playerNum-1].up = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].up = 254;
        }
      }
      if(keySelect[1] === 1){
        controls[playerNum-1].left = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].left = 254;
        }
      }
      if(keySelect[1] === 2){
        controls[playerNum-1].down = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].down = 254;
        }
      }
      if(keySelect[1] === 3){
        controls[playerNum-1].right = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].right = 254;
        }
      }
      if(keySelect[1] === 4){
        controls[playerNum-1].attack = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].attack = 254;
        }
      }
      if(keySelect[1] === 5){
        controls[playerNum-1].special = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].special = 254;
        }
      }
      if(keySelect[1] === 6){
        controls[playerNum-1].shield = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].shield = 254;
        }
      }
      if(keySelect[1] === 7){
        controls[playerNum-1].pause = keyCode;
        if(keyCode === 27){
          controls[playerNum-1].pause = 254;
        }
      }
      keySelect[0] = false;
    }
  }
}
