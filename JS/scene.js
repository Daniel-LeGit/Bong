import Paddle from './paddle.js';
import Ball from './ball.js';
export default class MainScene extends Phaser.Scene {
    
    
    constructor(){
        
        super('MainScene');
        
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
        this.paddleIMG = this.load.image('paddle', './IMGS/paddle.png');
        this.ballIMG = this.load.image('ball', './IMGS/ball.png');
        
    }
    
    create()
    {
        
        this.paddleL = this.add.existing(
            new Paddle(this, this.paddleOffsetX, this.game.config.height * 0.5, 'paddle', { 'up':87, 'down': 83})
        );
        this.paddleL.init();
        
        
        this.paddleR = this.add.existing(
            new Paddle(this, this.game.config.width - this.paddleOffsetX, this.game.config.height * 0.5, 'paddle', { 'up':69, 'down': 68})
        );
        this.paddleR.init();
        
        this.ball = this.add.existing(
            new Ball(
            
            this, 0, 0,
            'ball', 
            this.paddleL, this.paddleR
                
            )
        );
        
        this.scoreText=
        this.add.text( this.game.config.width * 0.5, 80,`${this.score.left} - ${this.score.right}`,{
            
            fontFamily: 'Arial', 
            fontSize: 32,
            color: '#fff', 
            align: 'center'
            
        }).setOrigin(0.5)

        this.ballsText=
        this.add.text( this.game.config.width * 0.5, 120,`${this.ball.balls} balls left`,{
            
            fontFamily: 'Arial', 
            fontSize: 32,
            color: '#fff', 
            align: 'center'
            
        }).setOrigin(0.5)
        
    }
    
    scoreKeeper(paddle) {
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
        
        if (this.ball.balls<=0){
            if (this.score.left>this.score.right) {
                this.scoreText.text = 'Left Player Wins';
            }
            if (this.score.left<this.score.right) {
                this.scoreText.text = 'Right Player Wins';
            }
            if (this.score.left==this.score.right) {
                this.scoreText.text = 'No Player Wins';
            }
            this.ballsText.text = '0 balls left';
        } else {
            this.scoreText.text = `${this.score.left} - ${this.score.right}`;
            this.ballsText.text = `${this.ball.balls} balls left`;
        }

    }
    
}