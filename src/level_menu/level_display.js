class LevelDisplay{
    constructor(level, x, y, scale){
        this.level = level;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.vp= {x1: -x/scale, y1: -y/scale, x2: x + scale*1200, y2: y +scale* 600,
        zoom: scale};
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
            if (obst.y1 <0 || obst.y2 <0 || obst.x1<0 || obst.x2 < 0){return;}
        ctx.beginPath();
        ctx.moveTo(this.scale * obst.x1 + this.x, this.scale * obst.y1 + this.y);
        ctx.lineTo(this.scale * obst.x2 + this.x, this.scale * obst.y2 + this.y);
        ctx.strokeStyle = obst.color;
        ctx.stroke();
        })
        hole.drawFlag(ctx, this.vp);
        hole.drawHoleWithBound(ctx, this.vp, this.x);

    }

}

export default LevelDisplay;