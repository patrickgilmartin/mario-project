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
    this.add.image(640, 400, 'background'); 
    
    mario = this.physics.add.sprite(70, 750, 'mario');
    mario.setBounce(0.2);
    mario.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        mario.setVelocityX(-160);
        mario.setFlipX(true);
    } else if (cursors.right.isDown) {
        mario.setVelocityX(160);
        mario.setFlipX(false);
    } else {
        mario.setVelocityX(0);
    }

    if (cursors.up.isDown && mario.body.touching.down) {
        mario.setVelocityY(-330);
    }
}
