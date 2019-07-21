!function(t){var i={};function s(h){if(i[h])return i[h].exports;var e=i[h]={i:h,l:!1,exports:{}};return t[h].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=t,s.c=i,s.d=function(t,i,h){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:h})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var h=Object.create(null);if(s.r(h),Object.defineProperty(h,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var e in t)s.d(h,e,function(i){return t[i]}.bind(null,e));return h},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=0)}([function(t,i,s){"use strict";s.r(i);var h=class{constructor(t,i=0,s=0,h=5,e="white",a=0,l=0){this.game=t,this.x=i,this.y=s,this.radius=h,this.color=e,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.vx=a,this.vy=l,this.ax=0,this.ay=0,this.stopped=!0,this.logging=!1}move(){if(this.logging&&(console.log(`ballx is ${this.x}`),console.log(`bally is ${this.y}`)),this.game.hole.checkForWin()&&(this.stopped=!0),!this.stopped){let t,i,s;this.x+=this.vx,this.y+=this.vy,this.vx+=this.ax,this.vy+=this.ay,Math.abs(this.vx)+Math.abs(this.vy)<.4&&Math.abs(this.ax)+Math.abs(this.ay)<.1&&(this.stopped=!0),this.ax=0,this.ay=0,this.game.planets.forEach(h=>{t=this.x-h.x,i=this.y-h.y;const e=t**2+i**2;s=Math.sqrt(e);let a=[t/s,i/s];if(s<=this.radius+h.radius){let t=this.radius+h.radius-s;this.x+=t*a[0],this.y+=t*a[1],this.ax=0,this.ay=0,h.sticky||Math.abs(this.vx)+Math.abs(this.vy)<1?this.stopped=!0:h.bounce(a)}else this.ax-=1/e*h.mass*t/s*.2,this.ay-=1/e*h.mass*i/s*.2}),this.game.obstacles.forEach(t=>{t.checkForBall()&&t.bounce()})}}draw(t){t.beginPath(),t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.fill()}};const e=()=>{let t=document.getElementById("game-canvas").getBoundingClientRect();return{x:t.x,y:t.y}};var a=class{constructor(t,i=0,s=0,h=100,e=100,a="yellow"){this.game=t,this.x=i,this.y=s,this.width=h,this.width=h,this.height=e,this.color=a,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.launch=this.launch.bind(this),this.launchVx=0,this.launchVy=0}move(){this.x+=this.vx,this.y+=this.vy}draw(t){t.beginPath(),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.width,this.height),t.fill()}launch(){this.game.ball.stopped=!1,this.game.ball.vx=this.launchVx,this.game.ball.vy=this.launchVy}setVelocity(t,i){const s=i.clientX-e().x,h=i.clientY-e().y;if(s>=this.x&&s<=this.x+this.width&&h>=this.y&&h<=this.height+this.y){var a=s-t.x,l=h-t.y;t.x,t.y,this.launchVx=a/5,this.launchVy=l/5}}};var l=class{constructor(t,i=0,s=0,h=100,e=100,a="orange"){this.game=t,this.x1=i,this.y1=s,this.x2=h,this.y2=e,this.color=a,this.draw=this.draw.bind(this),this.move=this.move.bind(this);let l=Math.sqrt((s-e)**2+(h-i)**2);this.normal=[(s-e)/l,(h-i)/l],this.bounce=this.bounce.bind(this),this.checkForBall=this.checkForBall.bind(this)}bounce(){let t=this.game.ball,i=this.normal,s=t.vx*i[0]+t.vy*i[1],h=t.vx-2*s*i[0],e=t.vy-2*s*i[1];t.vx=h,t.vy=e}checkForBall(){let t=this.game.ball;t.logging=!1;let{x1:i,x2:s,y1:h,y2:e}=this,{x:a,y:l,radius:o}=t;if(a-o>Math.max(i,s)||a+o<Math.min(i,s))return!1;if(l-o>Math.max(h,e)||l+o<Math.min(h,e))return!1;let n=((e-h)*a-(s-i)*l+s*h-e*i)/Math.sqrt((e-h)**2+(s-i)**2),r=-o<=n&&o>=n;return r||void 0}move(){this.x+=this.vx,this.y+=this.vy}draw(t){t.beginPath(),t.beginPath(),t.moveTo(this.x1,this.y1),t.lineTo(this.x2,this.y2),t.strokeStyle=this.color,t.stroke()}};s(4);var o=class{constructor(t,i=0,s=0,h=10,e="grey",a,l=0,o=0){this.game=t,this.x=i,this.y=s,this.radius=h,this.color=e,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.vx=l,this.vy=o,this.density=a||1,this.mass=this.density*this.radius**3,this.sticky=!0}move(){this.x+=this.vx,this.y+=this.vy}draw(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.font=`${Math.floor(.9*this.radius)}px Arial`,t.fillText(`Density: ${this.density}`,`${this.x-1.9*this.radius}`,`${this.y+2*this.radius}`),t.fill()}};var n=class{constructor(t,i=0,s=0,h=10,e="pink",a,l,o=0,n=0){this.game=t,this.x=i,this.y=s,this.radius=h,this.color=e,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.vx=o,this.vy=n,this.density=a||1,this.mass=this.density*this.radius**3,this.sticky=!1,this.bounce_coeff=l||.9}bounce(t){let i=this.game.ball;const s=t=>1-Math.exp(-.5*Math.abs(t));let h=i.vx*t[0]+i.vy*t[1],e=this.bounce_coeff*s(i.vx)*(i.vx-2*h*t[0]),a=this.bounce_coeff*s(i.vy)*(i.vy-2*h*t[1]);i.vx=e,i.vy=a}move(){this.x+=this.vx,this.y+=this.vy}draw(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.font=`${Math.floor(.9*this.radius)}px Arial`,t.fillText(`Density: ${this.density}`,`${this.x-1.9*this.radius}`,`${this.y+2*this.radius}`),t.fill()}};var r=class{constructor(t,i=600,s=500,h=100,e="red"){this.game=t,this.x=i,this.y=s,this.width=h,this.flagColor=e,this.drawFlag=this.drawFlag.bind(this),this.drawHole=this.drawHole.bind(this),this.move=this.move.bind(this),this.launchVx=0,this.launchVy=0}move(){this.x+=this.vx,this.y+=this.vy}drawFlag(t){let i=this.x,s=this.y;t.beginPath(),t.strokeStyle="gold",t.moveTo(i,s),t.lineTo(i,s-50),t.stroke(),t.fillStyle="red",t.moveTo(i,s-50),t.lineTo(i,s-70),t.lineTo(i+25,s-60),t.lineTo(i,s-50),t.fill()}drawHole(t){let{x:i,y:s,width:h}=this,e=this.game.ball;e.y-e.radius<=s+20&&e.vy>0&&(t.beginPath(),t.fillStyle="black",t.moveTo(i-h/2,s),t.lineTo(i+h/2,s),t.lineTo(i+h/2,s+30),t.lineTo(i-h/2,s+30),t.lineTo(i-h/2,s),t.fill())}checkForWin(){let{x:t,y:i,width:s}=this,h=this.game.ball,e=h.y-h.radius>i&&h.y-5*h.radius<i&&Math.abs(h.x-t)<s/2&&h.vy>0;return e&&console.log("won, supposedly"),e}};var c=class{constructor(t){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.ball=new h(this,300,50),this.draw=this.draw.bind(this),this.launchPad=new a(this,250),this.start=this.start.bind(this),this.planets=[new n(this,300,400,35),new o(this,620,250,15,"purple",3)],this.hole=new r(this,200,200),this.obstacles=[],this.obstacles=[new l(this,90,0,90,900)]}start(){let t=t=>this.launchPad.setVelocity(this.ball,t);this.canvas.addEventListener("mousemove",t),this.canvas.addEventListener("click",i=>{this.launchPad.launch(),document.getElementById("game-canvas").removeEventListener("mousemove",t)}),requestAnimationFrame(this.animate.bind(this))}step(t){this.moveObjects(t)}moveObjects(){this.ball.move()}animate(t){const i=t-this.lastTime;this.step(i),this.draw(),this.lastTime=t,requestAnimationFrame(this.animate.bind(this))}draw(){let t=this.ctx;t.width=1200,t.height=600,t.fillStyle="black",t.fillRect(0,0,1e3,600),this.launchPad.draw(t),this.hole.drawFlag(t),this.ball.draw(t),this.planets.forEach(i=>i.draw(t)),this.obstacles.forEach(i=>i.draw(t)),this.hole.drawHole(t)}};document.addEventListener("DOMContentLoaded",t=>{new c(1).start()})},,,,function(t,i){}]);
//# sourceMappingURL=main.js.map