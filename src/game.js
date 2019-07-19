import Ball from './ball';
import Obstacles from './obstacles';
import Planets from './planets';

class Game {

    constructor(level) {
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        console.dir(this.canvas.ctx);

        this.ball = new Ball(this, 50, 50);
        this.draw = this.draw.bind(this);
        // this.planets = new Planets(level);
        // this.launchpad = new LaunchPad(level);
        // this.obstacles = new Obstacles(level);
    }
    start() {
        // this.bindKeyHandlers();
        // this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }
    step(delta) {
        this.moveObjects(delta);
    }

    moveObjects() {

    }
    animate(time) {
        const timeDelta = time - this.lastTime;
        console.log(`animate!`);
        this.step(timeDelta);
        this.draw();
        this.lastTime = time;

        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate.bind(this));
    }
    draw() {
        let game= this;
        console.log(`game ctx: ${game.ctx}`);
        this.ball.draw(game.ctx);
    }

}

export default Game;