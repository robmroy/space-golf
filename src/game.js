import Level1 from './levels/level1';
import Level2 from './levels/level2';
import Level3 from './levels/level3';
import Level4 from './levels/level4';
import Level5 from './levels/level5';
import Level6 from './levels/level6';
import Level7 from './levels/level7';
import Level8 from './levels/level8';
import TimedMessage from './timedMessage';
import Viewport from './viewport';
import Stars from './stars';
import Menu from './menu';

class Game {

    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.canvas.setAttribute("tabindex", 0);
        this.ctx = this.canvas.getContext("2d");
        this.animating = true;
        this.levels = [null, 
            Level1, 
            Level2,
            Level3,
            Level4,
            Level5,
            Level6,
            Level7,
            Level8
        ];
        this.menu = new Menu(this);
        this.currentLevelNumber = 0;
        this.draw = this.draw.bind(this);
        this.initiateLevel = this.initiateLevel.bind(this);
        this.setupLaunchPad = this.setupLaunchPad.bind(this);
        this.playSpeed = {num: 1, fractional: false};
        this.setPlaySpeed = this.setPlaySpeed.bind(this);
        this.frameCount = 0;
        this.vp = new Viewport();
        this.restartLevel = this.restartLevel.bind(this);
        this.keyRestart = this.keyRestart.bind(this);
        this.timedMessages = [];
        this.canvas.addEventListener("keydown", this.keyRestart);
        window.printo = () => {
        let ball = this.ball;
        console.log(`ballx: ${ball.x}, bpx: ${ball.prevx}, 
            balldrawX: ${ball.drawX}, ballInterX: ${ball.interpolateX}
            viewportx1: ${this.vp.x1} viewporty1: ${this.vp.y1}`
            )}
            requestAnimationFrame(this.animate.bind(this));
        // this.launchBallWithMouse = this.launchBallWithMouse.bind(this);
        // this.setVelocityWithMouse = this.setVelocityWithMouse.bind(this);
        this.menuReady();
    }
    keyRestart(event){
        if (event.keyCode === 82) this.restartLevel();
    }
    initiateLevel() {
        
        this.currentLevelNumber += 1;
        

        this.vp = new Viewport();
        const level = new this.levels[this.currentLevelNumber](this);
        this.ball = level.ball;
        this.currentPlanet = level.currentPlanet;
        this.launchPad = level.launchPad;
        this.planets=level.planets || [];
        this.hole = level.hole;
        this.obstacles = level.obstacles || [];
        this.corners = level.corners;
        // this.playSpeed = {num: 1, fractional: false};
        this.stars = new Stars(level);
        this.stars.generateBlock(0, 0);
        this.vp.setMovementStartPoints(
            level.viewportMovementUp,
            level.viewportMovementRight,
            level.viewportMovementDown,
            level.viewportMovementLeft);

        this.canvas.addEventListener("keydown", this.setPlaySpeed, false);

        if (!this.menu){this.setupLaunchPad();}
    }

    restartLevel() {
        this.currentLevelNumber -= 1;
        this.initiateLevel();
    }

    setPlaySpeed(event){
        if (![70,83].includes(event.keyCode)) return;
        if (event.keyCode === 70){
            if (this.playSpeed.fractional){
                if ([2,3,4].includes(this.playSpeed.num)) {
                    this.playSpeed.num -= 1;
                }
                else if (this.playSpeed.num === 1) {
                    this.playSpeed.fractional = false;
                    this.playSpeed.num = 2;
                }   
            }
            else {
                if ([1,2,3].includes(this.playSpeed.num)) {
                    this.playSpeed.num += 1;
            }
            }
        }
        if (event.keyCode === 83) {
            if (this.playSpeed.fractional){
                if ([1,2,3].includes(this.playSpeed.num)) {
                    this.playSpeed.num += 1;
                }
            }
            else {
                if ([2,3,4].includes(this.playSpeed.num)) {
                    this.playSpeed.num -=1;
                }
                else if (this.playSpeed.num === 1){
                    this.playSpeed.fractional = true;
                    this.playSpeed.num = 2;
                }
            }
        } 
        this.timedMessages = [ new TimedMessage(
            `Playspeed: ${this.playSpeed.fractional ? 
                (1/this.playSpeed.num).toFixed(2) : this.playSpeed.num}`)];
    }
    
    victoryMessage(){
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.font = `${30}px Arial`;
        ctx.fillText('You win!', 
       400, 400);
        ctx.fill();
    }

    
        
    setupLaunchPad(){
        let game = this;
        let canvas = game.canvas;
        let setVelocityWithMouse = e => this.launchPad.setVelocity(e);
        let launchBallWithMouse =  e => {if (this.launchPad.launch()){
            canvas.removeEventListener('mousemove', setVelocityWithMouse, false);
            canvas.removeEventListener("click", launchBallWithMouse, false);
            canvas.removeEventListener("keydown", keyDownHandler, false);
            this.launchPad = null;

        }}
        let arrowCodes = [37, 38, 39, 40];
        let keyDownHandler = e => {
            if (arrowCodes.includes(e.keyCode)){
            canvas.removeEventListener('mousemove', setVelocityWithMouse, false);}
            game.launchPad.setVelocityByArrowKeys(e, () => {
            canvas.removeEventListener('keydown', keyDownHandler, false); 
            canvas.removeEventListener("click", launchBallWithMouse, false);
            this.launchPad = null;
            });
        }

        this.setVelocityWithMouse = setVelocityWithMouse;
        this.keyDownHandler = keyDownHandler;
        this.launchBallWithMouse = launchBallWithMouse;
        canvas.addEventListener("mousemove", this.setVelocityWithMouse, false);
        canvas.addEventListener('keydown', this.keyDownHandler, false);
        canvas.addEventListener("click", this.launchBallWithMouse, false);
    }
    
    disableLaunchPad(){
        let canvas = this.canvas;
        canvas.removeEventListener('keydown', this.keyDownHandler, false); 
        canvas.removeEventListener("click", this.launchBallWithMouse, false);
        canvas.removeEventListener('mousemove', this.setVelocityWithMouse, false);
    }

    menuReady(){
        let canvas = this.canvas;
        canvas.addEventListener('keydown', (e) => {
            if (e.keyCode === 77){
            this.disableLaunchPad();
            this.menu = new Menu(this)}
            if(e.keyCode === 80){
                if(this.animating){this.animating = false;}
                else{
                    this.animating = true;
                    requestAnimationFrame(this.animate.bind(this));
                }
            }
        }
        , false);
                
    }

    
    step(delta) {
        this.moveObjects(delta);
        this.vp.moveWithBall(this.ball.interpolateX, this.ball.interpolateY,
            this.ball);
        this.timedMessages.forEach(message => {
            message.duration -= 1;
        });
        this.timedMessages = this.timedMessages.filter(message => 
           (message.duration >= 0) );

    }

    moveObjects() {
        let {playSpeed} = this;
        if (playSpeed.fractional){
            if (this.frameCount % playSpeed.num ===0 ){
                this.ball.move();
              if (!this.ball.checkRectangle(this.corners)){
                this.restartLevel();
                return;
                 }
            }

        }
        else {
            for (let i = 1; i <= playSpeed.num; i++) {
                this.ball.move();
              if (!this.ball.checkRectangle(this.corners)){
                this.restartLevel();
                return;
                 }
            }
        }
    }

    animate(time) {
        const timeDelta = time - this.lastTime;
        this.step(timeDelta);
        this.draw();
        this.lastTime = time;
        this.frameCount += 1;

        // every call to animate requests causes another call to animate
        if(this.animating)
        requestAnimationFrame(this.animate.bind(this));
    }

    
    draw() {
        let {ctx, ball, vp, launchPad, hole} = this;
        
        ctx.width = 1200;
        ctx.height = 600;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1200, 600);
        if (this.stars){
            for(let i=Math.floor(vp.x1/1000); i<= Math.ceil(vp.x2/1000); i++){
                for (let j=Math.floor(vp.y1/1000); j<=Math.ceil(vp.y2/1000); j++){
                    if (!this.stars.getBlock(i, j)){
                        this.stars.generateBlock(i, j)
                    }
                    this.stars.drawBlock(ctx, i, j, vp);
                }
            }
        }
        hole.drawFlag(ctx, hole.x - vp.x1, hole.y - vp.y1);
        ball.draw(ctx);
        hole.drawHole(ctx, hole.x - vp.x1, hole.y - vp.y1);
        this.obstacles.forEach(obstacle => obstacle.draw(ctx, vp));
        this.planets.forEach(planet => 
            planet.draw(ctx, planet.x - vp.x1, planet.y - vp.y1));
        // if(this.startButton) this.startButton.draw(ctx);
        // if (this.playSpeedMessage) this.playSpeedMessage.draw(ctx);
        this.timedMessages.forEach( message => {message.draw(ctx);})
        if(launchPad) {launchPad.draw(ctx);}
        if(this.won) this.victoryMessage();
        ctx.beginPath();
        ctx.fillStyle = "#3e78ad"
        ctx.font = `${14}px Arial`;
        ctx.fillText(`Velocity_x=${this.ball.vx.toFixed(0)}, Velocity_y=${this.ball.vy.toFixed(0)},
        speed = ${Math.sqrt(this.ball.vx ** 2 + this.ball.vy **2).toFixed(0)}`, 
        20,
         20);
        //  console.log(Math.sqrt(this.ball.vx ** 2 + this.ball.vy **2).toFixed(0));
        ctx.fill();
            if (this.menu) this.menu.draw(ctx);

    }

}

export default Game;