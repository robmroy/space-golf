import Ball from './ball';
import Level1 from './levels/level1';
import Level2 from './levels/level2';
import TimedMessage from './timedMessage';
import Viewport from './viewport';
// import Prando from 'prando';
import fastRandom from 'fast-random';

class Game {

    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.canvas.setAttribute("tabindex", 0);
        this.ctx = this.canvas.getContext("2d");
        this.levels = [null, Level1, Level2];
        this.currentLevelNumber = 0;
        this.draw = this.draw.bind(this);
        this.initiateLevel = this.initiateLevel.bind(this);
        this.setupLaunchPad = this.setupLaunchPad.bind(this);
        this.playSpeed = {num: 1, fractional: false};
        this.setPlaySpeed = this.setPlaySpeed.bind(this);
        this.frameCount = 0;
        this.playSpeedMessage = null;
        this.viewport = new Viewport();
        // {topLeft: {x: 0, y: 0}, bottomRight: {x: 1200, y: 600}, zoom: 100}
    }

    initiateLevel() {

        this.currentLevelNumber += 1;
        
        if (this.currentLevelNumber >= this.levels.length){
            this.ball.stopped = true;
            return this.victoryMessage();
        }
        const level = new this.levels[this.currentLevelNumber](this);
        this.ball = level.ball;
        this.ballInterpolatedX = this.ball.x;
        this.ballInterpolatedY = this.ball.y;
        this.currentPlanet = level.currentPlanet;
        this.launchPad = level.launchPad;
        this.planets=level.planets;
        this.hole = level.hole;
        this.obstacles = level.obstacles;
        this.corners = level.corners;
        this.startButton = level.startButton;
        this.playSpeed = {num: 1, fractional: false};

        this.canvas.addEventListener("keydown", this.setPlaySpeed, false);

        if (!this.startButton){this.setupLaunchPad();}
        requestAnimationFrame(this.animate.bind(this));
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
        this.playSpeedMessage = new TimedMessage(
            `Playspeed: ${this.playSpeed.fractional ? 
                (1/this.playSpeed.num).toFixed(2) : this.playSpeed.num}`);
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

        }}
        let keyDownHandler = e => {
            canvas.removeEventListener('mousemove', setVelocityWithMouse, false);
            game.launchPad.setVelocityByArrowKeys(e, () => {
            canvas.removeEventListener('keydown', keyDownHandler, false); 
            canvas.removeEventListener("click", launchBallWithMouse, false);
            });
        }
        canvas.addEventListener("mousemove", setVelocityWithMouse, false);
        canvas.addEventListener('keydown', keyDownHandler, false);
        canvas.addEventListener("click", launchBallWithMouse, false);
    }
    
    step(delta) {
        this.moveObjects(delta);
        this.setBallInterpolatedPosition();
        this.viewport.moveWithBall(this.ballInterpolatedX, this.ballInterpolatedY);
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
        if (this.hole.checkForWin()){
            this.ball.stopped = true;
            return this.initiateLevel();
        }
        const timeDelta = time - this.lastTime;
        this.step(timeDelta);
        this.draw();
        this.lastTime = time;
        this.frameCount += 1;

        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate.bind(this));
    }

    setBallInterpolatedPosition(){
        const ball = this.ball;
        if (this.playSpeed.fractional && this.playSpeed.num > 1){
            const num = this.playSpeed.num;
            const residue = this.frameCount % num;
            this.ballInterpolatedX =   (residue/num) * ball.x + (1 - residue/num) * ball.prevx;
            this.ballInterpolatedY = (residue/num) * ball.y + (1 - residue/num) * ball.prevy;
        }
        else {
            this.ballInterpolatedX = ball.x;
            this.ballInterpolatedY = ball.y;
        }
    }
    draw() {
        let {ctx, ball, viewport, launchPad, hole, ballInterpolatedX, ballInterpolatedY} = this;
        ctx.width = 1200;
        ctx.height = 600;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1000, 600);
        launchPad.draw(ctx, launchPad.x - viewport.x1, launchPad.y - viewport.y1);
        hole.drawFlag(ctx, hole.x - viewport.x1, hole.y - viewport.y1);
        ball.draw(ctx, ballInterpolatedX - viewport.x1, ballInterpolatedY - viewport.y1);
        this.obstacles.forEach(obstacle => obstacle.draw(ctx, viewport));
        hole.drawHole(ctx, hole.x - viewport.x1, hole.y - viewport.y1);
        this.planets.forEach(planet => 
            planet.draw(ctx, planet.x - viewport.x1, planet.y - viewport.y1));
        if(this.startButton) this.startButton.draw(ctx);
        if (this.playSpeedMessage) this.playSpeedMessage.draw(ctx);

    }

}

export default Game;