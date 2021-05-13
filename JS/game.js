import MainScene from './scene.js';

const config = {
    
    Width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'GameStop',
    scene: [MainScene],
    backgroundColor: '#345',
    pixelArt: true
}

new Phaser.Game(config);