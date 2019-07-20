import Ball from './ball';
import LaunchPad from './launchpad';
import Obstacles from './obstacles';
import Planets from './planets';
import Planet from './planet';
import Obstacle from './obstacle';

class Game {

    constructor(level) {
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.ball = new Ball(this, 300, 50);
        this.draw = this.draw.bind(this);
        this.launchPad = new LaunchPad(this, 250);
        this.start = this.start.bind(this);
        this.planets = [
            new Planet(this, 300, 520, 22,  "red"), 
            new Planet(this, 620, 250, 15)
        ]
            this.obstacles=[];
        this.obstacles = [new Obstacle(this, 800, 100, 600, 400)];
        // this.planets = new Planets(level);
        // this.launchpad = new LaunchPad(level);
        // this.obstacles = new Obstacles(level);
    }
    start() {
        // this.bindKeyHandlers();
        // this.lastTime = 0;
        let func = e => this.launchPad.setVelocity(this.ball, e);
        this.canvas.addEventListener(
            'mousemove', 
        func
        )
        this.canvas.addEventListener(
            "click",
            e => {this.launchPad.launch();
                document.getElementById("game-canvas").removeEventListener('mousemove', func);
            })
        requestAnimationFrame(this.animate.bind(this));
    }
    step(delta) {
        this.moveObjects(delta);
    }

    moveObjects() {
        this.ball.move();
    }
    animate(time) {
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
        this.ball.draw(ctx);
        this.planets.forEach(planet => planet.draw(ctx));
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
    }

}

export default Game;