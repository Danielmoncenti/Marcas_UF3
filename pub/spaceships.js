const scene_w = 640;
const scene_h = 480;

let player_init_x = 32;

let bg;
let player;
let enemies = [];
let bullets = [];
let score;
let up_key;
let down_key;
let space_key;
let canshoot;

const BULLET_INIT_X = -1000;
const BULLET_INIT_Y = -1000;

const MAX_ENEMIES = 128;
const MAX_BULLETS = 3;

const SCREEN_MARGIN = 32;

function preload () {
	console.log("Preload");
	this.load.image("background", "stars.jpg");
	this.load.image("character", "PNG/Default/ship_E.png");
	this.load.image("enemy", "PNG/Default/meteor_large.png");
	this.load.image("bullet", "PNG/Default/star_small.png");
}

function create () {
	
	canshoot=true;
	explosion = this.add.particles('explosion');
	bg = this.add.image(scene_w/2, scene_h/2, "background");
	player = this.physics.add.image(player_init_x, scene_h/2, "character");
	

	for (let i = 0; i < MAX_ENEMIES; i++){
		let x = Math.random()*scene_w*10 + scene_w/2;
		let y = Math.random()*scene_h;

		console.log(x,y);

	 	enemies.push(this.physics.add.image(x, y, "enemy"));
	}


	for (let i = 0; i < MAX_BULLETS; i++){
		bullets.push(this.physics.add.image(BULLET_INIT_X, BULLET_INIT_Y, "bullet"));

		bullets[i].moving = false;
	}


	up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
	down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



}

function update () {
	if (up_key.isDown){
		player.y--;
	}
	else if (down_key.isDown){
		player.y++;
	}

	if (space_key.isDown && canshoot){
		let found = false;
		canshoot = false;

		for (let i = 0; i < MAX_BULLETS && !found; i++){
			if (!bullets[i].moving){
				bullets[i].moving = true;
				bullets[i].x = player.x;
				bullets[i].y = player.y;

				found = true;
			}
		}
	}
	if (space_key.isUp){
		canshoot=true;
	}


	for (let i = 0; i < MAX_BULLETS; i++){
		if (bullets[i].moving){
			bullets[i].x++;

			if (bullets[i].x >= scene_w + SCREEN_MARGIN){
				bullets[i].x = BULLET_INIT_X;
				bullets[i].y = BULLET_INIT_Y;

				bullets[i].moving = false;
			}
		}
	}

	for (let i = 0; i < MAX_ENEMIES; i++){
		enemies[i].x--;
	}
}

const config = {
	type: Phaser.CANVAS,
	width: scene_w,
	height: scene_h,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug:true,
//			gravity: { x: 10 }
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);


