import { intervalsIntersect } from './helper';
class Obstacle {
    constructor(game, x1 = 0, y1 = 0, x2 = 100, y2 = 100, color = "orange", width = 1) {
        this.game = game;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.draw = this.draw.bind(this);
        this.move = this.move.bind(this);
        let z = Math.sqrt((y1 - y2) ** 2 + (x2 - x1) ** 2)
        this.normal = [(y1 - y2) / z, (x2 - x1) / z];
        this.bounce = this.bounce.bind(this);
        this.checkForBall = this.checkForBall.bind(this);
        this.width = width;
    }

    bounce() {
        let ball = this.game.ball;
        let normal = this.normal;
        let vDotNormal = ball.vx * normal[0] + ball.vy * normal[1];
        let new_vx = ball.vx - 2 * vDotNormal * normal[0];
        let new_vy = ball.vy - 2 * vDotNormal * normal[1];
        ball.vx = new_vx;
        ball.vy = new_vy;
    }

    checkForBall() {
        let ball = this.game.ball;
        let { x1, x2, y1, y2 } = this;
        let normal = [y1 - y2, x2 - x1]
        let { x, y, radius, vx, vy } = ball;
        let perpComponent = normal[0] * (x - x1) + normal[1] * (y - y1);
        let nextPerpComponent = normal[0] * (x + vx - x1) + normal[1] * (y + vy - y1);
        return perpComponent * nextPerpComponent <= 0
            && intervalsIntersect([x, x + vx], [x1, x2])
            && intervalsIntersect([y, y + vy], [y1, y2]);
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, viewport) {
        let { x1, y1 } = viewport;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x1 - x1, this.y1 - y1);
        ctx.lineTo(this.x2 - x1, this.y2 - y1);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.lineWidth = 1;
    };
}

export default Obstacle;