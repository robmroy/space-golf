import {intervalsIntersect} from './helper';
class Hole {
    constructor(game, x, y, normal = [0,-1], width = 100){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.drawFlag= this.drawFlag.bind(this);
        this.drawHole= this.drawHole.bind(this);
        this.normal = normal;
        this.drawFlag = this.drawFlag.bind(this);
        this.drawHole = this.drawHole.bind(this);
    }

    vpX(){
        return this.game.vp.displayPos(this).x;
    }
    vpY(){
        return this.game.vp.displayPos(this).y;
    }
 
   move(){
       this.x += this.vx;
       this.y += this.vy;
   }

   drawFlag(ctx, x = this.x, y = this.y ) {
       let normal = this.normal;
       ctx.setLineDash([]);
      ctx.beginPath();
      ctx.strokeStyle = "gold";
      ctx.moveTo(x, y);
      ctx.lineTo(x + 50* normal[0] , y + 50 * normal[1])
       ctx.stroke();
       ctx.fillStyle = "red";
       ctx.moveTo(x + 50* normal[0] , y + 50 * normal[1]);
       ctx.lineTo(x + 70* normal[0] , y + 70 * normal[1]);
       ctx.lineTo(x + 60* normal[0] - 20* normal[1], y + 60 * normal[1] + 20 * normal[0]);
       ctx.lineTo(x + 50* normal[0] , y + 50 * normal[1]);
       ctx.fill();
     }
     drawHole(ctx, x = this.x, y = this.y) {
         let {width, normal} = this;
         let ball = this.game.ball;
             ctx.beginPath();
             ctx.strokeStyle = "purple";
             ctx.moveTo(x - normal[1] * width/2 , y + normal[0] * width/2 );
             ctx.lineTo(x +  normal[1] * width/2, y - normal[0] * width/2);
             ctx.stroke();
             ctx.beginPath();
             ctx.fillStyle = "black";
             ctx.moveTo(x + normal[1] * width/2, y - normal[0] * width/2);
             ctx.lineTo(x + normal[1] * width/2 -30 * normal[0],
                 y - normal[0] * width/2 -30*normal[1]);
             ctx.lineTo(x - normal[1] * width/2 -30 * normal[0],
                y + normal[0] * width/2 -30*normal[1]);
            ctx.lineTo(x - normal[1] * width/2 ,
                y + normal[0] * width/2);
             ctx.lineTo(x + normal[1] * width/2, y - normal[0] * width/2 );
             ctx.fill();
         

        }
        checkForWin(){
            let {x, y, width, normal} = this;
            let ball = this.game.ball;
            // let result = ball.y -ball.radius> y 
            // && ball.y-2*ball.radius < y
            // && Math.abs(ball.x - x) < width/2
            // && ball.vy >0;
            
            // return result;

            let prevPerpComponent = normal[0] * (ball.prevx - x) + normal[1]*(ball.prevy-y);
            let perpComponent = normal[0] * (ball.x - x) + normal[1]*(ball.y-y);
            return prevPerpComponent < 0  && perpComponent > 0
            && intervalsIntersect([ ball.prevx, ball.x], [x - 0.5 * width* normal[1], x+ 0.5* width * normal[1]]) 
            && intervalsIntersect([ ball.prevy, ball.y], [y - 0.5 * width* normal[0], y + 0.5 * width* normal[0]]);
        }
 
    
     
    }
 
    export default Hole;
 