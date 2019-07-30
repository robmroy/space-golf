import {dottedArc, vectorAngle, vectorLength} from './helper';
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
      this.arrowVector = this.arrowVector.bind(this);
      this.updatePolar = this.updatePolar.bind(this);
      this.updateArrowTip = this.updateArrowTip.bind(this);
      this.updateLaunchVelocity = this.updateLaunchVelocity.bind(this);
      this.launchVx = 0;
      this.launchVy=0;
      this.normalAngle = vectorAngle(normal);
      this.setVelocity = this.setVelocity.bind(this);
      this.arrowTip = {x: null, y: null};
      this.arrowAngle = this.normalAngle;
      this.arrowLength = 60;
  }

  move(){
      this.x += this.vx;
      this.y += this.vy;
  }

  vpX(){
    return this.game.vp.displayPos(this).x;
   }
   vpY(){
      return this.game.vp.displayPos(this).y;
   }

  arrowVector(){
     const vp = this.game.vp;
     return [this.arrowTip.x-this.x + vp.x1, this.arrowTip.y-this.y + vp.y1];
  }
  updatePolar(){
   this.arrowLength = vectorLength(this.arrowVector());
   this.arrowAngle = vectorAngle(this.arrowVector());
  }
  updateArrowTip(){
     let vp = this.game.vp;
     this.arrowTip.x = this.x -vp.x1 + this.arrowLength*Math.cos(this.arrowAngle);
     this.arrowTip.y = this.y - vp.y1 + this.arrowLength*Math.sin(this.arrowAngle);
  }
  updateLaunchVelocity(){
     this.launchVx = this.arrowVector()[0]/4;
     this.launchVy = this.arrowVector()[1]/4;
  }
  draw(ctx ) {
   let x = this.vpX();
   let y = this.vpY();
   dottedArc(ctx, x, y, this.radius, 
      this.normalAngle - Math.PI/2, this.normalAngle + Math.PI/2, this.color);
      let currentPlanet = this.game.currentPlanet;
      if(this.arrowTip.x === null){currentPlanet.hideText = false;}
   if (this.arrowTip.x !== null){
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.setLineDash([5,5]);
     ctx.moveTo(x, y);
     ctx.lineTo(this.arrowTip.x, this.arrowTip.y)
     ctx.stroke();
     this.drawArrowBits(ctx);
     ctx.beginPath();
      let textX = 0.5 * (x + this.arrowTip.x);
      let textY = 0.5 * (y + this.arrowTip.y);
        ctx.fillStyle = "purple"
        ctx.font = `${21}px Arial`;
        ctx.fillText(`Initial speed: ${(this.arrowLength/4).toFixed(2)}`, 
        `${textX}`,
         `${textY}`);
        ctx.fill();
        let vp = this.game.vp;
        let ball = this.game.ball;
        if (textX  >=currentPlanet.textPos.x - vp.x1 - 150  && 
           textY >= currentPlanet.textPos.y - vp.y1 - 28 + ball.radius  &&
         textY  <= currentPlanet.textPos.y - vp.y1 + 8 + ball.radius){
            currentPlanet.hideText = true;
         }
         else { currentPlanet.hideText = false;}
     
   }
}
   drawArrowBits(ctx) {
      let {x, y, arrowTip, game} = this;
       x -= game.vp.x1;
      y-= game.vp.y1;

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
      const vp = this.game.vp;
      const cursor = {x: event.clientX -error().x, y: event.clientY - error().y};
      const dx = cursor.x - this.x +vp.x1;
      const dy = cursor.y - this.y + vp.y1;
      if (
         dx**2 + dy**2 <= this.radius ** 2 &&
          dx * this.normal[0] + dy * this.normal[1] >= 0
          ) {
             this.arrowTip.x = cursor.x;
             this.arrowTip.y = cursor.y;

            this.updateLaunchVelocity();
           
            this.updatePolar();
            
         }   
         else {this.arrowTip.x = null;}
    }
    setVelocityByArrowKeys(event, callback){
       const dVx = .1 * Math.cos(this.arrowAngle);
       const dVy = .1 * Math.sin(this.arrowAngle);

       if (event.keyCode === 40){
         this.arrowLength -= .5;
       }
       if (event.keyCode === 38){
         this.arrowLength += .5;
       }
       if (event.keyCode === 37){
          this.arrowAngle -= .02;
       }
       if (event.keyCode === 39){
          this.arrowAngle += .02;
      }
      if ([32,13].includes(event.keyCode)){
         if (this.launch()){
            callback();
         }
       }
       this.updateArrowTip();
       this.updateLaunchVelocity();
       
    }
   }

   export default LaunchPad;
