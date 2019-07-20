
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
        this.stopped = true;
        this.logging = false;
    }

    move(){
        if(this.logging){
            console.log(`ballx is ${this.x}`);
            console.log(`bally is ${this.y}`);
        }
        if (!this.stopped){

            this.x += this.vx;
            this.y += this.vy;
            this.game.planets.forEach(planet => {
                const dx = this.x - planet.x;
                const dy = this.y - planet.y;
                const dz2 = ((dx)**2 + (dy)**2);
                const dz = Math.sqrt(dz2);
        
                if (dz <=  this.radius + planet.radius){
                  this.stopped = true;
                }
                else{
                this.vx -= (1/dz2)*planet.mass * dx/dz * .7;
                this.vy -= (1/dz2)*planet.mass * dy/dz * .7;
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