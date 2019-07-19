const error = () => {let m = document.getElementById("game-canvas");
let rect = m.getBoundingClientRect();
return {x: rect.x, y: rect.y};
}

class LaunchPad {
   constructor(game, x = 0, y = 0, width = 100, height = 100, color = "yellow"){
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = width;
      this.width = width;
      this.height = height;
      this.color = color;
      this.draw= this.draw.bind(this);
      this.move = this.move.bind(this);
      this.launch = this.launch.bind(this);
      this.launchVx = 0;
      this.launchVy=0;
  }

  move(){
      this.x += this.vx;
      this.y += this.vy;
  }
  draw(ctx ) {
     ctx.beginPath();
     ctx.fillStyle = this.color;
     ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();
    }

    launch(){
       this.game.ball.stopped = false;
       this.game.ball.vx = this.launchVx;
       this.game.ball.vy = this.launchVy;
    }

    setVelocity(ball, event){

      const cursor = {x: event.clientX -error().x, y: event.clientY - error().y};
      if (cursor.x>=this.x && cursor.x <= this.x + this.width 
         && cursor.y >= this.y && cursor.y <= this.height + this.y) {
            var dx = cursor.x - ball.x ;
            var dy = cursor.y - ball.y ;
        
            var coor = "Choose Vector. X coords: " + ball.x + ", Y coords: " + ball.y;
            coor += `Vector: [${dx}, ${dy}]`;
            this.launchVx = dx/ 20;
            this.launchVy = dy/ 20;
            
            // document.getElementById("demo").innerHTML = coor;
            console.log(`ball.x=${ball.x}`)
            
            
            // var ctx = c.getContext("2d");
            // ctx.fillStyle="black";
            // ctx.fillRect(0,0,900,600);
            // ctx.beginPath();
            // ctx.moveTo(ball.x, ball.y);
            // ctx.lineTo(event.clientX - error().x, event.clientY - error().y);
            // ctx.stroke();

         }   
    }
   }

   export default LaunchPad;
