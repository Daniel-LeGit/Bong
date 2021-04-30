import MainScene from './scene.js';

const config = {
    
    Width: 750,
    height: 500,
    type: phaser.AUTO,
    parent: 'GameStop',
    scene: [],
    backgroundColor: '#345',
    pixelArt: true
}

new Phaser.Game(config);