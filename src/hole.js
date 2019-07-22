class Hole {
    constructor(game, x = 600, y = 500, width = 100,  flagColor = "red"){
       this.game = game;
       this.x = x;
       this.y = y;
       this.width = width;
       this.flagColor = flagColor;
       this.drawFlag= this.drawFlag.bind(this);
       this.drawHole= this.drawHole.bind(this);
       this.move = this.move.bind(this);
       this.launchVx = 0;
       this.launchVy=0;
       this.checkForWin=this.checkForWin.bind(this);
   }
 
   move(){
       this.x += this.vx;
       this.y += this.vy;
   }
   drawFlag(ctx ) {
       let x = this.x;
       let y = this.y;
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
     drawHole(ctx) {
         let {x, y, width} = this;
         let ball = this.game.ball;
         if (ball.y - ball.radius <= y +20 && ball.vy > 0){
             ctx.beginPath();
             ctx.fillStyle = "black";
             ctx.moveTo(x - width/2, y);
             ctx.lineTo(x + width/2, y);
             ctx.lineTo(x + width/2, y + 30);
             ctx.lineTo(x - width/2, y + 30);
             ctx.lineTo(x - width/2, y );
             ctx.fill();
         }
         

         
        }
        checkForWin(){
            let {x, y, width} = this;
            let ball = this.game.ball;
            let result = ball.y -ball.radius> y 
            && ball.y-5*ball.radius < y
            && Math.abs(ball.x - x) < width/2
            && ball.vy >0;
            if (result){
                console.log('won, supposedly');
                this.game.initiateLevel();
            }
            return result;
        }
 
    
     
    }
 
    export default Hole;
 