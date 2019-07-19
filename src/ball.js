
class Ball {
    constructor(game, x = 0, y = 0, radius = 5, color = "white"){
        this.x = x;
        this.y = y;
        this.radius = radius;
        console.log('constructing ball');
    }

    draw(ctx ) {
        ctx.fillStyle = this.color;
      
        ctx.beginPath();
        ctx.arc(
          this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
      };
}

export default Ball;