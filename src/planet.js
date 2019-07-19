
class Planet {
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
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
    }
    draw(ctx ) {
        ctx.fillStyle = this.color;
        console.log(`in ball, ctx.fillstyle is ${ctx.fillStyle}`);
        ctx.beginPath();
        ctx.arc(
          this.x, this.y, this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
      };
}

export default Planet;