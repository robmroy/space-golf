import { dottedArc, vectorAngle, vectorLength } from './helper';
const error = () => {
   let m = document.getElementById("game-canvas");
   let rect = m.getBoundingClientRect();
   return { x: rect.x, y: rect.y };
}

class LaunchPad {
   constructor(game, x = 0, y = 0, normal = [0, 1], maxTheta = Math.PI / 2, radius = 160, color = "white") {
      this.game = game;
      this.x = x;
      this.y = y;
      this.normal = normal;
      this.radius = radius;
      this.color = color;
      this.draw = this.draw.bind(this);
      this.move = this.move.bind(this);
      this.launch = this.launch.bind(this);
      this.arrowVector = this.arrowVector.bind(this);
      this.updatePolar = this.updatePolar.bind(this);
      this.updateArrowTip = this.updateArrowTip.bind(this);
      this.updateLaunchVelocity = this.updateLaunchVelocity.bind(this);
      this.launchVx = 0;
      this.launchVy = 0;
      this.normalAngle = vectorAngle(normal);
      this.setVelocity = this.setVelocity.bind(this);
      this.arrowTip = { x: null, y: null };
      this.arrowAngle = this.normalAngle;
      this.arrowLength = 60;
      this.maxTheta = maxTheta;
      this.thetaRestrictionHelper = (1 - Math.cos(maxTheta)) ** 2 + (Math.sin(maxTheta)) ** 2;
      this.setVelocityByArrowKeys = this.setVelocityByArrowKeys.bind(this);
   }

   move() {
      this.x += this.vx;
      this.y += this.vy;
   }

   vpX() {
      return this.game.vp.displayPos(this).x;
   }

   vpY() {
      return this.game.vp.displayPos(this).y;
   }

   arrowVector() {
      const vp = this.game.vp;
      return [this.arrowTip.x - (this.x - vp.x1)*vp.zoom, this.arrowTip.y - (this.y - vp.y1)*vp.zoom];
   }

   updatePolar() {
      this.arrowLength = vectorLength(this.arrowVector());
      this.arrowAngle = vectorAngle(this.arrowVector());
   }

   updateArrowTip() {
      let vp = this.game.vp;
      this.arrowTip.x = (this.x - vp.x1) + this.arrowLength * Math.cos(this.arrowAngle);
      this.arrowTip.y = (this.y - vp.y1) + this.arrowLength * Math.sin(this.arrowAngle);
   }

   updateLaunchVelocity() {
      let vp = this.game.vp;
      this.launchVx = this.arrowVector()[0] / (8 * vp.zoom);
      this.launchVy = this.arrowVector()[1] / (8 * vp.zoom);
   }

   draw(ctx, vp) {
      let zoom = vp.zoom;
      let x = (this.x - vp.x1) * zoom;
      let y = (this.y - vp.y1) * zoom;
      let r = this.radius * zoom;
      dottedArc(ctx, x, y, r,
         this.normalAngle - this.maxTheta, this.normalAngle + this.maxTheta, this.color);
      let currentPlanet = this.game.currentPlanet;
      if (this.arrowTip.x === null) { currentPlanet.hideText = false; }
      if (this.arrowTip.x !== null) {
         ctx.beginPath();
         ctx.strokeStyle = "white";
         ctx.setLineDash([5, 5]);
         ctx.moveTo(x, y);
         ctx.lineTo(this.arrowTip.x, this.arrowTip.y)
         ctx.stroke();
         this.drawArrowBits(ctx);
         ctx.beginPath();
         let textX = 0.5 * (x + this.arrowTip.x);
         let textY = 0.5 * (y + this.arrowTip.y);
         ctx.fillStyle = "purple"
         ctx.font = `${21}px Arial`;
         ctx.fillText(`Initial speed: ${(this.arrowLength / (8 * zoom)).toFixed(2)}`,
            `${textX}`,
            `${textY}`);
         ctx.fill();
         let vp = this.game.vp;
         let ball = this.game.ball;
         if (textX >= currentPlanet.textPos.x - vp.x1 - 150 &&
            textY >= currentPlanet.textPos.y - vp.y1 - 28 + ball.radius &&
            textY <= currentPlanet.textPos.y - vp.y1 + 8 + ball.radius) {
            currentPlanet.hideText = true;
         }
         else { currentPlanet.hideText = false; }

      }
   }

   drawArrowBits(ctx) {
      let { x, y, arrowTip, game } = this;
      let vp = game.vp;
      x = (x- vp.x1)*vp.zoom;
      y = (y - vp.y1) * vp.zoom;

      const theta = vectorAngle([arrowTip.x - x, arrowTip.y - y]);
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(arrowTip.x, arrowTip.y);
      ctx.lineTo(
         arrowTip.x + 12 * Math.cos(theta + 3 * Math.PI / 4),
         arrowTip.y + 12 * Math.sin(theta + 3 * Math.PI / 4));
      ctx.moveTo(arrowTip.x, arrowTip.y);
      ctx.lineTo(
         arrowTip.x + 12 * Math.cos(theta - 3 * Math.PI / 4),
         arrowTip.y + 12 * Math.sin(theta - 3 * Math.PI / 4));
      ctx.stroke();

   }

   launch() {
      if (this.arrowTip.x === null) {
         return false;
      }
      this.game.ball.stopped = false;
      this.game.ball.vx = this.launchVx;
      this.game.ball.vy = this.launchVy;
      return true;
   }

   setVelocity(event) {
      if(!this.cursor && !event) return;
      const vp = this.game.vp;
      if(event) {
         this.cursor = { x: event.clientX - error().x, y: event.clientY - error().y };
      }
      const cursor = this.cursor;
      const dx = cursor.x - (this.x - vp.x1)*vp.zoom;
      const dy = cursor.y - (this.y - vp.y1)*vp.zoom;
      const dz = Math.sqrt(dx ** 2 + dy ** 2);
      if (
         dx ** 2 + dy ** 2 <= (this.radius*vp.zoom) ** 2 &&
         (this.normal[0] - dx / dz) ** 2 + (this.normal[1] - dy / dz) ** 2 <= this.thetaRestrictionHelper
      ) {
         this.arrowTip.x = cursor.x;
         this.arrowTip.y = cursor.y;
         this.updateLaunchVelocity();
         this.updatePolar();
      }
      else {
         this.arrowTip.x = null;
      }
   }

   setVelocityByArrowKeys(event, callback) {
      let relevantKeyCodes = [13, 32, 37, 38, 39, 40];
      if (!relevantKeyCodes.includes(event.keyCode)){return;}
      const al = this.arrowLength;
      if (event.keyCode === 40) {
         this.arrowLength = Math.max(al - .4, 0);
      }
      if (event.keyCode === 38) {
         this.arrowLength = Math.min(al + .4, this.radius);
      }
      if (event.keyCode === 37) {
         this.arrowAngle -= .004;
      }
      if (event.keyCode === 39) {
         this.arrowAngle += .004;
      }
      if ([32, 13].includes(event.keyCode)) {
         if (this.launch()) {
            callback();
         }
      }
      this.updateArrowTip();
      this.updateLaunchVelocity();
   }
}

export default LaunchPad;
