var socket;
var player;
var players = [];
var world = {
	x: {
		low: 0,
		high: 600
	},
	y: {
		low: 0,
		high: 600
	}
}
var keys = [];
function keyPressed(){
	keys[keyCode] = true;
}
function keyReleased(){
	keys[keyCode] = false;
}
function Player(x,y,rotation,weapon,armor,rank,side,attack,life){
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.weapon = weapon;
	this.armor = armor;
	this.rank = rank;
	this.side = side;
	this.velX = 0;
	this.velY = 0;
	this.attack = attack;
	this.life = life;
	
	this.update = function(){
		if(mouseIsPressed){
			this.attack = true;
		}else{
			this.attack = false;
		}
		if(this.velX < 10 && keys[RIGHT_ARROW]){
			this.velX += 2;
		}
		if(this.velX > -10 && keys[LEFT_ARROW]){
			this.velX -= 2;
		}
		if(this.velY < 10 && keys[DOWN_ARROW]){
			this.velY += 2;
		}
		if(this.velY > -10 && keys[UP_ARROW]){
			this.velY -= 2;
		}
		this.x += this.velX;
		this.y += this.velY;
		if(this.velX > 0){
			this.velX -= 1;
		}
		if(this.velX < 0){
			this.velX += 1;
		}
		if(this.velY > 0){
			this.velY -= 1;
		}
		if(this.velY < 0){
			this.velY += 1;
		}
		if(this.x > world.x.high){
			this.velX -= 3;
		}
		if(this.x < world.x.low){
			this.velX += 3;
		}
		if(this.y > world.y.high){
			this.velY -= 3;
		}
		if(this.y < world.y.low){
			this.velY += 3;
		}
	}
	
	this.fight = function(){
		push();
		translate(width/2,height/2);
		push();
		rotate(this.rotation);
		if(mouseIsPressed){
			if(this.weapon === "Wooden Spear"){
				push();
				translate(0,-30);
				push();
				rotate(-PI/16);
			}
			if(this.weapon === "Wooden Sword"){
				push();
				rotate(-PI/6);
			}
		}
		for(var i = 0;i < players.length;i ++){
			if(this.weapon === "Wooden Spear"){
				fill(105,45,85);
				rect(51,-90,10,120,50);
				fill(25,25,25);
				triangle(70,-60,55,-120,40,-60);
			}
			if(this.weapon === "Wooden Sword"){
				push();
				rotate(PI/16);
				fill(105,45,85);
				rect(51,-50,10,80,50);
				fill(25,25,25);
				stroke(25,25,25);
				strokeWeight(5);
				triangle(70,0,55,-80,40,0);
				noStroke();
				pop();
			}
			if(this.weapon === "Fire Magic"){
				
			}
		}
		if(mouseIsPressed){
			if(this.weapon === "Wooden Spear"){
				pop();
				pop();
			}
			if(this.weapon === "Wooden Sword"){
				pop();
			}
		}
		pop();
		pop();
	}
	
	this.show = function(){
		this.rotation = atan2(mouseY-height/2,mouseX-width/2)+PI/2;
		push();
		translate(width/2,height/2);
		fill(25,150,25);
		rect(-this.life/2,65,this.life,10,50);
		push();
		rotate(this.rotation);
		fill(239, 238, 146);
		arc(0,0,100,100,PI,2*PI);
		if(this.rank === "general"){
			fill(8, 79, 19);
		}
		if(this.rank === "soldier"){
			fill(138, 229, 41);
		}
		arc(0,0,100,100,0,PI);
		pop();
		pop();
	}
}
function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(radians);
	socket = io.connect('http://ufuueueuru.github.io/spoils.com');
	if(random(0,2) > 1){
		player = new Player(random(world.x.low,world.x.high),random(world.y.low,world.y.high),0,"Wooden Sword",0,"soldier",1,false,100);
	}else{
		player = new Player(random(world.x.low,world.x.high),random(world.y.low,world.y.high),0,"Wooden Spear",0,"soldier",1,false,100);
	}
	var data = {
		x: player.x,
		y: player.y,
		rotation: player.rotation,
		weapon: player.weapon,
		armor: player.armor,
		rank: player.rank,
		side: player.side,
		attack: player.attack,
		life: player.life
	}
	socket.emit('start',data);
	socket.on('heartbeat',
		function(data){
			players = data;
		}
	);
}

function draw(){
	background(0,0,0);
	noStroke();
	push();
	translate(width/2,height/2);
	push();
	translate(-player.x,-player.y);
	stroke(25,170,25,150);
	strokeWeight(10);
	for(var i = floor(world.x.low/60);i < ceil(world.x.high/60);i ++){
		for(var u = floor(world.y.low/60);u < ceil(world.y.high/60);u ++){
			fill(0,255,50);
			rect(i*60,u*60,60,60);
		}
	}
	pop();
	pop();
	noStroke();
	player.show();
	player.fight();
	player.update();
	push();
	translate(width/2,height/2);
	push();
	translate(-player.x,-player.y);
	for(var i = 0;i < players.length; i ++){
		var id = players[i].id;
		if(id !== socket.id){
			push();
			translate(players[i].x,players[i].y);
			push();
			rotate(players[i].rotation);
			fill(239, 238, 146);
			arc(0,0,100,100,PI,2*PI);
			if(players[i].rank === "general"){
				fill(8, 79, 19);
			}
			if(players[i].rank === "soldier"){
				fill(138, 229, 41);
			}
			arc(0,0,100,100,0,PI);
			if(dist(players[i].x,players[i].y,player.x,player.y) < 100){
				player.x += 7*cos(atan2(player.y-players[i].y,player.x-players[i].x));
				player.y += 7*sin(atan2(player.y-players[i].y,player.x-players[i].x));
			}
			console.log(players[i].attack);
			if(players[i].attack === true){
				if(players[i].weapon === "Wooden Spear"){
					push();
					translate(0,-30);
					push();
					rotate(-PI/16);
				}
				if(players[i].weapon === "Wooden Sword"){
					push();
					rotate(-PI/6);
				}
			}
			if(players[i].weapon === "Wooden Sword"){
				push();
				rotate(PI/16);
				fill(105,45,85);
				rect(51,-50,10,80,50);
				fill(25,25,25);
				stroke(25,25,25);
				strokeWeight(5);
				triangle(70,0,55,-80,40,0);
				noStroke();
				pop();
			}
			if(players[i].weapon === "Wooden Spear"){
				fill(105,45,85);
				rect(51,-90,10,120,50);
				fill(25,25,25);
				triangle(70,-60,55,-120,40,-60);
			}
			if(players[i].weapon === "Fire Magic"){
				
			}
			if(players[i].attack === true){
				if(players[i].weapon === "Wooden Spear"){
					pop();
					pop();
				}
				if(players[i].weapon === "Wooden Sword"){
					pop();
				}
			}
			pop();
			pop();
		}
	}
	pop();
	pop();
	var data = {
		x: player.x,
		y: player.y,
		rotation: player.rotation,
		weapon: player.weapon,
		armor: player.armor,
		rank: player.rank,
		side: player.side,
		attack: player.attack,
		life: player.life
	}
	socket.emit('update',data);
}
function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}
