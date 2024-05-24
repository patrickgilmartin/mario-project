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

function preload() {
    this.load.image('background', 'mario_game/wp7619435.png');
    this.load.spritesheet('mario', 'mario_game/Mario.2.png', { frameWidth: 30, frameHeight: 60 });

}

let mario;
let cursors;

function create() {
    this.add.image(400, 300, 'background');
    
    mario = this.physics.add.sprite(70, 550, 'mario');
    mario.setBounce(0.2);
    mario.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        mario.setVelocityX(-160);
        mario.setFlipX(true); // Flip sprite to face left
    } else if (cursors.right.isDown) {
        mario.setVelocityX(160);
        mario.setFlipX(false); // Ensure sprite faces right
    } else {
        mario.setVelocityX(0);
    }

    if (cursors.up.isDown && mario.body.touching.down) {
        mario.setVelocityY(-330);
    }
}
