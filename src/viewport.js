class Viewport {
    constructor(x1 = 0, y1 =0, x2 = 1200 + x1, y2 = 600 + y1, zoom =100){
        this.x1 = x1;
        this.y1= y1;
        this.x2 = x2;
        this.y2 = y2;
        this.zoom = zoom;
        this.setMovementStart = this.setMovementStartPoints.bind(this);
        this.moveWithBall = this.moveWithBall.bind(this);
    }
    setMovementStartPoints(up, right, down, left){
        this.startUp = up || 0;
        this.startRight = right || 1100;
        this.startDown = down || 530;
        this.startLeft = left || 0;
    }
    moveWithBall(ballX, ballY, ball){
    
        let {x1, x2, y1, y2} = this;
        let ballOvershoot = {x: ballX - .5*(x1+x2), y: ballY - .5 *(y1+y2)};
        if (
            // ballOvershoot.x  > 0 &&
             ballX > this.startRight || ballX < this.startLeft){
            const catchupX = 
            Math.abs(ballOvershoot.x) < Math.abs(1.4 * ball.vx) ? 
            ballOvershoot.x : 1.4 * ball.vx;
            this.x1 += catchupX;
            this.x2 += catchupX;
        }
        if (
            // ballOvershoot.y  > 0 && 
            ballY > this.startDown || ballY < this.startUp
            ){
            const catchupY = Math.abs(ballOvershoot.y) <Math.abs(1.4 * ball.vy) ?
             ballOvershoot.y : 1.4 * ball.vy;
            this.y1 += catchupY;
            this.y2 += catchupY;
        }
    }

    displayPos(pojo){
        return {x: pojo.x - this.x1, y: pojo.y - this.y1 }
    }
}

export default Viewport;