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

let frame = 0;
let frame1 = 0;
let frame2 = 0;
let count = 7;
let floors = [];
let negativeFloors = [];
let tubes = [];
let longBlocks = [];
let smashers = [];
let coins = [];
let obstacles = [];

let gameTime = 220;
let countdown = 0;

let camera, LevelsScreen, LoadingScreen, MarioIcon, titleScreen, background, bowserIcon, mario, fireb;
let fireballs = [];
let marioBullets = [];
let powerBoxes = [];
let healthBar, healthText, scoreDisplay;
let peach, bowser, shooter, mapImage, pressX;
let score = 0;

function preload() {
    this.load.image('LevelsScreen', 'LevelsScreen.png');
    this.load.image('LoadingScreen', 'snes-super-mario-world-1-h.png');
    this.load.image('MarioIcon', 'MarioIcon.png');
    this.load.image('titleScreen', 'Super-Mario-Bros-Title-Screen.png');
    this.load.image('background', 'wp7619435.png');
    this.load.image('bowserIcon', 'Bowser_back3.png');
    this.load.spritesheet('mario', 'Mario.2.png', { frameWidth: 30, frameHeight: 60 });
    this.load.image('fireb', 'Fireball.png');
    this.load.image('marioBullet', 'Bullet.png');
    this.load.image('floor', 'BLOCKS.png');
    this.load.image('marioCoin', 'Coins16.png');
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
    // Load sounds
    this.load.audio('smb_jump-small', 'smb_jump-small.wav');
    this.load.audio('smb_world_clear', 'smb_world_clear.wav');
    this.load.audio('smb_bowserfalls', 'smb_bowserfalls.wav');
    this.load.audio('smb_gameover', 'smb_gameover.wav');
    this.load.audio('smb_coin', 'smb_coin.wav');
    this.load.audio('smb_powerup', 'smb_powerup.wav');
    this.load.audio('smb_fireball', 'smb_fireball.wav');
    this.load.audio('ssbm_bowser_21', 'ssbm_bowser_21.wav');
    this.load.audio('ssbm_dr_mario_20_mario_14', 'ssbm_dr_mario_20_mario_14.wav');
    this.load.audio('sm64_thwomp', 'sm64_thwomp.wav');
    this.load.audio('SuperMarioBros', 'SuperMarioBros.wav');
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

    for (let i = 0; i <= 20; i++) {
        let x = 20 + (i * 40);
        let floor = this.add.image(x, 581, 'floor').setDisplaySize(2, 60);
        floors.push(floor);
    }

    for (let i = -7; i <= -1; i++) {
        let x = -260 + (i * 40);
        let floor = this.add.image(x, 581, 'floor').setDisplaySize(2, 2);
        negativeFloors.push(floor);
    }

    let randomX1 = Phaser.Math.Between(50, 800);
    let randomX2 = Phaser.Math.Between(50, 800);
    let marioCoin = this.physics.add.image(randomX1 || randomX2, 500, 'marioCoin').setDisplaySize(10, 35);
    coins.push(marioCoin);

    bowser = this.physics.add.sprite(4500, 470, 'bowser').setDisplaySize(200, 20);

    let powerBox1 = this.physics.add.image(300, 420, 'powerBox').setDisplaySize(20, 60);
    let powerBox2 = this.physics.add.image(2600, 420, 'powerBox').setDisplaySize(20, 60);
    let powerBox3 = this.physics.add.image(3950, 520, 'powerBox').setDisplaySize(20, 60);
    powerBoxes.push(powerBox1, powerBox2, powerBox3);

    let longBlock1 = this.add.image(1415, 450, 'longBlocks').setDisplaySize(100, 25);
    let longBlock2 = this.add.image(1615, 400, 'longBlocks').setDisplaySize(100, 25);
    let longBlock3 = this.add.image(2700, 500, 'longBlocks').setDisplaySize(100, 25);
    longBlocks.push(longBlock1, longBlock2, longBlock3);

    let smasher1 = this.physics.add.image(3120, 112, 'smasher').setDisplaySize(100, 150);
    let smasher2 = this.physics.add.image(3350, 112, 'smasher').setDisplaySize(100, 150);
    let smasher3 = this.physics.add.image(3580, 112, 'smasher').setDisplaySize(100, 150);
    let smasher4 = this.physics.add.image(3810, 112, 'smasher').setDisplaySize(100, 150);
    smashers.push(smasher1, smasher2, smasher3, smasher4);

    let tube1 = this.add.image(450, 515, 'tube').setDisplaySize(1, 100);
    let tube2 = this.add.image(600, 515, 'tube').setDisplaySize(1, 100);
    let tube3 = this.add.image(750, 515, 'tube').setDisplaySize(1, 100);
    let tube4 = this.add.image(900, 515, 'tube').setDisplaySize(1, 100);
    let tube5 = this.add.image(900, 515, 'tube').setDisplaySize(1, 100);
    tubes.push(tube1, tube2, tube3, tube4, tube5);

    castle = this.add.image(5200, 388, 'castle').setDisplaySize(200, 350);

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

    shooter = this.physics.add.image(3950, -10, 'shooter').setDisplaySize(20, 20);
    let shooters = [shooter];

    mapImage = this.add.image(400, 300, 'mapImage').setDisplaySize(800, 600);
    pressX = this.add.image(380, 400, 'pressX').setDisplaySize(20, 50);

    healthBar = this.add.rectangle(4450, 280, 255, 10, 0xff0000);
    healthText = this.add.text(4450, 250, 'Health: 300', { fontSize: '30px', fill: '#ff0000' });

    scoreDisplay = this.add.text(40, 40, score.toString(), { fontSize: '50px', fill: '#000000' });

    obstacles = [
        ...floors, ...negativeFloors, ...tubes, ...longBlocks, ...stairBlocks
    ];

    // Sound handling
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

function handleMarioXMovement() {
    let isMoving = false;
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        if (facingRight) {
            facingRight = false;
            mario.flipX = true;
        }
        isMoving = true;
        mario.x -= 5;
        camera.scrollX = mario.x - 400;
    } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        if (!facingRight) {
            facingRight = true;
            mario.flipX = false;
        }
        isMoving = true;
        mario.x += 5;
        camera.scrollX = mario.x - 400;
    }

    if (!isMoving) {
        mario.setTexture('mario', 3);
    } else {
        frame += 0.3;
        if (frame >= 3) {
            frame = 0;
        }
        mario.setTexture('mario', Math.floor(frame));
    }
    
    mario.body.velocity.x = 0;

    if (pressSpace === false) {
        if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
            mario.x -= 5;
            mario.setTexture('mario', 0);
            facingRight = true;
        }
        if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
            mario.x += 5;
            mario.setTexture('mario', 3);
            facingRight = false;
        }
    }
}

function handleWall() {
    return walls.some(wall => mario.body.touching.right || mario.body.touching.left);
}

function handlePlantMovement() {
    frame1 += 0.2;
    if (frame1 >= 5) {
        frame1 = 0;
    }
    plant1.setTexture('plant', Math.floor(frame1));
    plant2.setTexture('plant', Math.floor(frame1));
    plant3.setTexture('plant', Math.floor(frame1));
}

function handleBowserMovement() {
    frame2 += 0.2;
    if (frame2 >= 5) {
        frame2 = 0;
    }
    bowser.setTexture('bowser', Math.floor(frame2));
}

function moveSmasher() {
    if (gameOn && mario.x >= 2300) {
        smashers.forEach((smasher, i) => {
            if (smasherStates[i] === 0) {
                smasher.body.velocity.y = riseSpeeds[i];
                if (smasher.y <= 25) {
                    smasherStates[i] = 1;
                }
            } else {
                smasher.body.velocity.y = fallSpeeds[i];
                if (smasher.y >= 410) {
                    smasherStates[i] = 0;
                    soundPlaying = true;
                    this.smasherSound.play();
                }
            }
            this.physics.add.collider(mario, smasher);
        });
    }
    if (gameOn && mario.x >= 4000) {
        this.smasherSound.stop();
    }
}

function handleCoins() {
    for (let coin of coins) {
        if (this.physics.overlap(mario, coin)) {
            score += 1;
            let randomX = Phaser.Math.Between(mario.x + 100, 5500);
            coin.setX(randomX);
            this.coinSound.play();
        }
    }
    scoreDisplay.setText(score.toString());
    scoreDisplay.setX(705 + mario.x);
}

function handlePowerboxes() {
    if (this.physics.overlap(mario, powerBox1)) {
        mario.setDisplaySize(50, 120);
        powerBox1.setX(-300);
        countdown = 150;
        this.powerBoxSound.play();
    }
    if (this.physics.overlap(mario, powerBox2)) {
        mario.setDisplaySize(50, 120);
        powerBox2.setX(-305);
        countdown = 150;
        this.powerBoxSound.play();
    }
}

function moveBullets() {
    if (gameOn) {
        for (let bullet of marioBullets) {
            bullet.setX(bullet.x - 12.5);
        }
        if (mario.x > 800) {
            marioBullets[3].setX(marioBullets[3].x - 13);
        }
        if (mario.x > 900) {
            marioBullets[3].setX(marioBullets[3].x - 10);
            marioBullets[4].setX(marioBullets[4].x - 8);
        }
    }
}

function jump() {
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP)) {
        let touchingGround = false;
        for (let obstacle of obstacles) {
            if (this.physics.overlap(mario, obstacle) && mario.body.touching.down) {
                touchingGround = true;
                break;
            }
        }
        if (touchingGround) {
            mario.setVelocityY(-jumpSpeed);
            this.jumpSound.play();
        }
    }
    mario.setVelocityY(mario.body.velocity.y + gravity);
}

function moveFloors() {
    if (obstacles.includes(floorNegative1)) floorNegative1.setX(mario.x - 260);
    if (obstacles.includes(floorNegative2)) floorNegative2.setX(floorNegative1.x + 40);
    if (obstacles.includes(floorNegative3)) floorNegative3.setX(floorNegative2.x + 40);
    if (obstacles.includes(floorNegative4)) floorNegative4.setX(floorNegative3.x + 40);
    if (obstacles.includes(floorNegative5)) floorNegative5.setX(floorNegative4.x + 40);
    if (obstacles.includes(floorNegative6)) floorNegative6.setX(floorNegative5.x + 40);
    if (obstacles.includes(floorNegative7)) floorNegative7.setX(floorNegative6.x + 40);
    if (obstacles.includes(floor)) floor.setX(floorNegative7.x + 40);
    if (obstacles.includes(floor2)) floor2.setX(floor.x + 40);
    if (obstacles.includes(floor3)) floor3.setX(floor2.x + 40);
    if (obstacles.includes(floor4)) floor4.setX(floor3.x + 40);
    if (obstacles.includes(floor5)) floor5.setX(floor4.x + 40);
    if (obstacles.includes(floor6)) floor6.setX(floor5.x + 40);
    if (obstacles.includes(floor7)) floor7.setX(floor6.x + 40);
    if (obstacles.includes(floor8)) floor8.setX(floor7.x + 40);
    if (obstacles.includes(floor9)) floor9.setX(floor8.x + 40);
    if (obstacles.includes(floor10)) floor10.setX(floor9.x + 40);
    if (obstacles.includes(floor11)) floor11.setX(floor10.x + 40);
    if (obstacles.includes(floor12)) floor12.setX(floor11.x + 40);
    if (obstacles.includes(floor13)) floor13.setX(floor12.x + 40);
    if (obstacles.includes(floor14)) floor14.setX(floor13.x + 40);
    if (obstacles.includes(floor15)) floor15.setX(floor14.x + 40);
    if (obstacles.includes(floor16)) floor16.setX(floor15.x + 40);
    if (obstacles.includes(floor17)) floor17.setX(floor16.x + 40);
    if (obstacles.includes(floor18)) floor18.setX(floor17.x + 40);
    if (obstacles.includes(floor19)) floor19.setX(floor18.x + 40);
    if (obstacles.includes(floor20)) floor20.setX(floor19.x + 40);
}

function touchingTubes() {
    for (let tube of tubes) {
        this.physics.world.collide(mario, tube);
    }
}

function touchingLongBlocks() {
    for (let block of longBlocks) {
        this.physics.world.collide(mario, block);
    }
}

function touchingCastle() {
    if (this.physics.overlap(mario, castle)) {
        win = true;
        gameTime = 1;
        mario.setX(5070);
        mario.setTexture('mario', 3);
        mario.setVelocity(0.5, 0);
        isMoving = false;
        facingRight = false;
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
}

function fireballGeneration() {
    if (mario.x > 3700) {
        jumpSpeed = 12;
        fireb.setX(fireb.x - 5);
        if (fireb.x < 3650) {
            fireb.setX(4450);
            fireb.setVelocityX(-5);
        }
    }
    if (count === 0) {
        fireb.setX(-200);
        jumpSpeed = 11;
    }
}

function marioFireball() {
    if (mario.x >= 3950 && count !== 0) {
        shooter.setY(mario.y + 13);
        if (this.physics.overlap(mario, powerBox3)) {
            powerBox3.setX(-200);
            shooter.setX(3800);
        }
        if (facingRight && this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.D)) {
            shooter.setX(mario.x);
            shooter.setVelocityX(5);
            this.fireballSound.play();
        }
        if (!facingRight && this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.D)) {
            shooter.setX(mario.x);
            shooter.setVelocityX(-5);
            this.fireballSound.play();
        }
    }
}

function tick() {
    for (let shooter of shooters) {
        if (this.physics.overlap(shooter, bowser)) {
            count -= 1;
            shooter.setVelocityX(1000);
            let healthWidth = 255 * (count / 7);
            healthBar.setDisplaySize(healthWidth, healthBar.height);
            health.setText('Health: ' + (300 - (7 - count) * 45));
            if (count === 0) {
                bowser.setX(-200);
                fireb.setX(-200);
                this.bowserDeathSound.play();
                this.marioLaughSound.play();
            }
        }
    }
    if (!gameOn) {
        if (startGame) {
            if (!gameStarted && !xKeyPressed) {
                LoadingScreen.setVisible(true);
                pressX.setVisible(true);
                MarioIcon.setVisible(true);
                if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.X) && !titleMapInitialization) {
                    xKeyPressed = true;
                    this.backgroundSound.play();
                    for (let setting of this.circleSettings) {
                        let circle = new Phaser.GameObjects.Ellipse(this, setting.position.x, setting.position.y, setting.radius * 2, setting.radius * 2, setting.color);
                        this.add.existing(circle);
                    }
                    TESTER.run_game();
                    LevelsScreen.setVisible(true);
                }
                if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.SPACE) && !gameOver && xKeyPressed) {
                    pressSpace = true;
                    gameOn = true;
                }
            }
            if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.R) && gameOver) {
                gameStarted = true;
                pressSpace = false;
                gameOn = false;
                startGame = true;
                gameOver = false;
                mario.setX(70);
                camera.scrollX = mario.x + 320;
                powerBox1.setX(300);
                powerBox2.setX(2600);
                powerBox3.setX(3950);
                fireb.setX(4390);
                marioBullets[0].setX(1700);
                marioBullets[1].setX(2700);
                marioBullets[2].setX(3000);
                marioBullets[3].setX(10000);
                marioBullets[4].setX(12000);
                score = 0;
                gameTime = 220;
                background1.setVisible(true);
                titleScreen1.setVisible(true);
                bowserIcon1.setVisible(true);
                this.add.text(mario.x, 335, "Bowser has kidnapped Princess Peach! Save her!", { fontSize: '30px', fill: '#ffffff' });
                this.add.text(mario.x, 450, "Press Space to Start", { fontSize: '30px', fill: '#ffffff' });
                powerBox1.setVisible(true);
                powerBox2.setVisible(true);
            }
        }
    } else {
        if (gameOn && pressSpace) {
            mario.setVelocity(mario.body.velocity.x, mario.body.velocity.y + gravity);
            gameTime -= 0.1;
            if (gameTime <= 0) {
                pressSpace = false;
            }
        }
        camera.scrollX = mario.x - 400;
        if (!gameOn && startGame) {
            this.add.text(380, 270, "MARIO", { fontSize: '110px', fill: '#ff0000' });
            this.add.text(380, 330, "Press Space to Start", { fontSize: '30px', fill: '#ff0000' });
        }
        if (gameOn) {
            if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.R)) {
                gameOn = true;
                startGame = true;
            }
        }
        for (let floor of floors) {
            floor.setVisible(true);
        }
        if (this.physics.overlap(mario, [marioBullets, smashers, plants, fireb, bowser]) || gameTime <= 0) {
            gameOn = false;
            startGame = false;
            gameOver = true;
            this.gameOverSound.play();
        }
        if (gameOver) {
            this.add.text(mario.x + 300, 100, "Game Over", { fontSize: '150px', fill: '#ff0000' });
            this.add.text(mario.x + 300, 300, "Press R to Restart!", { fontSize: '50px', fill: '#ff0000' });
        }
        handleMarioXMovement();
        handleWall();
        handlePlantMovement();
        handleBowserMovement();
        moveSmasher();
        handleCoins();
        handlePowerboxes();
        if (countdown > 0) {
            countdown -= 1;
        }
        if (countdown === 0) {
            mario.setDisplaySize(30, 60);
        }
        moveBullets();
        jump();
        moveFloors();
        touchingTubes();
        touchingLongBlocks();
        touchingCastle();
        if (win) {
            this.add.text(5500, 300, "You Saved the Princess!", { fontSize: '50px', fill: '#ff0000' });
            gameTime = 1;
            mario.setVelocity(0, 0);
            this.winSound.play();
            gameOver = false;
        }
        fireballGeneration();
        marioFireball();
        this.physics.world.collide(mario, wall);
        handlingLevels();
        TESTER.run_game();
        for (let negFloor of negativeFloors) {
            negFloor.setVisible(true);
        }
        for (let floor of floors) {
            floor.setVisible(true);
        }
        for (let obj of [powerBox2, powerBox1, tube1, tube2, tube3, tube4, tube5, marioBullets[0], marioBullets[1], marioBullets[2], marioBullets[3], marioBullets[4], longBlock1, longBlock2, longBlock3, plant1, plant2, plant3, smasher1, smasher2, smasher3, smasher4, powerBox3, fireb, shooter, bowser, healthBar, castle, peach, healthText, ...stairBlocks]) {
            obj.setVisible(true);
        }
    }
    camera.setBackgroundColor('skyblue');
}

this.time.addEvent({
    delay: 33,
    callback: tick,
    callbackScope: this,
    loop: true
});

function update() {
}
