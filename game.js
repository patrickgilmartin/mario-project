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

let frame = 0;
let frame1 = 0;
let frame2 = 0;
let count = 7;
let floors = [];
let countdown = 0;
let healthBar, healthText, scoreDisplay;
let mario, fireb, castle, peach, shooter;
let fireballs = [];
let marioBullets = [];
let coins = [];
let clouds = [];
let walls = [];
let powerBoxes = [];
let longBlocks = [];
let smashers = [];
let tubes = [];
let circles = [];
let circleSprites;
let lastSelected = [null];
let circleAndBPressed = false;

function preload() {
    this.load.image('LoadingScreen', 'snes-super-mario-world-1-h.png');
    this.load.image('MarioIcon', 'MarioIcon.png');
    this.load.image('titleScreen', 'Super-Mario-Bros-Title-Screen.png');
    this.load.image('background', 'wp7619435.png');
    this.load.image('bowserIcon', 'Bowser_back3.png');
    this.load.spritesheet('mario', 'Mario.2.png', { frameWidth: 30, frameHeight: 60 });
    this.load.image('fireb', 'Fireball.png');
    this.load.image('marioBullet', 'Bullet.png');
    this.load.image('floor', 'Grass.png');
    this.load.image('marioCoin', 'Coins16.png');
    this.load.image('cloud', 'Cloud2.png');
    this.load.spritesheet('bowser', 'Bowser4.png', { frameWidth: 200, frameHeight: 20 });
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
    this.load.image('Store', 'Store.png');
    this.load.image('ShopScreen', 'Attempt4.png');
    this.load.image('GravityBoots', 'GravityBoots4.png');
    this.load.image('Ramp', 'cropped_Ramp_tight.png');
    this.load.image('Ramp2', 'Ramp.png');
    this.load.image('Magnet', 'Magnet.png');
    this.load.image('Escape', 'Escape.png');
    this.load.image('threeLines', 'three_lines.png');
}

function create() {
    const camera = this.cameras.main;

    this.add.image(400, 310, 'LoadingScreen').setDisplaySize(800, 715);
    this.add.image(200, 700, 'MarioIcon').setDisplaySize(200, 200);
    this.add.image(400, 200, 'titleScreen').setDisplaySize(200, 200);
    this.add.image(400, 200, 'background').setDisplaySize(600, 800);
    this.add.image(700, 423, 'bowserIcon').setDisplaySize(150, 210);

    mario = this.physics.add.sprite(70, 520, 'mario').setDisplaySize(30, 60);
    fireb = this.physics.add.image(4390, 485, 'fireb').setDisplaySize(50, 50);
    fireballs.push(fireb);

    marioBullets.push(
        this.physics.add.image(2400, 515, 'marioBullet').setDisplaySize(45, 45),
        this.physics.add.image(3200, 310, 'marioBullet').setDisplaySize(45, 45),
        this.physics.add.image(3400, 515, 'marioBullet').setDisplaySize(45, 45),
        this.physics.add.image(10000, 460, 'marioBullet').setDisplaySize(45, 45),
        this.physics.add.image(12000, 515, 'marioBullet').setDisplaySize(45, 45)
    );

    for (let i = 0; i <= 20; i++) {
        let x = 20 + (i * 40);
        floors.push(this.add.image(x, 581, 'floor').setDisplaySize(2, 60));
    }

    let negativeFloors = [];
    for (let i = -7; i <= -1; i++) {
        let x = -260 + (i * 40);
        negativeFloors.push(this.add.image(x, 581, 'floor').setDisplaySize(2, 2));
    }

    coins.push(
        this.physics.add.image(450, 450, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(600, 450, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(750, 450, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(900, 450, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1275, 425, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1325, 425, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1375, 425, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1475, 380, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1575, 380, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1675, 380, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1775, 380, 'marioCoin').setDisplaySize(10, 35),
        this.physics.add.image(1975, 300, 'marioCoin').setDisplaySize(10, 35)
    );

    clouds.push(
        this.add.image(200, 120, 'cloud').setDisplaySize(200, 100),
        this.add.image(900, 270, 'cloud').setDisplaySize(200, 100),
        this.add.image(1400, 120, 'cloud').setDisplaySize(200, 100),
        this.add.image(2050, 240, 'cloud').setDisplaySize(200, 100),
        this.add.image(2650, 130, 'cloud').setDisplaySize(200, 100),
        this.add.image(3200, 200, 'cloud').setDisplaySize(200, 100)
    );

    castle = this.add.image(5200, 380, 'castle').setDisplaySize(200, 350);

    powerBoxes.push(
        this.physics.add.image(300, 420, 'powerBox').setDisplaySize(20, 60),
        this.physics.add.image(2600, 420, 'powerBox').setDisplaySize(20, 60),
        this.physics.add.image(3950, 520, 'powerBox').setDisplaySize(20, 60)
    );

    longBlocks.push(
        this.add.image(1415, 450, 'longBlocks').setDisplaySize(100, 25),
        this.add.image(1615, 400, 'longBlocks').setDisplaySize(100, 25),
        this.add.image(2700, 500, 'longBlocks').setDisplaySize(100, 25)
    );

    smashers.push(
        this.physics.add.image(3120, 112, 'smasher').setDisplaySize(100, 150),
        this.physics.add.image(3350, 112, 'smasher').setDisplaySize(100, 150),
        this.physics.add.image(3580, 112, 'smasher').setDisplaySize(100, 150),
        this.physics.add.image(3810, 112, 'smasher').setDisplaySize(100, 150)
    );

    tubes.push(
        this.add.image(450, 503.5, 'tube').setDisplaySize(1, 100),
        this.add.image(600, 503.5, 'tube').setDisplaySize(1, 100),
        this.add.image(750, 503.5, 'tube').setDisplaySize(1, 100),
        this.add.image(900, 503.5, 'tube').setDisplaySize(1, 100),
        this.add.image(900, 503.5, 'tube').setDisplaySize(1, 100)
    );

    peach = this.add.image(5500, 500, 'peach').setDisplaySize(20, 100);

    let plants = [
        this.physics.add.sprite(1940, 521, 'plant', 11).setDisplaySize(20, 110),
        this.physics.add.sprite(2150, 521, 'plant', 11).setDisplaySize(20, 110),
        this.physics.add.sprite(2350, 521, 'plant', 11).setDisplaySize(20, 110)
    ];

    shooter = this.physics.add.image(3950, -10, 'shooter').setDisplaySize(20, 20);

    this.add.image(400, 100, 'mapImage').setDisplaySize(800, 600);
    this.add.image(380, 400, 'pressX').setDisplaySize(20, 50);

    healthBar = this.add.rectangle(4450, 280, 255, 10, 0xff0000);
    healthText = this.add.text(4450, 250, 'Health: 300', { fontSize: '30px', fill: '#ff0000' });

    scoreDisplay = this.add.text(40, 40, '0', { fontSize: '50px', fill: '#000000' });

    let circleSettings = [
        { color: 0x800000, radius: 5, position: { x: 148, y: 408 } },
        { color: 0x404040, radius: 6, position: { x: 148, y: 315 } },
        { color: 0x404040, radius: 6.5, position: { x: 148, y: 261 } },
        { color: 0x404040, radius: 5, position: { x: 102, y: 241 } },
        { color: 0x404040, radius: 6, position: { x: 239, y: 186 } },
        { color: 0x404040, radius: 6, position: { x: 285, y: 222 } },
        { color: 0x404040, radius: 6, position: { x: 355, y: 55 } },
        { color: 0x404040, radius: 6, position: { x: 490, y: 90 } },
        { color: 0x404040, radius: 6, position: { x: 560, y: 93 } },
        { color: 0x404040, radius: 6, position: { x: 675, y: 65 } },
        { color: 0x404040, radius: 6, position: { x: 678, y: 180 } },
        { color: 0x404040, radius: 6, position: { x: 679, y: 305 } },
        { color: 0x404040, radius: 5, position: { x: 588, y: 350 } },
        { color: 0x404040, radius: 6, position: { x: 583, y: 406 } },
        { color: 0x404040, radius: 6, position: { x: 514, y: 502 } },
        { color: 0x404040, radius: 6, position: { x: 468, y: 502 } },
        { color: 0x404040, radius: 6, position: { x: 400, y: 502 } },
        { color: 0x404040, radius: 6, position: { x: 308, y: 482 } },
        { color: 0x404040, radius: 9, position: { x: 353, y: 427 } }
    ];

    circleSprites = this.add.group();

    for (let circle of circleSettings) {
        let circ = this.add.circle(circle.position.x, circle.position.y, circle.radius, circle.color);
        circleSprites.add(circ);
    }

    let storeImage = this.add.image(770, 590, 'Store').setDisplaySize(40, 50);
    let shopScreenImage = this.add.image(390, 300, 'ShopScreen').setDisplaySize(500, 610);
    let gravityBootsImage = this.add.image(270, 200, 'GravityBoots').setDisplaySize(80, 100);
    let rampImage = this.add.image(250, 527, 'Ramp').setDisplaySize(600, 60);
    let rampImage2 = this.add.image(274.5, 475, 'Ramp2').setDisplaySize(600, 60);
    let magnetImage = this.add.image(470, 201, 'Magnet').setDisplaySize(58, 56);
    let escapeImage = this.add.image(400, 200, 'Escape').setDisplaySize(700, 600);
    let threeLinesImage = this.add.image(740, 10, 'threeLines').setDisplaySize(50, 50);

    // Sound loading
    this.sound.add('smb_jump-small');
    this.sound.add('smb_bowserfalls');
    this.sound.add('smb_gameover');
    this.sound.add('smb_coin');
    this.sound.add('smb_powerup');
    this.sound.add('smb_fireball');
    this.sound.add('ssbm_bowser_21');
    this.sound.add('ssbm_dr_mario_20_mario_14');
    this.sound.add('sm64_thwomp');
    this.sound.add('SuperMarioBros');
    this.sound.add('smb3_pause');
    this.sound.add('smb3_inventory_open_close');
    this.sound.add('victory-mario-series-hq-super-smash-bros');
    this.sound.add('smb_flagpole');
    this.sound.add('smb_warning (1)');
}

function update() {
    // 
}
