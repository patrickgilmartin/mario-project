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

let walls = [];
let frame = 0;
let frame1 = 0;
let frame2 = 0;
let count = 7;
let floors = [];

let gameTime = 220;
let countdown = 0;

let camera, loadingScreen, marioIcon, loadingScreenDisplayed;


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
}

function create() {
    camera = this.cameras.main;

    loadingScreen = this.add.image(400, 310, 'loadingScreen').setDisplaySize(800, 715);
    marioIcon = this.add.image(200, 700, 'marioIcon').setDisplaySize(200, 200);
    titleScreen = this.add.image(400, 200, 'titleScreen').setDisplaySize(200, 200);
    background = this.add.image(400, 200, 'background').setDisplaySize(600, 800);
    bowserIcon = this.add.image(700, 423, 'bowserIcon').setDisplaySize(150, 210);

    mario = this.physics.add.sprite(70, 520, 'mario').setDisplaySize(30, 60);

    this.add.image(200, 120, 'cloud').setDisplaySize(200, 100);
    this.add.image(900, 270, 'cloud').setDisplaySize(200, 100);
    this.add.image(1400, 120, 'cloud').setDisplaySize(200, 100);
    this.add.image(2050, 240, 'cloud').setDisplaySize(200, 100);
    this.add.image(2650, 130, 'cloud').setDisplaySize(200, 100);
    this.add.image(3200, 200, 'cloud').setDisplaySize(200, 100);

    fireb = this.physics.add.image(4390, 485, 'fireb').setDisplaySize(50, 50);
    fireballs.push(fireb);

    
    marioBullets.push(this.physics.add.image(2400, 515, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(3200, 310, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(3400, 515, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(10000, 460, 'marioBullet').setDisplaySize(45, 45));
    marioBullets.push(this.physics.add.image(12000, 515, 'marioBullet').setDisplaySize(45, 45));

    loadingScreenDisplayed = true;

    walls.push(this.add.rectangle(-200, 200, 200, 700, 0x87CEEB));
    walls.push(this.add.rectangle(-200, 200, 200, 700, 0x87CEEB));
}

