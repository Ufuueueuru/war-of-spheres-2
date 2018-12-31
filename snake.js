//Alpha Version
let keys = [];

let player;

let wait = 120;

let shop;

let menu = 0;

let enemy = [];

let back = [];

class Shop {
	constructor() {
		
	}
	
	draw() {
		player.HUD.draw(player);
		fill(0);
		textSize(50);
		text("Paused\nPress Space To Unpause", windowWidth/2, 100);
		textSize(80);
		text("Shop", windowWidth/2, 250);
		textSize(30);
		text(player.bag.gold + " Gold", windowWidth/2, 300);
		
		stroke(0);
		noFill();
		ellipse(windowWidth/2 + 200, 400, 130, 130);
		ellipse(windowWidth/2, 400, 130, 130);
		fill(0);
		textSize(25);
		text("Partner:\n" + player.weapon.level + " Gold", windowWidth/2, 400);
		text("Bag:\n" + (player.bag.max-15) + " Gold", windowWidth/2 + 200, 400);
		noStroke();
		
		if(keys[32]) {
			menu = 0;
		}
	}
}
class Weapon {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.radius = 10;
		
		this.durability = 500;
		
		this.attack = 0.7;
		
		this.level = 1;
	}
	
	addAttack() {
		this.attack += 1.3;
		this.level ++;
	}
	
	draw(p) {
		
		fill(0, 100, 205, 180);
		ellipse(this.x, this.y, this.radius, this.radius);
		
		let distance = dist(this.x, this.y, p.x, p.y);
		
		if(distance > 30) {
			this.x += cos(atan2(p.y - this.y, p.x - this.x)) * p.speed * 3;
			this.y += sin(atan2(p.y - this.y, p.x - this.x)) * p.speed * 3;
		}
	}
	
	damage(e, p) {
		e.health -= (this.attack + p.attack)/8;
		//this.durability -= e.attack/20;
		e.x -= cos(atan2(this.y-e.y, this.x-e.x)) * e.speed/2;
		e.y -= sin(atan2(this.y-e.y, this.x-e.x)) * e.speed/2;
		this.x += cos(atan2(this.y-e.y, this.x-e.x)) * e.speed/2;
		this.y += sin(atan2(this.y-e.y, this.x-e.x)) * e.speed/2;
	}
	
	collide(e) {
		if(dist(e.x, e.y, this.x, this.y) < this.radius/2 + e.radius/2) {
			return true;
		} else {
			return false;
		}
	}
}
class Bag {
	constructor() {
		this.copper = 0;
		this.silver = 0;
		this.gold = 0;
		
		this.cMax = 12;
		this.sMax = 8;
		this.max = 16;
	}
	
	updateBag(level) {
		this.max = 13 + level * 3;
	}
	
	upgrade() {
		this.max ++;
	}
	
	update() {
		while(this.silver >= this.sMax && this.gold < this.max) {
			this.silver -= this.sMax;
			this.gold ++;
		}
		while(this.copper >= this.cMax && this.silver < this.sMax) {
			this.copper -= this.cMax;
			this.silver ++;
		}
		if(this.copper > this.cMax) {
			this.copper = this.cMax;
		}
		if(this.silver > this.sMax) {
			this.silver = this.sMax;
		}
		if(this.gold > this.max) {
			this.gold = this.max;
		}
	}
}
class Background {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	draw() {
		noStroke();
		fill(50, 210, 30, 100);
		ellipse(this.x, this.y, 200, 200);
	}
}
class Enemy {
	constructor(level) {
		this.x = 0;
		this.y = 0;
		this.radius = 3*log(level)+15;
		
		this.level = level;
		
		this.speed = .6 + sigmoid(level);
		this.health = this.level * 4 + 4;
		this.attack = this.level * 4 - 1;
		
		this.multiplier = 1;
	}
	
	follow(player) {
		this.x += cos(atan2(player.y-this.y, player.x-this.x)) * this.speed;
		this.y += sin(atan2(player.y-this.y, player.x-this.x)) * this.speed;
	}
	
	draw() {
		noStroke();
		fill(255, 50, 50);
		ellipse(this.x, this.y, this.radius);
	}
	
	lifeBar() {
		noStroke();
		fill(140, 255, 0);
		rect(this.x, this.y + this.radius/2 + 7, this.health * 50/this.healthu(), 10);
	}
	
	damage(player) {
		player.health -= max(this.attack - player.defense, 0);
		this.health -= player.attack;
		this.x -= cos(atan2(player.y-this.y, player.x-this.x)) * this.speed * 2;
		this.y -= sin(atan2(player.y-this.y, player.x-this.x)) * this.speed * 2;
		player.x += cos(atan2(player.y-this.y, player.x-this.x)) * player.speed * 2;
		player.y += sin(atan2(player.y-this.y, player.x-this.x)) * player.speed * 2;
		player.weapon.x += cos(atan2(-player.weapon.y+this.y, -player.weapon.x+this.x)) * player.speed * 3;
		player.weapon.y += sin(atan2(-player.weapon.y+this.y, -player.weapon.x+this.x)) * player.speed * 3;
	}
	
	updateStats() {
		this.health = this.healthu(this.level);
		
		this.attack = this.attacku(this.level);
		
		this.radius = this.radiusu(this.level);
		
		this.speed = this.speedu(this.level);
	}
	
	healthu() {
		return this.level * 6 + 4;
	}
	
	attacku() {
		return this.level * 3 - 1;
	}
	
	radiusu() {
		return 5*log(this.level)+10;
	}
	
	speedu() {
		return .6 + sigmoid(this.level);
	}
	
	collide2(enemy) {
		if(this.collide(enemy)) {
			this.x += cos(atan2(this.y-enemy.y, this.x-enemy.x)) * this.speed;
			this.y += sin(atan2(this.y-enemy.y, this.x-enemy.x)) * this.speed;
		}
	}
	
	collide(player) {
		if(dist(this.x, this.y, player.x, player.y) < player.radius/2 + this.radius/2) {
			return true;
		} else {
			return false;
		}
	}
}
class Brute extends Enemy {
	constructor(level) {
		super(level);
		
		this.radius = 4*log(level)+32;
		
		this.health = this.level * 10;
		
		this.speed = .1 + sigmoid(level) * .5;
		
		this.attack = this.level * 3.5 + 20;
		
		this.multiplier = 3;
	}
	
	draw() {
		noStroke();
		fill(175);
		ellipse(this.x, this.y, this.radius);
	}
}
class Assassin extends Enemy {
	constructor(level) {
		super(level);
		
		this.radius = 2*log(level)+10;
		
		this.health = this.level * 2 + 2;
		
		this.attack = this.level * 7 + 13;
		
		this.speed = .9 + sigmoid(this.level) * 1.3;
		
		this.multiplier = 2;
	}
	
	draw() {
		noStroke();
		fill(30, 170, 10);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
	
	lifeBar() {}
}
class Speeder extends Enemy {
	constructor(level) {
		super(level);
		
		this.speed = 1.2 + sigmoid(level) * 2;
		
		this.health = this.level * 3 + 15;
		
		this.attack = this.level * 3 + 15;
		
		this.multiplier = 1.3;
	}
	
	follow(player) {
		this.x += cos(atan2(player.y-this.y, player.x-this.x)) * this.speed;
		this.y += sin(atan2(player.y-this.y, player.x-this.x)) * this.speed;
	}
	
	speedu() {
		return 1.2 + sigmoid(this.level) * 3;
	}
	
	draw() {
		noStroke();
		fill(255, 165, 0);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
}
class Drainer extends Enemy {
	constructor(level) {
		super(level);
		
		this.speed = .4 + sigmoid(level) * 0.5;
		
		this.health = this.level * 0.3;
		
		this.attack = this.level * 3 - 1;
		
		this.multiplier = 0.8;
	}
	
	draw() {
		noStroke();
		fill(255, 255, 50);
		ellipse(this.x, this.y, this.radius);
		
		stroke(200 + 50*sin(frameCount/10), 242 + 50*sin(frameCount/10), 50 + 50*sin(frameCount/10),100);
    strokeWeight(10);
    line(this.x, this.y, player.oldX, player.oldY);
		strokeWeight(1);
		
		player.health -= this.attack * 0.005;
	}
	
	follow(player) {
		let distance = dist(this.x, this.y, player.x, player.y);
		this.x += cos(atan2(player.y-this.y, player.x-this.x)) * this.speed * 0.5 * constrain(5*(distance - 200), -1, 1);
		this.y += sin(atan2(player.y-this.y, player.x-this.x)) * this.speed * 0.5 * constrain(5*(distance - 200), -1, 1);
	}
}
class Fuser extends Enemy {
	constructor(level, x=0, y=0) {
		super(level);
		
		this.health = this.level * 2 + 3;
		
		this.speed = .7 + sigmoid(level) * 0.8;
		
		this.x = x;
		this.y = y;
		
		this.multiplier = 1.1;
	}
	
	collide2(enemy) {
		if(enemy.collide(this)) {
			enemy.collide2 = this.infect;
			this.x -= cos(atan2(this.y-enemy.y, this.x-enemy.x)) * this.speed * 0.5;
			this.y -= sin(atan2(this.y-enemy.y, this.x-enemy.x)) * this.speed * 0.5;
		}
	}
	
	infect(enemy) {
		if(enemy.collide(this)) {
			this.x -= cos(atan2(this.y-enemy.y, this.x-enemy.x)) * this.speed * 0.5;
			this.y -= sin(atan2(this.y-enemy.y, this.x-enemy.x)) * this.speed * 0.5;
		}
	}
	
	draw() {
		noStroke();
		fill(115, 20, 140);
		ellipse(this.x, this.y, this.radius);
	}
	
	speedu() {
		return .7 + sigmoid(this.level) * 1.1;
	}
	
	healthu() {
		return this.level * 6 + 4;
	}
}
class HUD {
	constructor() {
		
	}
	
	draw(p) {
		p.bag.update();
		p.levelUp();
		
		rectMode(CORNER);
		
		noStroke();
		
		fill(50, 50, 50);
		rect(10, 10, 120, 70, 10);
		fill(230, 20, 20);
		rect(20, 20, max(p.health, 0)/p.maxHealth * 100, 50, 10);
		
		fill(50, 50, 50);
		rect(140, 10, 120, 70, 10);
		fill(20, 20, 230);
		rect(150, 20, max(p.exp, 0)/(pow(p.level, 2) * 2 + 10) * 100, 50, 10);
		
		fill(50, 50, 50);
		rect(270, 10, 120, 70, 10);
		fill(240, 240, 40);
		rect(280, 20, max(p.bag.gold, 0)/p.bag.max * 100, 50, 10);
		fill(220, 220, 220);
		rect(280, 20, max(p.bag.silver, 0)/p.bag.sMax * 100, 34, 10);
		fill(183, 114, 51);
		rect(280, 20, max(p.bag.copper, 0)/p.bag.cMax * 100, 18, 10);
		
		fill(50, 50, 50);
		rect(400, 10, 60, 40, 10);
		fill(20, 20, 230);
		if(p.dash < 0.5 * p.dashu()) {
			fill(185, 20, 180);
		}
		if(p.dash < 0.2 * p.dashu()) {
			fill(230, 20, 20);
		}
		fill(230-210*p.dash/p.dashu(), 20, 20+210*p.dash/p.dashu());
		rect(405, 15, max(p.dash, 0)/(p.dashu()) * 50, 30, 10);
		
		fill(50);
		textSize(30);
		textAlign(CENTER);
		text("Level: " + p.level, 200, 110);
		textSize(20);
		text(ceil(p.health) + "/" + ceil(p.maxHealth), 65, 100);
		textAlign(CORNER);
		
		rectMode(CENTER);
	}
}
class Player {
	constructor() {
		this.oldX = 0;
		this.oldY = 0;
		this.x = 0;
		this.y = 0;
		this.dx = 0;
		this.dy = 0;
		this.radius = 30;
		
		this.exp = 0;
		this.level = 1;
		this.speed = 1 + sigmoid(this.level);
		this.health = this.healthu(this.level);
		this.maxHealth = this.healthu(this.level);
		this.recovery = 0.1;
		this.attack = 1;
		this.defense = 0;
		
		this.score = 0;
		
		this.dash = this.speed * 50;
		
		this.bag = new Bag();
		this.weapon = new Weapon();
		this.HUD = new HUD();
	}
	
	updateStats() {
		this.speed = 1 + sigmoid(this.level);
		this.health = this.healthu(this.level);
		this.maxHealth = this.healthu(this.level);
		this.recovery = this.level/5;
		this.attack = this.level * .2 + .8;
		this.defense = this.defenseu(this.level);
		
		this.dash = this.speed * 50;
	}
	
	dashu() {
		return this.speed * 50;
	}
	
	run() {
		if(this.dash < this.dashu() && !keys[32]) {
			if(this.dash >= 0.2 * this.dashu()) {
				this.dash += 0.5 + this.level/60;
			} else {
				this.dash += 0.1 + this.level/100;
			}
		}
		if(this.dash > this.dashu()) this.dash = this.dashu();
		this.dx = 0;
		this.dy = 0;
		if(keys[65]) this.dx -= 1;
		if(keys[68]) this.dx += 1;
		if(keys[87]) this.dy -= 1;
		if(keys[83]) this.dy += 1;
		
		this.oldX = this.x;
		this.oldY = this.y;
		
		if(!(this.dx === 0 && this.dy === 0)) {
			let dashy = 1;
			if(keys[32] && this.dash > 0) {
				dashy = 3;
				this.dash -= 2;
			}
			if(this.dash < 0.2 * this.dashu()) {
				dashy = 0.5;
			}
			
			this.x += cos(atan2(this.dy, this.dx)) * this.speed * dashy;
			this.y += sin(atan2(this.dy, this.dx)) * this.speed * dashy;
		}
		
		if(this.health < this.maxHealth) this.health += this.recovery;
		if(this.health > this.maxHealth) this.health = this.maxHealth;
	}
	
	levelUp() {
		while(this.exp > pow(this.level, 2) * 2 + 10) {
			this.exp -= pow(this.level, 2) * 2 + 10;
			this.level ++;
			this.updateStats();
		}
	}
	
	healthu(l) {
		return 90 + (this.level*this.level*2+this.level);
	}
	
	defenseu(l) {
		return 3*l;
	}
	
	draw() {
		fill(50, 50, 255);
		noStroke();
    ellipse(player.x,player.y,30,30);
		this.weapon.draw(this);
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	
	shop = new Shop();
	
	player = new Player();
	player.x = windowWidth/2;
	player.y = windowHeight/2;
	player.weapon.x = windowWidth/2;
	player.weapon.y = windowHeight/2;
	
	for(let i = 0;i < 50;i ++) {
		let disty = dist(0, 0, windowWidth/2 + 400, windowHeight/2 + 400);
		back.push(new Background(random(-disty, disty), random(-disty, disty)));
		let u = back.length-1;
		if(dist(back[u].x, back[u].y, player.x, player.y) > disty) {
			back.pop();
		}
	}
	
	/*for(let i = 0;i < 2;i ++) {
		enemy.push(new Enemy(1));
		enemy[i].x = random(0, windowWidth);
		enemy[i].y = random(0, windowHeight);
	}*/
}

function draw() {
	background(30, 190, 10);
	
	if(menu === 0) {
		if(player.health/player.maxHealth < 0.50) {
			fill(255, 0, 0, 255 - player.health/player.maxHealth*510);
			rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
		}

		push();
		translate(-player.x+windowWidth/2, -player.y+windowHeight/2);

		player.draw();

		player.run();

		rectMode(CENTER);
		
		for(let i = 0;i < enemy.length;i ++) {
			enemy[i].lifeBar();
		}
		for(let i = enemy.length-1;i >= 0;i --) {
			enemy[i].draw();

			enemy[i].follow(player);

			if(enemy[i].collide(player)) {
				enemy[i].damage(player);
			}

			if(player.weapon.collide(enemy[i])) {
				player.weapon.damage(enemy[i], player);
				if(player.weapon.durability <= 0) {
					player.weapon = new Broken();
				}
			}

			for(let u = 0;u < enemy.length;u ++) {
				if(u !== i) {
					enemy[u].collide2(enemy[i]);
				}
			}
			let disty = dist(0, 0, windowWidth/2 + 400, windowHeight/2 + 400);
			let sine = sin(45);
			if(dist(enemy[i].x, enemy[i].y, player.x, player.y) > disty) {
				if(enemy[i].y > player.y-sine*disty && enemy[i].y < player.y+sine*disty) {
					enemy[i].x = player.x + (player.x-enemy[i].x);
				}
				if(enemy[i].x > player.x-sine*disty && enemy[i].x < player.x+sine*disty) {
					enemy[i].y = player.y + (player.y-enemy[i].y);
				}
			}

			if(enemy[i].health <= 0) {
				player.bag.copper += enemy[i].level * 3 - 2;
				player.exp += enemy[i].level * 3 - 2;
				player.score += enemy[i].level * enemy[i].multiplier;
				enemy.splice(i, 1);
			}
		}
		
		for(let i = 0;i < back.length;i ++) {
			back[i].draw();
			let disty = dist(0, 0, windowWidth/2 + 400, windowHeight/2 + 400);
			let sine = sin(45);
			if(dist(back[i].x, back[i].y, player.x, player.y) > disty) {
				if(back[i].y > player.y-sine*disty && back[i].y < player.y+sine*disty) {
					back[i].x = player.x + (player.x-back[i].x);
				}
				if(back[i].x > player.x-sine*disty && back[i].x < player.x+sine*disty) {
					back[i].y = player.y + (player.y-back[i].y);
				}
			}
		}

		pop();

		if(frameCount % wait === 0 && enemy.length < 150) {
			let newLev = floor(random(0, pow(player.level, 0.6)));
			let rand = random(0, min(6.9999, player.level/5));
			if(rand < 2.5) {
				enemy.push(new Enemy(player.level + newLev));
			} else if(rand < 3.5) {
				enemy.push(new Speeder(player.level + newLev));
			} else if(rand < 4.5) {
				enemy.push(new Drainer(player.level + newLev));
			} else if(rand < 5) {
				enemy.push(new Fuser(player.level + newLev));
			} else if(rand < 6) {
				enemy.push(new Brute(player.level + newLev));
			} else if(rand < 7) {
				enemy.push(new Assassin(player.level + newLev));
			}
			
			let i = enemy.length-1;
			
			enemy[i].x = random(player.x-100-windowWidth/2, player.x+windowWidth/2+100);
			enemy[i].y = random(player.y-100-windowHeight/2, player.y+windowHeight/2+100);
			while(dist(player.x, player.x, enemy[i].x, enemy[i].y) < 100) {
				enemy[i].x = random(player.x-100-windowWidth/2, player.x+windowWidth/2+100);
				enemy[i].y = random(player.y-100-windowHeight/2, player.y+windowHeight/2+100);
			}
			
			if(wait > max(40, 100 - player.level)) {
				wait -= 1;
			}
		}
		if(keys[16]) {
			player.exp += player.level;
			player.bag.silver = player.bag.sMax;
			if(player.bag.gold >= player.bag.max) {
				player.bag.max ++;
				player.bag.gold = 0;
			}
		}
		
		//player HUD
		player.HUD.draw(player);
		
		if(player.health <= 0) menu = 1;
		if(keys[80]) menu = 2;
	}
	if(menu === 1) {
		fill(255, 0, 0);
		textSize(50);
		text("Game Over", windowWidth/2, windowHeight/2);
		textSize(40);
		text("Score: " + floor(player.score), windowWidth/2, windowHeight/2 + 50);
	}
	if(menu === 2) {
		shop.draw();
	}
}

function mouseReleased() {
	if(menu === 2) {
		if(dist(mouseX, mouseY, windowWidth/2, 400) < 65 && player.bag.gold >= player.weapon.level) {
			player.bag.gold -= player.weapon.level;
			player.weapon.addAttack();
		}
		
		if(dist(mouseX, mouseY, windowWidth/2+200, 400) < 65 && player.bag.gold >= player.bag.max-15) {//upgrade bag
			player.bag.gold -= player.bag.max-15;
			player.bag.upgrade();
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	keys[keyCode] = true;
}

function keyReleased() {
	keys[keyCode] = false;
}

function sigmoid(x) {
	return 3/(1+pow(Math.E, -(2*x-50)/20));
}
