import { intervalsIntersect } from './helper';
import TimedMessage from './timedMessage';
class Hole {
    constructor(game, x, y, normal = [0, -1], width = 100, scale = 1) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.drawFlag = this.drawFlag.bind(this);
        this.drawHole = this.drawHole.bind(this);
        this.normal = normal;
        this.drawFlag = this.drawFlag.bind(this);
        this.drawHole = this.drawHole.bind(this);
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

    drawFlag(ctx, vp) {
        let x = (this.x - vp.x1)*vp.zoom;
        let y = (this.y - vp.y1)*vp.zoom;
        let normal = this.normal;
        let a = vp.zoom;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.strokeStyle = "gold";
        ctx.moveTo(x, y);
        ctx.lineTo(x + a * 50 * normal[0], y + a * 50 * normal[1])
        ctx.stroke();
        ctx.fillStyle = "#db0711";
        ctx.moveTo(x + a * 50 * normal[0], y + a * 50 * normal[1]);
        ctx.lineTo(x + a * 70 * normal[0], y + a * 70 * normal[1]);
        ctx.lineTo(x + a * 60 * normal[0] - a * 30 * normal[1], y + a * 60 * normal[1] + a * 30 * normal[0]);
        ctx.lineTo(x + a * 50 * normal[0], y + a * 50 * normal[1]);
        ctx.fill();
    }

    drawHole(ctx,  vp) {
        let x = (this.x - vp.x1)*vp.zoom;
        let y = (this.y - vp.y1)*vp.zoom;
        let { width, normal } = this;
        let a = vp.zoom;
        ctx.beginPath();
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 2;
        ctx.moveTo(x - a * normal[1] * width / 2, y + a * normal[0] * width / 2);
        ctx.lineTo(x + a * normal[1] * width / 2, y - a * normal[0] * width / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
    }

    drawHoleWithBound(ctx, vp, leftBound){
        let x = (this.x - vp.x1)*vp.zoom;
        let y = (this.y - vp.y1)*vp.zoom;
        let { width, normal } = this;
        let a = vp.zoom;
        ctx.beginPath();
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 2;
        ctx.moveTo(Math.max(leftBound, x - a * normal[1] * width / 2), y + a * normal[0] * width / 2);
        ctx.lineTo(Math.max(leftBound, x + a * normal[1] * width / 2), y - a * normal[0] * width / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
    }
    checkForWin() {
        let { x, y, width, normal } = this;
        let ball = this.game.ball;
        let messages = this.game.timedMessages;

        let prevPerpComponent = normal[0] * (ball.prevx - x) + normal[1] * (ball.prevy - y);
        let perpComponent = normal[0] * (ball.x - x) + normal[1] * (ball.y - y);
        if (intervalsIntersect([ball.prevx, ball.x], [x - 0.5 * width * normal[1], x + 0.5 * width * normal[1]])
            && intervalsIntersect([ball.prevy, ball.y], [y - 0.5 * width * normal[0], y + 0.5 * width * normal[0]])
        ) {
            if (prevPerpComponent >= 0 && perpComponent <= 0) {
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].text === "WRONG WAY") {
                        messages[i] = new TimedMessage("oh nice", 14, "#9e8720", '18px Arial', this.x + 50, this.y + 100);
                    }
                }
                return true;
            }
            if (prevPerpComponent < 0 && perpComponent > 0) {
                messages.push(
                    new TimedMessage("WRONG WAY", 80, "#9c1c22", '28px Trebuchet MS', this.x, this.y + 70)
                );
            }
        }
        return false;
    }
}

export default Hole;
