import fastRandom from 'fast-random';

class Stars {
    constructor(level, levelNum){
        this.topLeft = {x: level.corners[0]-600, y: level.corners[0]-300};
        this.bottomRight = {x: level.corners[1]+600, y: level.corners[1]+300};
        this.blocks = {};
        this.starsPerBlock = 100;
        this.levelNum = levelNum;
    }

    generateBlock(xInThousands, yInThousands){
        let x = xInThousands;
        let y = yInThousands;
        const seed = 1000*x + y + this.levelNum * 10000;
        const frandom = fastRandom(seed);
        const stars = new Array(this.starsPerBlock);
        for (let i=0; i< stars.length; i++){
            stars[i] = [
                1000*(x + frandom.nextFloat()), 
                1000*(y+frandom.nextFloat()), 
                .3 + .8 * (frandom.nextFloat())**9]
        }
        this.blocks[`${x}, ${y}`] = stars;
    }

    drawBlock(ctx, xInThousands, yInThousands, viewport){
        let stars = this.blocks[`${xInThousands}, ${yInThousands}`];
        ctx.fillStyle = "white";
        for (let i=0; i< stars.length; i++){
            let [x, y, r] = stars[i];
            ctx.beginPath();
            
            ctx.arc(
              x - viewport.x1, y - viewport.y1, r, 0, 2 * Math.PI, true
            );
            ctx.fill();
        }
    }

    getBlock(x, y){
        return this.blocks[`${x}, ${y}`];
    }

    
}

export default Stars;