
import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let startGame = true;
let facingRight = true;
let gameOn = false;
let gameOver = false;
let win = false;
let pressSpace = false;
let blackScreen = false;

let wall, walls = [];
let frame = 0;
let frame1 = 0;
let frame2 = 0;
let count = 7;
let floors = [];
let time = 220;
let countdown = 0;

let loadingScreen, marioIcon, titleScreen, background, bowserIcon;
let mario;
let cloud, cloud2, cloud3, cloud4, cloud5, cloud6;
let fireb, fireballs = [];
let marioBullets = [];
let floor, floor2, floor3, floor4, floor5, floor6, floor7, floor8, floor9;
let floorNegative1, floorNegative2, floorNegative3, floorNegative4, floorNegative5, floorNegative6, floorNegative7;
let marioCoin, marioCoins = [];
let goombaSmushed;
let bowser;
let powerBox, powerBox2, powerBox3, powerBoxes = [];
let longBlocks, longBlocks2, longBlocks3;
let smasher, smasher2, smasher3, smasher4, smashers = [];
let tube2, tube3, tube4, tube5, tube6, tubes = [];
let castle;
let stairBlocks = [];
let peach;
let plant, plant2, plant3;
let shooter, shooters = [];
let mapImage, pressX;
let storeImage, storeImageRect;
let shopScreenImage, shopScreenImageRect;
let gravityBootsImage, gravityBootsImageRect;
let rampImage, rampImage2;
let magnetImage, magnetImageRect;
let escapeImage, escapeImageRect;
let threeLinesImage, threeLinesRect;
let healthBar;
let health;
let score = 0, scoreDisplay;
let obstacles = [];
let ramps = [];

let jumpSound, bowserDeath, gameOverSound, coinSound, powerBoxSound, fireballSound, bFireballSound, marioLaugh, smasherSound, backgroundSound, pauseSound, shopOpenSound, wingameSound, flagSound, runningOutSound;
let gravity = 0.65;
let jumpSpeed = 11;
let num = 0;
let smasherSpeed = 2;
let smasher1Speed = 2.25;
let time1 = 0;
let smasherRising = {};
let smasherStates = [];
let riseSpeeds = [];
let fallSpeeds = [];
let soundPlaying = false;
let gameStarted = false;
let titleMapInitialization = false;
let xKeyPressed = false;
let playBackgroundSound = true;
let width = 800, height = 600;

function preload() {

    this.load.image('loadingScreen', 'snes-super-mario-world-1-h.png');
    this.load.image('marioIcon', 'MarioIcon.png');
    this.load.image('titleScreen', 'Super-Mario-Bros-Title-Screen.png');
    this.load.image('background', 'wp7619435.png');
    this.load.image('bowserIcon', 'Bowser_back3.png');
    this.load.spritesheet('mario', 'Mario.2.png', { frameWidth: 30, frameHeight: 60 });
    this.load.image('cloud', 'Cloud2.png');
    this.load.image('fireb', 'Fireball.png');
    this.load.image('marioBullet', 'Bullet.png');
    this.load.image('floor', 'Grass.png');
    this.load.image('marioCoin', 'Coins16.png');
    this.load.image('goombaSmushed', 'Goomba_smushed2.png');
    this.load.image('powerBox', 'Power Box.png');
    this.load.image('longBlocks', 'long_blocks.png');
    this.load.image('smasher', 'Thwomp.png');
    this.load.image('tube', 'TUBE.png');
    this.load.image('castle', 'castle_final.png');
    this.load.image('stairBlock', 'BLOCKS.png');
    this.load.image('peach', 'Peach6.png');
    this.load.spritesheet('plant', 'PLANTS_NEW.png', { frameWidth: 20, frameHeight: 110 });
    this.load.image('shooter', 'Fireball2.png');
    this.load.image('mapImage', 'MarioMap2.png');
    this.load.image('pressX', 'PressX-PhotoRoom.png-PhotoRoom.png');
    this.load.audio('jumpSound', 'smb_jump-small.wav');
    this.load.audio('bowserDeath', 'smb_bowserfalls.wav');
    this.load.audio('gameOverSound', 'smb_gameover.wav');
    this.load.audio('coinSound', 'smb_coin.wav');
    this.load.audio('powerBoxSound', 'smb_powerup.wav');
    this.load.audio('fireballSound', 'smb_fireball.wav');
    this.load.audio('bFireballSound', 'ssbm_bowser_21.wav');
    this.load.audio('marioLaugh', 'ssbm_dr_mario_20_mario_14.wav');
    this.load.audio('smasherSound', 'sm64_thwomp.wav');
    this.load.audio('backgroundSound', 'SuperMarioBros.wav');
    this.load.audio('pauseSound', 'smb3_pause.wav');
    this.load.audio('shopOpenSound', 'smb3_inventory_open_close.wav');
    this.load.audio('wingameSound', 'victory-mario-series-hq-super-smash-bros.wav');
    this.load.audio('flagSound', 'smb_flagpole.wav');
    this.load.audio('runningOutSound', 'smb_warning (1).wav');
}

function create() {
    camera = this.cameras.main;


    loadingScreen = this.add.image(400, 310, 'loadingScreen').setDisplaySize(800, 715);
    marioIcon = this.add.image(200, 700, 'marioIcon').setDisplaySize(200, 200);
    titleScreen = this.add.image(400, 200, 'titleScreen').setDisplaySize(200, 200);
    background = this.add.image(400, 200, 'background').setDisplaySize(600, 800);
    bowserIcon = this.add.image(700, 423, 'bowserIcon').setDisplaySize(150, 210);

    mario = this.physics.add.sprite(70, 520, 'mario').setDisplaySize(30, 60);

    
    cloud = this.add.image(200, 120, 'cloud').setDisplaySize(200, 100);
    cloud2 = this.add.image(900, 270, 'cloud').setDisplaySize(200, 100);
    cloud3 = this.add.image(1400, 120, 'cloud').setDisplaySize(200, 100);
    cloud4 = this.add.image(2050, 240, 'cloud').setDisplaySize(200, 100);
    cloud5 = this.add.image(2650, 130, 'cloud').setDisplaySize(200, 100);
    cloud6 = this.add.image(3200, 200, 'cloud').setDisplaySize(200, 100);


    fireb = this.physics.add.image(4390, 485, 'fireb').setDisplaySize(50, 50);
    fireballs.push(fireb);

  
    marioBullets.push(this.physics.add.image(2400, 515, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(3200, 310, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(3400, 515, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(10000, 460, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(12000, 515, 'marioBullet').setDisplaySize(45, 45));

   
    floors.push(this.add.image(20, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(60, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(100, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(140, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(180, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(220, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(260, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(300, 581, 'floor').setDisplaySize(2, 60));
    floors.push(this.add.image(340, 581, 'floor').setDisplaySize(2, 60));

   
    this.add.image(-260, 581, 'floor').setDisplaySize(2, 2);
    this.add.image(-220, 581, 'floor').setDisplaySize(2, 2);
    this.add.image(-180, 581, 'floor').setDisplaySize(2, 2);
    this.add.image(-140, 581, 'floor').setDisplaySize(2, 2);
    this.add.image(-100, 581, 'floor').setDisplaySize(2, 2);
    this.add.image(-60, 581, 'floor').setDisplaySize(2, 2);
    this.add.image(-20, 581, 'floor').setDisplaySize(2, 2);

    let randomX1 = Phaser.Math.Between(50, 800);
    let randomX2 = Phaser.Math.Between(50, 800);
    marioCoin = this.physics.add.image(randomX1, 450, 'marioCoin').setDisplaySize(10, 35);
    marioCoins.push(marioCoin);

   
    goombaSmushed = this.add.image(1000, 535, 'goombaSmushed').setDisplaySize(30, 15);

   
    walls.push(this.add.rectangle(-200, 200, 200, 700, 0x87CEEB));


}
function update() {
    // Game update logic
}
