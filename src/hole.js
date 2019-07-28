import {intervalsIntersect} from './helper';
class Hole {
    constructor(game, x, y, normal = [0,1], width = 100){
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
 
   move(){
       this.x += this.vx;
       this.y += this.vy;
   }

   drawFlag(ctx, x = this.x, y = this.y ) {
       ctx.setLineDash([]);
      ctx.beginPath();
      ctx.strokeStyle = "gold";
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 50)
       ctx.stroke();
       ctx.fillStyle = "red";
       ctx.moveTo(x, y-50);
       ctx.lineTo(x,y-70);
       ctx.lineTo(x+ 25, y-60);
       ctx.lineTo(x, y-50);
       ctx.fill();
     }
     drawHole(ctx, x = this.x, y = this.y) {
         let {width} = this;
         let ball = this.game.ball;
             ctx.beginPath();
             ctx.strokeStyle = "purple";
             ctx.moveTo(x - width/2, y);
             ctx.lineTo(x + width/2, y);
             ctx.stroke();
             ctx.beginPath();
             ctx.fillStyle = "black";
             ctx.moveTo(x + width/2, y);
             ctx.lineTo(x + width/2, y + 30);
             ctx.lineTo(x - width/2, y + 30);
             ctx.lineTo(x - width/2, y );
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

            let perpComponent = normal[0] * (ball.x - x) + normal[1]*(ball.y-y);
            let nextPerpComponent = normal[0] * (ball.x + ball.vx - x) + normal[1]*(ball.y+ball.vy-y);
            return perpComponent * nextPerpComponent <= 0 
            && intervalsIntersect([ball.x, ball.x+ball.vx], [x - 0.5 * width* normal[1], x+ 0.5* width * normal[1]]) 
            && intervalsIntersect([ball.y, ball.y+ball.vy], [y - 0.5 * width* normal[0], y + 0.5 * width * normal[0]]);
        }
 
    
     
    }
 
    export default Hole;
 