import Ball from './ball';
import LaunchPad from './launchpad';
import StickyPlanet from './Sticky_planet';
import Obstacle from './obstacle';
import BouncyPlanet from './bouncy_planet';
import Hole from './hole';
import Level1 from './levels/level1';
import Level2 from './levels/level2';

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
    }

    initiateLevel() {

        this.currentLevelNumber += 1;
        if (this.currentLevelNumber >= this.levels.length){
            this.ball.stopped = true;
            return this.victoryMessage();
        }
        const level = new this.levels[this.currentLevelNumber](this);
        this.ball = level.ball;
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
    draw() {
        let ctx=this.ctx;
        ctx.width = 1200;
        ctx.height = 600;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1000, 600);
        this.launchPad.draw(ctx);
        this.hole.drawFlag(ctx);
        this.ball.draw(ctx);
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
        this.hole.drawHole(ctx);
        this.planets.forEach(planet => planet.draw(ctx));
        if(this.startButton) this.startButton.draw(ctx);
    }

}

export default Game;