
class StickyPlanet {
  constructor(game, x = 0, y = 0, radius = 10, color = "grey", density, maxTheta = Math.PI / 2, vx = 0, vy = 0) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.vx = vx;
    this.vy = vy;
    this.density = density || 1;
    this.mass = this.density * this.radius ** 3;
    this.sticky = true;
    this.hideText = false;
    this.maxTheta = maxTheta;
    this.textPos = { x: x + radius + 2, y: y + radius + .5 };
  }

  vpX() {
    return this.game.vp.displayPos(this).x;
  }

  vpY() {
    return this.game.vp.displayPos(this).y;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  ballData() {
    const ball = this.game.ball;
    const dx = ball.x - this.x;
    const dy = ball.y - this.y;
    const dz2 = ((dx) ** 2 + (dy) ** 2);
    const dz = Math.sqrt(dz2);
    const normal = [dx / dz, dy / dz];
    return { dx, dy, dz2, dz, normal }
  }

  draw(ctx, vp) {
    let x = (this.x - vp.x1)*vp.zoom;
    let y = (this.y - vp.y1)*vp.zoom;
    let r = this.radius * vp.zoom;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      x, y, r, 0, 2 * Math.PI, true
    );
    ctx.font = `${Math.floor(.9 * r)}px Arial`;
    ctx.fill();
    if (!this.hideText) {
      ctx.beginPath();
      ctx.fillStyle = "#3e78ad"
      ctx.font = `${14}px Arial`;
      ctx.fillText(`Escape vel. ${(this.radius * this.density ** .45 * .504).toFixed(2)}`,
        `${x + r + 2}`,
        `${y + .5 * r + this.game.ball.radius}`);
    };
  }
}

export default StickyPlanet;