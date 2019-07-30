import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';
import StartButton from '../start_button';
class Level3 {
    constructor(game){
        const invSqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 100 + (25 + 5)*invSqrt, 40 + (25 + 5)*invSqrt);
        this.corners = [[-200, -200], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 100, 40, 25, "#27753a", 1);
        // this.startButton = new StartButton(game, 400, 400);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [invSqrt, invSqrt]);
        this.planets = [
            this.currentPlanet,
            // new StickyPlanet(game, 300, 400, 35), 
            new StickyPlanet(game, 640, 490, 22, "white", 2),
            
        ]
        let sqrt = 1/Math.sqrt(2);
        this.hole = new Hole(game, 740, 420,  [sqrt,-sqrt], 100);
        this.obstacles = [
            // new Obstacle(game, 90, 0, 90, 900)   ,
            new Obstacle(game, 100, 180, 640, 300),
            new Obstacle(game, 360, 100, 650, 270)
        ]
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 500;
        }
}

export default Level3;