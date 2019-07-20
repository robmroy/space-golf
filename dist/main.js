!function(t){var i={};function s(e){if(i[e])return i[e].exports;var h=i[e]={i:e,l:!1,exports:{}};return t[e].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=t,s.c=i,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var h in t)s.d(e,h,function(i){return t[i]}.bind(null,h));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=0)}([function(t,i,s){"use strict";s.r(i);var e=class{constructor(t,i=0,s=0,e=5,h="white",a=0,n=0){this.game=t,this.x=i,this.y=s,this.radius=e,this.color=h,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.vx=a,this.vy=n,this.stopped=!0,this.logging=!1}move(){this.logging&&(console.log(`ballx is ${this.x}`),console.log(`bally is ${this.y}`)),this.stopped||(this.x+=this.vx,this.y+=this.vy,this.game.planets.forEach(t=>{const i=this.x-t.x,s=this.y-t.y,e=i**2+s**2,h=Math.sqrt(e);h<=this.radius+t.radius?this.stopped=!0:(this.vx-=1/e*t.mass*i/h*.7,this.vy-=1/e*t.mass*s/h*.7)}),this.game.obstacles.forEach(t=>{t.checkForBall()&&t.bounce()}))}draw(t){t.beginPath(),t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.fill()}};const h=()=>{let t=document.getElementById("game-canvas").getBoundingClientRect();return{x:t.x,y:t.y}};var a=class{constructor(t,i=0,s=0,e=100,h=100,a="yellow"){this.game=t,this.x=i,this.y=s,this.width=e,this.width=e,this.height=h,this.color=a,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.launch=this.launch.bind(this),this.launchVx=0,this.launchVy=0}move(){this.x+=this.vx,this.y+=this.vy}draw(t){t.beginPath(),t.fillStyle=this.color,t.fillRect(this.x,this.y,this.width,this.height),t.fill()}launch(){this.game.ball.stopped=!1,this.game.ball.vx=this.launchVx,this.game.ball.vy=this.launchVy}setVelocity(t,i){const s=i.clientX-h().x,e=i.clientY-h().y;if(s>=this.x&&s<=this.x+this.width&&e>=this.y&&e<=this.height+this.y){var a=s-t.x,n=e-t.y;t.x,t.y,this.launchVx=a/5,this.launchVy=n/5,console.log(`ball.x=${t.x}`)}}};s(4);var n=class{constructor(t,i=0,s=0,e=10,h="grey",a,n=0,l=0){this.game=t,this.x=i,this.y=s,this.radius=e,this.color=h,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.vx=n,this.vy=l,this.density=a||1,this.mass=this.density*this.radius**3}move(){this.x+=this.vx,this.y+=this.vy}draw(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.font=`${Math.floor(.9*this.radius)}px Arial`,t.fillText(`Density: ${this.density}`,`${this.x-1.9*this.radius}`,`${this.y+2*this.radius}`),t.fill()}};var l=class{constructor(t){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.ball=new e(this,300,50),this.draw=this.draw.bind(this),this.launchPad=new a(this,250),this.start=this.start.bind(this),this.planets=[new n(this,300,520,22,"red"),new n(this,620,250,15,"purple",10)],this.obstacles=[],this.obstacles=[]}start(){let t=t=>this.launchPad.setVelocity(this.ball,t);this.canvas.addEventListener("mousemove",t),this.canvas.addEventListener("click",i=>{this.launchPad.launch(),document.getElementById("game-canvas").removeEventListener("mousemove",t)}),requestAnimationFrame(this.animate.bind(this))}step(t){this.moveObjects(t)}moveObjects(){this.ball.move()}animate(t){const i=t-this.lastTime;this.step(i),this.draw(),this.lastTime=t,requestAnimationFrame(this.animate.bind(this))}draw(){let t=this.ctx;t.width=1200,t.height=600,t.fillStyle="black",t.fillRect(0,0,1e3,600),this.launchPad.draw(t),this.ball.draw(t),this.planets.forEach(i=>i.draw(t)),this.obstacles.forEach(i=>i.draw(t))}};document.addEventListener("DOMContentLoaded",t=>{new l(1).start()})},,,,function(t,i){}]);
//# sourceMappingURL=main.js.map