export default class Ball extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, paddleL, paddleR){
        
        super(scene, x, y, texture);
        
        this.scene = scene;
        this.setScale(25,25);
        
        this.setPosition(
        
            this.scene.game.config.width*0.5,
            this.scene.game.config.height*0.5
            
        );
        
        this.direction = {
            
            x: -1 + Math.random() * 2,
            y: -1 + Math.random() * 2
        
        }
        
        this.initialVelocity = 2;
        
        this.velocity = 2;
        this.accel = 0.025;
        
        this.paddleL = paddleL;
        this.paddleR = paddleR;
        
        this.halfSize = this.displayWidth*0.5;

        this.balls = 10;

    }
    
    setPaddles(paddleL, paddleR){
        
        this.paddleL = paddleL;
        this.paddleL = paddleR;       
        
    }
    
    moveball(){
        
        if (Math.abs(this.velocity)<=25) {
            this.velocity += this.accel;
        }
        
        this.x += this.velocity * this.direction.x;
        this.y += this.velocity * this.direction.y;
        
    }
    
    checkCollisions() {
        
        let myBounds = this.getBounds();
        let boundsL = this.paddleL.getBounds();
        let boundsR = this.paddleR.getBounds();
        
        if(Phaser.Geom.Intersects.RectangleToRectangle(myBounds, boundsL) || Phaser.Geom.Intersects.RectangleToRectangle(myBounds, boundsR)){
            
            this.reverseMe('x');
            
        }
        
        if(this.y <= this.halfSize || this.y >= this.scene.game.config.height - this.halfSize){
            
            this.reverseMe('y');
            
        }
        
    }
    
    checkScoreAndReset(){
        
        if(this.x <= 80){
            this.balls--;
            this.scene.scoreKeeper('right');
            this.resetMe();
        }
        if(this.x >= this.scene.game.config.width-80){
            this.balls--;
            this.scene.scoreKeeper('left');
            this.resetMe();            
        }
        
        if (this.balls<=0) {
            this.velocity=0;
            this.accel=0;
            this.resetMe();
        }
    }
    
    reverseMe(axis){
        
        this.direction[axis] = -this.direction[axis];
        /*
        if(axis == 'x'){
        this.direction.x= - this.direction.x;
        }
        if(axis == 'y'){
        this.direction.y= - this.direction.y;
        }
        */
    }
    
    resetMe(){
        this.setPosition(
        
            this.scene.game.config.width*0.5,
            this.scene.game.config.height*0.5
            
        );
          
        this.direction = {
            
            x: -1 + Math.random() * 2,
            y: -1 + Math.random() * 2
        
        }
        
        this.velocity = this.initialVelocity;
        
    }
    
    update(time) {
        
        this.checkCollisions();
        
        this.moveball();
        
        this.checkScoreAndReset();
        
        
    }
    
}