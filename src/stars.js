import fastRandom from 'fast-random';

class Stars {
    constructor(game, level, levelNum) {
        this.topLeft = { x: level.corners[0] - 600, y: level.corners[0] - 300 };
        this.bottomRight = { x: level.corners[1] + 600, y: level.corners[1] + 300 };
        this.blocks = {};
        this.starsPerBlock = 300;
        this.levelNum = levelNum;
        this.game = game;
    }

    generateBlock(xInThousands, yInThousands) {
        let x = xInThousands;
        let y = yInThousands;
        const seed = 1000 * x + y + this.levelNum * 10000;
        const frandom = fastRandom(seed);
        const stars = new Array(this.starsPerBlock);
        for (let i = 0; i < stars.length; i++) {
            stars[i] = [
                1000 * (x + frandom.nextFloat()),
                1000 * (y + frandom.nextFloat()),
                .08 + .8*(frandom.nextFloat()) ** 2]
        }
        this.blocks[`${x}, ${y}`] = stars;
    }

    drawBlock(ctx, xInThousands, yInThousands, vp, color = "white") {
        let stars = this.blocks[`${xInThousands}, ${yInThousands}`];
        ctx.fillStyle = color;
        for (let i = 0; i < stars.length; i++) {
            let [x, y, r] = stars[i];
            if(r * vp.zoom < .3) continue;
            ctx.beginPath();

            ctx.arc(
                (x - vp.x1)*vp.zoom, (y - vp.y1)*vp.zoom, r*vp.zoom, 0, 2 * Math.PI, true
            );
            ctx.fill();
        }
    }

    getBlock(x, y) {
        return this.blocks[`${x}, ${y}`];
    }

    draw(ctx, color) {
        let vp = this.game.vp;
        for (let i = Math.floor(vp.x1 / 1000); i <= Math.ceil(vp.x2 / 1000); i++) {
            for (let j = Math.floor(vp.y1 / 1000); j <= Math.ceil(vp.y2 / 1000); j++) {
                if (!this.getBlock(i, j)) {
                    this.generateBlock(i, j)
                }
                this.drawBlock(ctx, i, j, vp, color);
            }
        }
    }

}

export default Stars;