!function(t){var i={};function e(s){if(i[s])return i[s].exports;var h=i[s]={i:s,l:!1,exports:{}};return t[s].call(h.exports,h,h.exports,e),h.l=!0,h.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var h in t)e.d(s,h,function(i){return t[i]}.bind(null,h));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);const s=function(t,i,e,s,h,a,l){let n=a-h,r=2*Math.ceil(.5*(n/.1-1))+1,o=n/r;t.strokeStyle=l;for(let a=0;a<r;a++)t.beginPath(),a%2==0&&(t.arc(i,e,s,h+a*o,h+(a+1)*o),t.stroke())},h=function(t){const i=t[0],e=t[1];return 0==i?e>0?Math.PI/2:-Math.PI/2:i>0?Math.atan(e/i):Math.PI+Math.atan(e/i)},a=function(t){return Math.sqrt(t[0]**2+t[1]**2)},l=function(t,i){let[e,s]=t,[h,a]=i;return(a-e)*(h-e)<=0||(a-s)*(h-s)<=0||(s-h)*(e-h)<=0||(s-a)*(e-a)<=0},n=()=>{let t=document.getElementById("game-canvas").getBoundingClientRect();return{x:t.x,y:t.y}};var r=class{constructor(t,i=0,e=0,s=[0,1],a=100,l="white"){this.game=t,this.x=i,this.y=e,this.normal=s,this.radius=a,this.color=l,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.launch=this.launch.bind(this),this.arrowVector=this.arrowVector.bind(this),this.updatePolar=this.updatePolar.bind(this),this.updateArrowTip=this.updateArrowTip.bind(this),this.updateLaunchVelocity=this.updateLaunchVelocity.bind(this),this.launchVx=0,this.launchVy=0,this.normalAngle=h(s),this.setVelocity=this.setVelocity.bind(this),this.arrowTip={x:null,y:null},this.arrowAngle=this.normalAngle,this.arrowLength=60}move(){this.x+=this.vx,this.y+=this.vy}arrowVector(){return[this.arrowTip.x-this.x,this.arrowTip.y-this.y]}updatePolar(){this.arrowLength=a(this.arrowVector()),this.arrowAngle=h(this.arrowVector())}updateArrowTip(){this.arrowTip.x=this.x+this.arrowLength*Math.cos(this.arrowAngle),this.arrowTip.y=this.y+this.arrowLength*Math.sin(this.arrowAngle)}updateLaunchVelocity(){this.launchVx=this.arrowVector()[0]/4,this.launchVy=this.arrowVector()[1]/4}draw(t){s(t,this.x,this.y,this.radius,this.normalAngle-Math.PI/2,this.normalAngle+Math.PI/2,this.color),null!==this.arrowTip.x&&(t.beginPath(),t.strokeStyle="white",t.setLineDash([5,5]),t.moveTo(this.x,this.y),t.lineTo(this.arrowTip.x,this.arrowTip.y),t.stroke(),this.drawArrowBits(t),t.beginPath(),t.fillStyle="purple",t.font="21px Arial",t.fillText(`Initial speed: ${(this.arrowLength/4).toFixed(2)}`,`${.5*(this.x+this.arrowTip.x)}`,`${.5*(this.y+this.arrowTip.y)}`),t.fill())}drawArrowBits(t){let{x:i,y:e,arrowTip:s}=this;const a=h([s.x-i,s.y-e]);t.setLineDash([]),t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(s.x+12*Math.cos(a+3*Math.PI/4),s.y+12*Math.sin(a+3*Math.PI/4)),t.moveTo(s.x,s.y),t.lineTo(s.x+12*Math.cos(a-3*Math.PI/4),s.y+12*Math.sin(a-3*Math.PI/4)),t.stroke()}launch(){return null!==this.arrowTip.x&&(this.game.ball.stopped=!1,this.game.ball.vx=this.launchVx,this.game.ball.vy=this.launchVy,!0)}setVelocity(t){const i={x:t.clientX-n().x,y:t.clientY-n().y},e=i.x-this.x,s=i.y-this.y;e**2+s**2<=this.radius**2&&e*this.normal[0]+s*this.normal[1]>=0?(this.arrowTip.x=i.x,this.arrowTip.y=i.y,this.updateLaunchVelocity(),this.updatePolar()):this.arrowTip.x=null}setVelocityByArrowKeys(t,i){Math.cos(this.arrowAngle),Math.sin(this.arrowAngle),40===t.keyCode&&(this.arrowLength-=.5),38===t.keyCode&&(this.arrowLength+=.5),37===t.keyCode&&(this.arrowAngle-=.02),39===t.keyCode&&(this.arrowAngle+=.02),[32,13].includes(t.keyCode)&&this.launch()&&i(),this.updateArrowTip(),this.updateLaunchVelocity()}};var o=class{constructor(t,i=0,e=0,s=5,h=1,a="white",l=0,n=0){this.game=t,this.x=i,this.y=e,this.radius=s,this.color=a,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.vx=l,this.vy=n,this.playSpeed=h,this.ax=0,this.ay=0,this.stopped=!0,this.prevx=i,this.prevy=e}checkRectangle(t){const{x:i,y:e}=this;return i>t[0][0]&&i<t[1][0]&&e>t[0][1]&&e<t[1][1]}move(){this.logging&&(console.log(`ballx is ${this.x}`),console.log(`bally is ${this.y}`)),this.prevx=this.x,this.prevy=this.y,this.stopped||(this.x+=this.vx,this.y+=this.vy,this.vx+=this.ax,this.vy+=this.ay,Math.abs(this.vx)+Math.abs(this.vy)<.4&&Math.abs(this.ax)+Math.abs(this.ay)<.1&&(this.stopped=!0),this.ax=0,this.ay=0,this.game.planets.forEach(t=>{const{dx:i,dy:e,dz2:s,dz:h,normal:a}=t.ballData();if(h<=this.radius+t.radius){let i=this.radius+t.radius-h;this.x+=i*a[0],this.y+=i*a[1],this.ax=0,this.ay=0,t.sticky||Math.abs(this.vx)+Math.abs(this.vy)<1?(this.stopped=!0,this.game.currentPlanet=t,this.game.launchPad=new r(this.game,this.x,this.y,a),this.game.setupLaunchPad()):t.bounce(a)}else this.ax-=1/s*t.mass*i/h*.2,this.ay-=1/s*t.mass*e/h*.2}),this.game.obstacles.forEach(t=>{t.checkForBall()&&t.bounce()}))}draw(t,i=this.x,e=this.y){t.beginPath(),t.fillStyle=this.color,t.beginPath(),t.arc(i,e,this.radius,0,2*Math.PI,!0),t.fill()}};var c=class{constructor(t,i=0,e=0,s=10,h="grey",a,l=0,n=0){this.game=t,this.x=i,this.y=e,this.radius=s,this.color=h,this.draw=this.draw.bind(this),this.move=this.move.bind(this),this.vx=l,this.vy=n,this.density=a||1,this.mass=this.density*this.radius**3,this.sticky=!0}move(){this.x+=this.vx,this.y+=this.vy}ballData(){const t=this.game.ball,i=t.x-this.x,e=t.y-this.y,s=i**2+e**2,h=Math.sqrt(s);return{dx:i,dy:e,dz2:s,dz:h,normal:[i/h,e/h]}}draw(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI,!0),t.font=`${Math.floor(.9*this.radius)}px Arial`,t.fill(),t.beginPath(),t.fillStyle="#3e78ad",t.font="14px Arial",t.fillText(`Escape vel. approx. ${(this.radius*this.density**.45*.504).toFixed(2)}`,`${this.x+this.radius+2}`,`${this.y+.5*this.radius}`),t.fill()}};var d=class{constructor(t,i=0,e=0,s=100,h=100,a="orange"){this.game=t,this.x1=i,this.y1=e,this.x2=s,this.y2=h,this.color=a,this.draw=this.draw.bind(this),this.move=this.move.bind(this);let l=Math.sqrt((e-h)**2+(s-i)**2);this.normal=[(e-h)/l,(s-i)/l],this.bounce=this.bounce.bind(this),this.checkForBall=this.checkForBall.bind(this)}bounce(){let t=this.game.ball,i=this.normal,e=t.vx*i[0]+t.vy*i[1],s=t.vx-2*e*i[0],h=t.vy-2*e*i[1];t.vx=s,t.vy=h}checkForBall(){let t=this.game.ball;t.logging=!1;let{x1:i,x2:e,y1:s,y2:h}=this,a=[s-h,e-i],{x:n,y:r,radius:o,vx:c,vy:d}=t;return(a[0]*(n-i)+a[1]*(r-s))*(a[0]*(n+c-i)+a[1]*(r+d-s))<=0&&l([n,n+c],[i,e])&&l([r,r+d],[s,h])}move(){this.x+=this.vx,this.y+=this.vy}draw(t){t.setLineDash([]),t.beginPath(),t.moveTo(this.x1,this.y1),t.lineTo(this.x2,this.y2),t.strokeStyle=this.color,t.stroke()}};var u=class{constructor(t,i,e,s=[0,1],h=100){this.game=t,this.x=i,this.y=e,this.width=h,this.drawFlag=this.drawFlag.bind(this),this.drawHole=this.drawHole.bind(this),this.normal=s,this.drawFlag=this.drawFlag.bind(this),this.drawHole=this.drawHole.bind(this)}move(){this.x+=this.vx,this.y+=this.vy}drawFlag(t){let i=this.x,e=this.y;t.setLineDash([]),t.beginPath(),t.strokeStyle="gold",t.moveTo(i,e),t.lineTo(i,e-50),t.stroke(),t.fillStyle="red",t.moveTo(i,e-50),t.lineTo(i,e-70),t.lineTo(i+25,e-60),t.lineTo(i,e-50),t.fill()}drawHole(t){let{x:i,y:e,width:s}=this;this.game.ball,t.beginPath(),t.strokeStyle="purple",t.moveTo(i-s/2,e),t.lineTo(i+s/2,e),t.stroke(),t.beginPath(),t.fillStyle="black",t.moveTo(i+s/2,e),t.lineTo(i+s/2,e+30),t.lineTo(i-s/2,e+30),t.lineTo(i-s/2,e),t.fill()}checkForWin(){let{x:t,y:i,width:e,normal:s}=this,h=this.game.ball;return(s[0]*(h.x-t)+s[1]*(h.y-i))*(s[0]*(h.x+h.vx-t)+s[1]*(h.y+h.vy-i))<=0&&l([h.x,h.x+h.vx],[t-.5*e*s[1],t+.5*e*s[1]])&&l([h.y,h.y+h.vy],[i-.5*e*s[0],i+.5*e*s[0]])}};const y=()=>{let t=document.getElementById("game-canvas").getBoundingClientRect();return{x:t.x,y:t.y}};var p=class{constructor(t,i,e){this.game=t,this.clickHandler=this.clickHandler.bind(this),t.canvas.addEventListener("click",this.clickHandler),this.visible=!0,this.x=i,this.y=e}draw(t){this.visible&&(t.beginPath(),t.fillStyle="white",t.font="25px Arial",t.fillText("Start",this.x,this.y),t.fill(),t.beginPath(),t.strokeStyle="white",t.moveTo(this.x-20,this.y+10),t.lineTo(this.x-20,this.y-25),t.lineTo(this.x+75,this.y-25),t.lineTo(this.x+75,this.y+10),t.lineTo(this.x-20,this.y+10),t.stroke())}clickHandler(t){const i=t.clientX-y().x,e=t.clientY-y().y;i>=this.x-20&&i<=this.x+75&&e>=this.y-25&&e<=this.y+10&&(console.log("successful click"),this.game.setupLaunchPad(),this.game.canvas.removeEventListener("click",this.clickHandler,!1),this.visible=!1)}};var v=class{constructor(t){const i=1/Math.sqrt(2);this.ball=new o(t,100+30*i,40+30*i),this.corners=[[-200,-200],[1200,900]],this.currentPlanet=new c(t,100,40,25,"#27753a",1),this.startButton=new p(t,400,400),this.launchPad=new r(t,this.ball.x,this.ball.y,[i,i]),this.planets=[this.currentPlanet,new c(t,640,490,20,"orange",3)],this.hole=new u(t,670,450,[0,1],100),this.obstacles=[],this.obstacles=[new d(t,350,280,680,420),new d(t,360,150,710,410)]}};var x=class{constructor(t){this.ball=new o(t,300,100),this.currentPlanet=new c(t,300,70,25,"#27753a",1),this.corners=[[-200,-200],[1200,900]],this.launchPad=new r(t,300,100),this.planets=[this.currentPlanet,new c(t,300,400,35),new c(t,520,250,30,"orange"),new c(t,580,450,30,"orange")],this.hole=new u(t,700,500),this.obstacles=[],this.obstacles=[new d(t,90,0,90,900),new d(t,600,40,850,300)]}};var m=class{constructor(t,i=300,e="30px Arial",s=400,h=300){this.text=t,this.duration=i,this.font=e,this.x=s,this.y=h}draw(t){t.beginPath(),t.fillStyle="#3e78ad",t.font=this.font,t.fillText(this.text,this.x,this.y),t.fill()}};var w=class{constructor(){this.canvas=document.getElementById("game-canvas"),this.canvas.setAttribute("tabindex",0),this.ctx=this.canvas.getContext("2d"),this.levels=[null,v,x],this.currentLevelNumber=0,this.draw=this.draw.bind(this),this.initiateLevel=this.initiateLevel.bind(this),this.setupLaunchPad=this.setupLaunchPad.bind(this),this.playSpeed={num:1,fractional:!1},this.setPlaySpeed=this.setPlaySpeed.bind(this),this.frameCount=0,this.playSpeedMessage=null}initiateLevel(){if(this.currentLevelNumber+=1,this.currentLevelNumber>=this.levels.length)return this.ball.stopped=!0,this.victoryMessage();const t=new this.levels[this.currentLevelNumber](this);this.ball=t.ball,this.currentPlanet=t.currentPlanet,this.launchPad=t.launchPad,this.planets=t.planets,this.hole=t.hole,this.obstacles=t.obstacles,this.corners=t.corners,this.startButton=t.startButton,this.playSpeed={num:1,fractional:!1},this.canvas.addEventListener("keydown",this.setPlaySpeed,!1),this.startButton||this.setupLaunchPad(),requestAnimationFrame(this.animate.bind(this))}restartLevel(){this.currentLevelNumber-=1,this.initiateLevel()}setPlaySpeed(t){[70,83].includes(t.keyCode)&&(70===t.keyCode&&(this.playSpeed.fractional?[2,3,4].includes(this.playSpeed.num)?this.playSpeed.num-=1:1===this.playSpeed.num&&(this.playSpeed.fractional=!1,this.playSpeed.num=2):[1,2,3].includes(this.playSpeed.num)&&(this.playSpeed.num+=1)),83===t.keyCode&&(this.playSpeed.fractional?[1,2,3].includes(this.playSpeed.num)&&(this.playSpeed.num+=1):[2,3,4].includes(this.playSpeed.num)?this.playSpeed.num-=1:1===this.playSpeed.num&&(this.playSpeed.fractional=!0,this.playSpeed.num=2)),this.playSpeedMessage=new m(`Playspeed: ${this.playSpeed.fractional?(1/this.playSpeed.num).toFixed(2):this.playSpeed.num}`))}victoryMessage(){const t=this.ctx;t.beginPath(),t.fillStyle="white",t.font="30px Arial",t.fillText("You win!",400,400),t.fill()}setupLaunchPad(){let t=this,i=t.canvas,e=t=>this.launchPad.setVelocity(t),s=t=>{this.launchPad.launch()&&(i.removeEventListener("mousemove",e,!1),i.removeEventListener("click",s,!1),i.removeEventListener("keydown",h,!1))},h=a=>{i.removeEventListener("mousemove",e,!1),t.launchPad.setVelocityByArrowKeys(a,()=>{i.removeEventListener("keydown",h,!1),i.removeEventListener("click",s,!1)})};i.addEventListener("mousemove",e,!1),i.addEventListener("keydown",h,!1),i.addEventListener("click",s,!1)}step(t){this.moveObjects(t)}moveObjects(){let{playSpeed:t}=this;if(t.fractional){if(this.frameCount%t.num==0&&(this.ball.move(),!this.ball.checkRectangle(this.corners)))return void this.restartLevel()}else for(let i=1;i<=t.num;i++)if(this.ball.move(),!this.ball.checkRectangle(this.corners))return void this.restartLevel()}animate(t){if(this.hole.checkForWin())return this.ball.stopped=!0,this.initiateLevel();const i=t-this.lastTime;this.step(i),this.draw(),this.lastTime=t,this.frameCount+=1,requestAnimationFrame(this.animate.bind(this))}draw(){let t=this.ctx,i=this.ball;if(t.width=1200,t.height=600,t.fillStyle="black",t.fillRect(0,0,1e3,600),this.launchPad.draw(t),this.hole.drawFlag(t),this.playSpeed.fractional&&this.playSpeed.num>1){const e=this.playSpeed.num,s=this.frameCount%e;i.draw(t,s/e*i.x+(1-s/e)*i.prevx,s/e*i.y+(1-s/e)*i.prevy)}else i.draw(t);this.obstacles.forEach(i=>i.draw(t)),this.hole.drawHole(t),this.planets.forEach(i=>i.draw(t)),this.startButton&&this.startButton.draw(t),this.playSpeedMessage&&this.playSpeedMessage.draw(t)}};document.addEventListener("DOMContentLoaded",t=>{(new w).initiateLevel()})}]);
//# sourceMappingURL=main.js.map