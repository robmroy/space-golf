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
        this.ctx = this.canvas.getContext("2d");
        this.levels = [null, Level1, Level2];
        this.currentLevelNumber = 0;
       
        // this.ball = new Ball(this, 300, 100);
        // this.currentPlanet = new StickyPlanet(this, 300, 70, 25, "#27753a", .4);

        // this.launchPad = new LaunchPad(this, 300, 100);
        // this.planets = [
        //     this.currentPlanet,
        //     new StickyPlanet(this, 300, 400, 35), 
        //     new StickyPlanet(this, 520, 250, 30, "orange"),
        //     new StickyPlanet(this, 620, 450, 30, "orange"),

            
        // ]
        // this.hole = new Hole(this, 700, 600);
        // this.obstacles=[];
        // this.obstacles = [
        //     new Obstacle(this, 90, 0, 90, 900)   ,
        //     new Obstacle(this, 600, 40, 850, 300)
        // ];
        

        this.draw = this.draw.bind(this);
        this.initiateLevel = this.initiateLevel.bind(this);
        this.setupLaunchPad = this.setupLaunchPad.bind(this);
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
        this.setupLaunchPad();
        requestAnimationFrame(this.animate.bind(this));
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
        let func = e => this.launchPad.setVelocity(e);
        this.canvas.onmousemove= func;
        
        this.canvas.addEventListener(
            "click",
            e => {if (this.launchPad.launch()){
                document.getElementById("game-canvas").removeEventListener('mousemove', func);
            }
            })
    }
    
    step(delta) {
        this.moveObjects(delta);
    }

    moveObjects() {
        this.ball.move();
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
    }

}

export default Game;