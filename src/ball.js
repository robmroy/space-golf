import LaunchPad from "./launchpad";
class Ball {
    constructor(game, x = 0, y = 0, radius = 5, playSpeed = 1, color = "white", vx=0, vy=0){
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.draw= this.draw.bind(this);
        this.move = this.move.bind(this);
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
        this.ay = 0;
        this.stopped = true;
        this.prevx =x ;
        this.prevy = y;
        this.drawX = x;
        this.drawY = y;
        this.interpolateX = x;
        this.interpolateY = y;
    }

    vpX(){
        return this.game.vp.displayPos(this).x;
    }
    vpY(){
        return this.game.vp.displayPos(this).y;
    }

    setAuxPositions(){
        const playSpeed = this.game.playSpeed;
        const vp = this.game.vp;
        if (playSpeed.fractional && playSpeed.num > 1){
            const num = playSpeed.num;
            const residue = this.game.frameCount % num;
            this.interpolateX =   (residue/num) * this.x + (1 - residue/num) * this.prevx;
            this.interpolateY = (residue/num) * this.y + (1 - residue/num) * this.prevy; 
        }
        else {
            this.interpolateX = this.x;
            this.interpolateY = this.y ;
        }
        this.drawX = this.interpolateX - vp.x1;
         this.drawY = this.interpolateY - vp.y1;
    }
    
    checkRectangle(corners){
        const {x, y} = this;
        return x > corners[0][0] && x < corners[1][0] && y > corners[0][1] && y < corners[1][1];
    }

    // setPlaySpeed(event){
    //     if (event.keyCode === 70 && this.playSpeed < 4 ){
    //         this.playSpeed += .2;
    //     }
    //     if (event.keyCode === 83 && this.playSpeed >= .4) {
    //         this.playSpeed -= .2;
    //     } 
    //     this.accelCorrection = this.playSpeed ** (-.88);
    // }
    stop(){
        this.stopped = true;
        this.vx = 0;
        this.vy = 0;
    }
    move(){
        if(this.logging){
            console.log(`ballx is ${this.x}`);
            console.log(`bally is ${this.y}`);
        }

        this.prevx = this.x;
        this.prevy = this.y;
        if (this.stopped) return;
        // this.x += this.playSpeed*this.vx;
        // this.y += this.playSpeed* this.vy;
        // this.vx += this.accelCorrection * this.playSpeed**2 * this.ax;
        // this.vy += this.accelCorrection * this.playSpeed**2 * this.ay;
        this.x += this.vx;
        this.y +=  this.vy;
        this.vx +=  this.ax;
        this.vy +=  this.ay;
        
        // if (Math.abs(this.vx) + Math.abs(this.vy) < 0.4
        // && Math.abs(this.ax) + Math.abs(this.ay) <0.1){
        //     this.stop();}

        this.ax = 0;
        this.ay = 0;
            
        this.game.planets.forEach(planet => {
            const {dx, dy, dz2, dz, normal} = planet.ballData();
            if (dz <=  this.radius + planet.radius){
                let error = this.radius + planet.radius - dz;
                this.x += error * normal[0];
                this.y += error * normal[1];
                this.ax = 0;
                this.ay = 0;
                if (planet.sticky || Math.abs(this.vx) + Math.abs(this.vy)<1 ){
                    this.stop();
                this.game.currentPlanet = planet;
                this.game.launchPad = new LaunchPad(this.game, this.x, this.y, normal, planet.maxTheta );
                this.game.setupLaunchPad();
            }
                else{planet.bounce(normal);}
                
            }
            else{
            this.ax -= (1/dz2)*planet.mass * dx/dz * .2;
            this.ay -= (1/dz2)*planet.mass * dy/dz * .2;
            } 
        });
        const game = this.game;
        game.obstacles.forEach(obstacle => {
            if (obstacle.checkForBall()){
                obstacle.bounce();
            }
        })
        if (game.hole.checkForWin()){
            this.stop();
            if(game.currentLevelNumber >= game.levels.length - 1){
                this.won = true;}
                else{
                game.initiateLevel();
                game.playSpeed = {num: 1, fractional: false};
                }
        }
    
    
    }
    draw(ctx, r = this.radius ) {
        this.setAuxPositions();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          this.drawX, this.drawY, r, 0, 2 * Math.PI, true
        );
        ctx.fill();
      };
}

export default Ball;