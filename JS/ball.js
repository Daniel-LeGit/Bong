export default class Ball extends Phaser.GameObject.Sprite {
    
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
        
        this.initialVelocity
        
        this.velocity = 2;
        this.accel = 0.025;
        
        this.paddleL = paddleL;
        this.paddleL = paddleR;
        
        this.halfSize = this.displayWidth*0.5;
    }
    
    setPaddles(paddleL, paddleR){
        
        this.paddleL = paddleL;
        this.paddleL = paddleR;       
        
    }
    
    moveball(){
        
        this.velocity += this.accel;
        
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
        
        if(x <= 0){
            
            this.scene.scoreKeeper('right');
            this.resetMe();
        }
        if(x >= this.scene.game.config.width){
            
            this.scene.scoreKeeper('left');
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
        this.game.config
        
        )
        
    }
    
    update(time) {
        
        this.checkCollisions();
        
        this.moveball();
        
        this.checkScoreAndReset();
        
        
    }
    
}