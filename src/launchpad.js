import {dottedArc, vectorAngle} from './helper';
const error = () => {let m = document.getElementById("game-canvas");
let rect = m.getBoundingClientRect();
return {x: rect.x, y: rect.y};
}

class LaunchPad {
   constructor(game, x = 0, y = 0, normal = [0,1], radius = 80,  color = "white"){
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
      this.normalAngle - Math.PI/2, this.normalAngle + Math.PI/2, this.color)
}

    launch(){
       this.game.ball.stopped = false;
       this.game.ball.vx = this.launchVx;
       this.game.ball.vy = this.launchVy;
    }

    setVelocity(ball, event){

      const cursor = {x: event.clientX -error().x, y: event.clientY - error().y};
      const dx = cursor.x - this.x;
      const dy = cursor.y - this.y;
      console.log(`this.normal is ${this.normal}`);
      if (
         dx**2 + dy**2 <= this.radius ** 2 &&
          dx * this.normal[0] + dy * this.normal[1] >= 0
          ) {
            
            
            var coor = "Choose Vector. X coords: " + ball.x + ", Y coords: " + ball.y;
            coor += `Vector: [${dx}, ${dy}]`;
            this.launchVx = dx/ 4;
            this.launchVy = dy/ 4;
            return true;
         }   
         return false;
    }
   }

   export default LaunchPad;
