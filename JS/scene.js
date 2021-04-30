import Paddle from './paddle.js';
import Paddle from './ball.js';
export default class MainScene extends Phaser.Scene {
    
    
    constructor(){
        
        super('MainScene')
        
    }
    
    init()
    {
        
        this.paddleOffsetX = 80;
        
        this.score = {
            left:0,
            right:0
        }
        
    }
    
    preload()
    {
        this.paddleIMG = this.load.image('paddle', './images/paddle.png');
        this.ballIMG = this.load.image('ball', './images/ball.png');
        
    }
    
    create()
    {
        
        this.paddleL = this.add.existing(
            new Paddle(this, this.paddleOffsetX, this.gameconfig.height * 0.5, 'paddle', { 'up':87, 'down': 83})
        );
        this.paddleL.init();
        
        
        this.paddleR = this.add.existing(
            new Paddle(this, this.gameconfig.width - this.paddleOffsetX, this.gameconfig.height * 0.5, 'paddle', { 'up':69, 'down': 68})
        );
        this.paddleR.init();
        
        this.ball = this.add.existing(
            new Ball(
            
            this, 0, 0,
            'ball', 
            this.paddleL, this.paddleR
                
            )
        );
        
        this.add.text( this.game.config.width * 0.5, 80,`${this.score.left} - ${this.score.right}`,{
            
            fontFamily: 'Arial', 
            fontSize: 32,
            color: '#fff', 
            align: 'center'
            
        }).setOrigin(0.5)
        
    }
    
    ScoreKeeper(paddle) {
        /*
        if (paddle == 'left') {
            
            this.score.left += 1;
            
        }
        else if (paddle == 'right') {
            
            this.score.right += 1;
            
        }
        */
        
        this.score[paddle] += 1;
        
    }
    
    update(time)
    {
        
        this.paddleL.update(time);
        this.paddleR.update(time);
        this.ball.update(time);
        
        this.scoreText.text = `${this.score.left} - ${this.score.right}`;
    }
    
}