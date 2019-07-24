import {dottedArc, vectorAngle} from './helper';
const error = () => {let m = document.getElementById("game-canvas");
let rect = m.getBoundingClientRect();
return {x: rect.x, y: rect.y};
}

class LaunchPad {
   constructor(game, x = 0, y = 0, normal = [0,1], radius = 100,  color = "white"){
      this.game = game;
      this.x = x;
      this.y = y;
      this.normal = normal;
      this.radius = radius;
      this.color = color;
      this.draw= this.draw.bind(this);
      this.move = this.move.bind(this);
      this.launch = this.launch.bind(this);
      this.launchVx = 0;
      this.launchVy=0;
      this.normalAngle = vectorAngle(normal);
      this.setVelocity = this.setVelocity.bind(this);
      this.arrowTip = {x: null, y: null};
      this.arrowAngle = this.normalAngle;
  }

  move(){
      this.x += this.vx;
      this.y += this.vy;
  }
  draw(ctx ) {
   // ctx.beginPath();
   // ctx.strokeStyle = this.color;
   // ctx.arc(
   //   this.x, this.y, this.radius, 0,  Math.PI
   // );
   // ctx.stroke();
   //  
   dottedArc(ctx, this.x, this.y, this.radius, 
      this.normalAngle - Math.PI/2, this.normalAngle + Math.PI/2, this.color);
   if (this.arrowTip.x !== null){
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.setLineDash([5,5]);
     ctx.moveTo(this.x, this.y);
     ctx.lineTo(this.arrowTip.x, this.arrowTip.y)
     ctx.stroke();
     this.drawArrowBits(ctx);
     ctx.beginPath();
        ctx.fillStyle = "purple"
        ctx.font = `${21}px Arial`;
        ctx.fillText(`Initial speed: ${Math.sqrt(this.launchVx **2 + this.launchVy **2).toFixed(2)}`, 
        `${0.5 * (this.x + this.arrowTip.x)}`,
         `${0.5 * (this.y + this.arrowTip.y)}`);
        ctx.fill();
     
   }
}
   drawArrowBits (ctx) {
      let {x, y, arrowTip} = this;
      const theta = vectorAngle([arrowTip.x - x, arrowTip.y -y] );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(arrowTip.x, arrowTip.y);
      ctx.lineTo(
         arrowTip.x + 12 * Math.cos(theta + 3*Math.PI/4), 
         arrowTip.y + 12* Math.sin(theta + 3*Math.PI/4));
      ctx.moveTo(arrowTip.x, arrowTip.y);
      ctx.lineTo(
         arrowTip.x + 12 * Math.cos(theta - 3*Math.PI/4), 
         arrowTip.y + 12* Math.sin(theta - 3*Math.PI/4));
      ctx.stroke();

   }

    launch(){
       if (this.arrowTip.x === null){
          return false;
       }
       this.game.ball.stopped = false;
       this.game.ball.vx = this.launchVx;
       this.game.ball.vy = this.launchVy;
       return true;
    }

    setVelocity(event){

      const cursor = {x: event.clientX -error().x, y: event.clientY - error().y};
      const dx = cursor.x - this.x;
      const dy = cursor.y - this.y;
      if (
         dx**2 + dy**2 <= this.radius ** 2 &&
          dx * this.normal[0] + dy * this.normal[1] >= 0
          ) {
             this.arrowTip.x = cursor.x;
             this.arrowTip.y = cursor.y;

            this.launchVx = dx/ 4;
            this.launchVy = dy/ 4;
           
            this.arrowAngle = vectorAngle([dx, dy]);
            
         }   
         else {this.arrowTip.x = null;}
    }
    setVelocityByArrowKeys(event){
       const dVx = .1 * Math.cos(this.arrowAngle);
       const dVy = .1 * Math.sin(this.arrowAngle);
       if (event.keyCode === 40){
          this.launchVx -= dVx;        
          this.launchVy -= dVy;        
          this.arrowTip.x -= 4 * dVx;
          this.arrowTip.y -= 4 * dVy;
       }
       if (event.keyCode === 38){
          this.launchVx += dVx;
          this.launchVy += dVy;
          this.arrowTip.x += 4 * dVx;
          this.arrowTip.y += 4 * dVy;

       }
    }
   }


   export default LaunchPad;
