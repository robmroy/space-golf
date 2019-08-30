class LevelDisplay{
    constructor(level, x, y, scale = .3){
        this.level = level;
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    draw(ctx){
        const {obstacles, ball, planets, hole} = this.level;
        const orbs = [ball].concat(planets);
        orbs.forEach(orb => {
        ctx.beginPath();
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(
          this.scale*orb.x+this.x, 
          this.scale*orb.y + this.y, 
          this.scale*orb.radius, 
          0, 2 * Math.PI, true
        );
        ctx.fill();
        }
        );
        ctx.setLineDash([]);
        obstacles.forEach(obst => {
        ctx.beginPath();
        ctx.moveTo(this.scale * obst.x1 + this.x, this.scale * obst.y1 + this.y);
        ctx.lineTo(this.scale * obst.x2 + this.x, this.scale * obst.y2 + this.y);
        ctx.strokeStyle = obst.color;
        ctx.stroke();
        })
        hole.drawFlag(ctx, this.scale*hole.x + this.x, this.scale*hole.y + this.y, this.scale);
        hole.drawHole(ctx, this.scale*hole.x + this.x, this.scale*hole.y + this.y, this.scale);

    }

}

export default LevelDisplay;