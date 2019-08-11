import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';
import StartButton from '../start_button';
class Level5 {
    constructor(game){
        const invSqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 200 + (35+ 5)*invSqrt, 380 - (35 + 5)*invSqrt);
        this.corners = [[-500, -500], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 200, 380, 35, "#27753a", 1, Math.PI/2);
        // this.startButton = new StartButton(game, 400, 400);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [invSqrt, -invSqrt],
            Math.PI/2);
        this.planets = [
            this.currentPlanet,
            new StickyPlanet(game, 700, 250, 35, "orange", 1.2), 
            new StickyPlanet(game, 440, 200, 30, "orange", 1.2),
            new StickyPlanet(game, 660, 430, 30, "orange", 1.2),
            
        ]
        let sqrt = 1/Math.sqrt(2);
        this.hole = new Hole(game, 720, 330,  [sqrt,-sqrt], 100);
        this.obstacles = [
            // new Obstacle(game, 90, 0, 90, 900)   ,
            // new Obstacle(game, 250, 150, 640, 300),
            // new Obstacle(game, 360, 100, 650, 270)
        ]
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 500;
        }
}

export default Level5;