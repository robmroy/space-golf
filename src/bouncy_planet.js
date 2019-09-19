
class BouncyPlanet {
    constructor(game, x = 0, y = 0, radius = 10, color = "pink", density,
        bounce_coeff, vx = 0, vy = 0) {
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
        this.sticky = false;
        this.bounce_coeff = bounce_coeff || .9;
    }

    bounce(normal) {
        let ball = this.game.ball;
        const dampen = vel => 1 - Math.exp(-.5 * Math.abs(vel));
        let vDotNormal = ball.vx * normal[0] + ball.vy * normal[1];
        let new_vx = this.bounce_coeff * (dampen(ball.vx)) * (ball.vx - 2 * vDotNormal * normal[0]);
        let new_vy = this.bounce_coeff * (dampen(ball.vy)) * (ball.vy - 2 * vDotNormal * normal[1]);
        ball.vx = new_vx;
        ball.vy = new_vy;
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

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.x, this.y, this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.font = `${21}px Arial`;
        ctx.fillText(`Density: ${this.density}`,
            `${this.x - this.radius - 10}`,
            `${this.y + this.radius + this.game.ball.radius * 2 + 18}`);
        ctx.fill();
    };
}

export default BouncyPlanet;