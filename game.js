const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 800,
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

function preload() {
    this.load.image('background', 'wp7619435.png'); 
    this.load.spritesheet('mario', 'Mario.2.png', { frameWidth: 30, frameHeight: 60 }); 
}

let mario;
let cursors;

function create() {
    this.add.image(800, 200, 'background'); 
    
    mario = this.physics.add.sprite(70, 750, 'mario'); 
    mario.setBounce(0.2);
    mario.setCollideWorldBounds(true);

    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        mario.setVelocityX(-160);
        mario.anims.play('left', true);
        mario.setFlipX(true); 
    } else if (cursors.right.isDown) {
        mario.setVelocityX(160);
        mario.anims.play('right', true);
        mario.setFlipX(false); 
    } else {
        mario.setVelocityX(0);
        mario.anims.stop();
    }

    if (cursors.up.isDown && mario.body.touching.down) {
        mario.setVelocityY(-330);
    }
}
