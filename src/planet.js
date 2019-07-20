
class Planet {
    constructor(game, x = 0, y = 0, radius = 10, color = "grey", density, vx=0, vy=0){
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.draw= this.draw.bind(this);
        this.move = this.move.bind(this);
        this.vx = vx;
        this.vy = vy;
        this.density = density || 1;
        this.mass = this.density * this.radius**3;
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
    }
    draw(ctx ) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          this.x, this.y, this.radius, 0, 2 * Math.PI, true
        );
        ctx.font = `${Math.floor(.9 * this.radius)}px Arial`;
        ctx.fillText(`Density: ${this.density}`, 
        `${this.x - 1.9* this.radius}`,
         `${this.y + 2* this.radius}`);
        ctx.fill();
      };
}

export default Planet;