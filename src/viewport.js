class Viewport {
    constructor(x1 = 0, y1 =0, x2 = 1200, y2 = 600, zoom =100){
        this.x1 = x1;
        this.y1= y1;
        this.x2 = x2;
        this.y2 = y2;
        this.zoom = zoom;
        
    }

    moveWithBall(ball){
        let {x1, x2, y1, y2} = this;
        let ballOvershoot = {x: ball.x - .5*(x1+x2), y: ball.y - .5 *(y1+y2)};
        if (ballOvershoot.x  > 0 ){
            this.x1 += ballOvershoot.x;
            this.x2 += ballOvershoot.x;
        }
        if (ballOvershoot.y  > 0 ){
            this.y1 += ballOvershoot.y;
            this.y2 += ballOvershoot.y;
        }
    }
}

export default Viewport;