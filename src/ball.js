
class Ball {
    constructor(game, x = 0, y = 0, radius = 5, color = "white", vx=0, vy=0){
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
        this.logging = false;
    }
    
    move(){
        if(this.logging){
            console.log(`ballx is ${this.x}`);
            console.log(`bally is ${this.y}`);
        }
        if (this.game.hole.checkForWin()){
            this.stopped = true;
        }
        if (!this.stopped){
            this.x += this.vx;
            this.y += this.vy;
            this.vx += this.ax;
            this.vy +=this.ay;
            // console.log(`vy is ${this.vy}`);
            // console.log(`ay is ${this.ay}`);
            

            if (Math.abs(this.vx) + Math.abs(this.vy) < 0.4
            && Math.abs(this.ax) + Math.abs(this.ay) <0.1){
                this.stopped = true;}
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
                  if (planet.sticky || Math.abs(this.vx) + Math.abs(this.vy)<1 ){this.stopped = true;}
                  else{planet.bounce(normal);}
                    
                }
                else{
                this.ax -= (1/dz2)*planet.mass * dx/dz * .2;
                this.ay -= (1/dz2)*planet.mass * dy/dz * .2;
                } 
        });
        this.game.obstacles.forEach(obstacle => {
            if (obstacle.checkForBall()){
                obstacle.bounce();
            }
        })
    };
    
    }
    draw(ctx ) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          this.x, this.y, this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
      };
}

export default Ball;