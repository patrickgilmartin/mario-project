let game;


function preload() {
    this.load.image('LevelsScreen', 'src/assets/LevelsScreen.png');
    this.load.image('LoadingScreen', 'src/assets/snes-super-mario-world-1-h.png');
    this.load.image('MarioIcon', 'src/assets/MarioIcon.png');
    this.load.image('titleScreen', 'src/assets/Super-Mario-Bros-Title-Screen.png');
    this.load.image('background', 'src/assets/wp7619435.png');
    this.load.image('bowserIcon', 'src/assets/Bowser_back3.png');
    this.load.spritesheet('mario', 'src/assets/Mario.2.png', { frameWidth: 30, frameHeight: 60 });
    this.load.image('fireb', 'src/assets/Fireball.png');
    this.load.image('marioBullet', 'src/assets/Bullet.png');
    this.load.image('floor', 'src/assets/BLOCKS.png');
    this.load.image('marioCoin', 'src/assets/Coins16.png');
    this.load.spritesheet('bowser', 'src/assets/Bowser4.png', { frameWidth: 200, frameHeight: 20 });
    this.load.image('powerBox', 'src/assets/Power Box.png');
    this.load.image('longBlocks', 'src/assets/long_blocks.png');
    this.load.image('smasher', 'src/assets/Thwomp.png');
    this.load.image('tube', 'src/assets/TUBE.png');
    this.load.image('castle', 'src/assets/castle_final.png');
    this.load.image('stairBlock', 'src/assets/BLOCKS.png');
    this.load.image('peach', 'src/assets/Peach6.png');
    this.load.spritesheet('plant', 'src/assets/PLANTS_NEW.png', { frameWidth: 20, frameHeight: 110 });
    this.load.image('shooter', 'src/assets/Fireball2.png');
    this.load.image('mapImage', 'src/assets/MarioMap2.png');
    this.load.image('pressX', 'src/assets/PressX-PhotoRoom.png-PhotoRoom.png');
}


function create() {
    LevelsScreen = this.add.image(400, 300, 'LevelsScreen').setDisplaySize(800, 600);
    LoadingScreen = this.add.image(400, 310, 'LoadingScreen').setDisplaySize(800, 715);
    MarioIcon = this.add.image(200, 700, 'MarioIcon').setDisplaySize(200, 200);
    titleScreen = this.add.image(400, 200, 'titleScreen').setDisplaySize(200, 200);
    background = this.add.image(400, 200, 'background').setDisplaySize(600, 800);
    bowserIcon = this.add.image(700, 423, 'bowserIcon').setDisplaySize(150, 210);

    mario = this.physics.add.sprite(70, 550, 'mario').setDisplaySize(30, 60);
    fireb = this.physics.add.image(4390, 485, 'fireb').setDisplaySize(50, 50);
    fireballs.push(fireb);

    let marioBullet1 = this.physics.add.image(1700, 515, 'marioBullet').setDisplaySize(45, 45);
    let marioBullet2 = this.physics.add.image(2700, 310, 'marioBullet').setDisplaySize(45, 45);
    let marioBullet3 = this.physics.add.image(3000, 515, 'marioBullet').setDisplaySize(45, 45);
    let marioBullet4 = this.physics.add.image(10000, 460, 'marioBullet').setDisplaySize(45, 45);
    let marioBullet5 = this.physics.add.image(12000, 515, 'marioBullet').setDisplaySize(45, 45);

    marioBullets.push(marioBullet1, marioBullet2, marioBullet3, marioBullet4, marioBullet5);

    floors = [];
    for (let i = 0; i <= 20; i++) {
        let x = 20 + (i * 40);
        let floor = this.add.image(x, 581, 'floor').setDisplaySize(2, 60);
        floors.push(floor);
    }

    let negativeFloors = [];
    for (let i = -7; i <= -1; i++) {
        let x = -260 + (i * 40);
        let floor = this.add.image(x, 581, 'floor').setDisplaySize(2, 2);
        negativeFloors.push(floor);
    }

    let randomX1 = Phaser.Math.Between(50, 800);
    let randomX2 = Phaser.Math.Between(50, 800);
    let marioCoin = this.physics.add.image(randomX1 || randomX2, 500, 'marioCoin').setDisplaySize(10, 35);
    coins.push(marioCoin);

    let bowser = this.physics.add.sprite(4500, 470, 'bowser').setDisplaySize(200, 20);

    let powerBox1 = this.physics.add.image(300, 420, 'powerBox').setDisplaySize(20, 60);
    let powerBox2 = this.physics.add.image(2600, 420, 'powerBox').setDisplaySize(20, 60);
    let powerBox3 = this.physics.add.image(3950, 520, 'powerBox').setDisplaySize(20, 60);

    let powerBoxes = [powerBox1, powerBox2];

    let longBlock1 = this.add.image(1415, 450, 'longBlocks').setDisplaySize(100, 25);
    let longBlock2 = this.add.image(1615, 400, 'longBlocks').setDisplaySize(100, 25);
    let longBlock3 = this.add.image(2700, 500, 'longBlocks').setDisplaySize(100, 25);

    let longBlocks = [longBlock1, longBlock2, longBlock3];

    let smasher1 = this.physics.add.image(3120, 112, 'smasher').setDisplaySize(100, 150);
    let smasher2 = this.physics.add.image(3350, 112, 'smasher').setDisplaySize(100, 150);
    let smasher3 = this.physics.add.image(3580, 112, 'smasher').setDisplaySize(100, 150);
    let smasher4 = this.physics.add.image(3810, 112, 'smasher').setDisplaySize(100, 150);

    let smashers = [smasher1, smasher2, smasher3, smasher4];

    let tube1 = this.add.image(450, 515, 'tube').setDisplaySize(1, 100);
    let tube2 = this.add.image(600, 515, 'tube').setDisplaySize(1, 100);
    let tube3 = this.add.image(750, 515, 'tube').setDisplaySize(1, 100);
    let tube4 = this.add.image(900, 515, 'tube').setDisplaySize(1, 100);
    let tube5 = this.add.image(900, 515, 'tube').setDisplaySize(1, 100);

    let tubes = [tube1, tube2, tube3, tube4, tube5];

    let castle = this.add.image(5200, 388, 'castle').setDisplaySize(200, 350);

    let stairBlocks = [];
    for (let i = 0; i < 21; i++) {
        let x = 4720 + (i % 5) * 40 + Math.floor(i / 5) * 40;
        let y = 540 - Math.floor(i / 5) * 40;
        let stairBlock = this.add.image(x, y, 'stairBlock').setDisplaySize(40, 60);
        stairBlocks.push(stairBlock);
    }
   
    peach = this.add.image(5500, 514, 'peach').setDisplaySize(20, 100);

  
    let plant1 = this.physics.add.sprite(1950, 532, 'plant', 11).setDisplaySize(20, 110);
    let plant2 = this.physics.add.sprite(2150, 532, 'plant', 11).setDisplaySize(20, 110);
    let plant3 = this.physics.add.sprite(2350, 532, 'plant', 11).setDisplaySize(20, 110);

    
    let shooter = this.physics.add.image(3950, -10, 'shooter').setDisplaySize(20, 20);
    let shooters = [shooter];

    
    let mapImage = this.add.image(400, 300, 'mapImage').setDisplaySize(800, 600);

   
    let pressX = this.add.image(380, 400, 'pressX').setDisplaySize(20, 50);

    
    let healthBar = this.add.rectangle(4450, 280, 255, 10, 0xff0000);

    
    let healthText = this.add.text(4450, 250, 'Health: 300', { fontSize: '30px', fill: '#ff0000' });


    let score = 0;
    let scoreDisplay = this.add.text(40, 40, score.toString(), { fontSize: '50px', fill: '#000000' });

    
    let obstacles = [
        ...floors, ...negativeFloors, tube1, tube2, tube3, tube4, tube5,
        ...longBlocks, ...stairBlocks
    ];

    
    this.jumpSound = this.sound.add('smb_jump-small');
    this.winSound = this.sound.add('smb_world_clear');
    this.bowserDeathSound = this.sound.add('smb_bowserfalls');
    this.gameOverSound = this.sound.add('smb_gameover');
    this.coinSound = this.sound.add('smb_coin');
    this.powerBoxSound = this.sound.add('smb_powerup');
    this.fireballSound = this.sound.add('smb_fireball');
    this.bFireballSound = this.sound.add('ssbm_bowser_21');
    this.marioLaughSound = this.sound.add('ssbm_dr_mario_20_mario_14');
    this.smasherSound = this.sound.add('sm64_thwomp');
    this.backgroundSound = this.sound.add('SuperMarioBros');


    this.gravity = 0.65;
    this.jumpSpeed = 11;
    this.num = 0;
    this.smasherSpeed = 2;
    this.smasher1Speed = 2.25;
    this.time1 = 0;
    this.smasherRising = {};
    this.smasherStates = [0, 0, 0, 0]; 
    this.riseSpeeds = Array.from({ length: 4 }, () => -Phaser.Math.Between(4, 7));
    this.fallSpeeds = Array.from({ length: 4 }, () => Phaser.Math.Between(4, 8));
    this.soundPlaying = false;
    this.gameStarted = false;
    this.titleMapInitialization = false;
    this.xKeyPressed = false;
    this.playBackgroundSound = true;

    this.circleSettings = [
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
    this.circleFillin = { color: 0xa07d55, radius: 5, position: { x: 377, y: 537 } };

    camera = this.cameras.main;
    camera.setViewport(0, 0, 800, 600);
}

function update() {
    // Your game update logic here
}

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

game = new Phaser.Game(config);
