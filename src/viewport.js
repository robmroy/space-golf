class Viewport {
    constructor(level, x1 = 0, y1 = 0, x2 = 1200 + x1, y2 = 600 + y1, zoom = 1) {
        this.x1 = level.viewportX1 || x1;
        this.y1 = level.viewportY1 || y1;
        this.x2 = level.viewportX2 || x2;
        this.y2 = level.viewportY2 || y2;
        this.zoom = level.viewportZoom || zoom;
        this.setMovementStart = this.setMovementStartPoints.bind(this);
        this.moveWithBall = this.moveWithBall.bind(this);
        this.style = level.viewportStyle;

    }
    setMovementStartPoints(up, right, down, left) {
        this.startUp = up || 0;
        this.startRight = right || 1100;
        this.startDown = down || 530;
        this.startLeft = left || 0;
    }
    moveWithBall(ballX, ballY, ball) {
        if (this.style === "stopped") { return; }

        let { x1, y1, zoom } = this;
        let x2 = x1 + 1200 * zoom;
        let y2 = y1 + 600 * zoom;

        if (ballX > x2 - 100 || ballX < x1 + 100 || ballY <y1 + 50 || ballY > y2 - 50){
            this.style = 'panning';
        }
        if (this.style === 'panning') { return this.panToBall(ball); }
        if (this.style === 'centered') { return this.moveCentered(ballX, ballY); }
        let ballOvershoot = { x: ballX - .5 * (x1 + x2), y: ballY - .5 * (y1 + y2) };
            const catchupX =
                Math.abs(ballOvershoot.x) < Math.abs(1.4 * ball.vx) ?
                    ballOvershoot.x : 1.4 * ball.vx;
            this.x1 += catchupX;
            this.x2 += catchupX;
    
         
            const catchupY = Math.abs(ballOvershoot.y) < Math.abs(1.4 * ball.vy) ?
                ballOvershoot.y : 1.4 * ball.vy;
            this.y1 += catchupY;
            this.y2 += catchupY;
        
    }

    moveCentered(ballX, ballY) {
        this.x1 = ballX - 600  / this.zoom;
        this.x2 = ballX + 600  / this.zoom;
        this.y1 = ballY - 300  / this.zoom;
        this.y2 = ballY + 300  / this.zoom;
    }

    panToBall(ball){
        const ballX = ball.interpolateX;
        const ballY = ball.interpolateY;
        const prevBallX = ball.prevInterpolateX;
        const prevBallY = ball.prevInterpolateY;
        let panRate = this.zoom * 10;
        let prevDX = prevBallX - (this.x1 + 600* this.zoom);
        let prevDY = prevBallY - (this.y1 + 300* this.zoom);
        let newDX = null;
        let newDY = null;
            newDX = prevDX < 0 ? Math.min(prevDX + panRate, 0)
                : Math.max(prevDX - panRate, 0);
            newDY = prevDY < 0 ? Math.min(prevDY + panRate, 0)
                : Math.max(prevDY - panRate, 0);
        this.x1 += ballX - prevBallX +prevDX - newDX;
        this.y1 += ballY - prevBallY +prevDY - newDY;   
        if (newDX === 0 && newDY === 0 ){this.style = "centered";}     
    }

    displayPos(pojo) {
        return { x: pojo.x - this.x1, y: pojo.y - this.y1 }
    }
}

export default Viewport;