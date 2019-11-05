import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import {polyFromFunction} from '../obstacles';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';
class Level8 {
    constructor(game){
        const invSqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 350 + (12 + 5)*invSqrt, 120 + (12 + 5)*invSqrt);
        this.corners = [[-500, -500], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 350, 120, 12, "#27753a", 1, Math.PI/2);
        // this.startButton = new StartButton(game, 400, 400);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [invSqrt, invSqrt],
            Math.PI/2);
        this.planets = [
            this.currentPlanet,
            // new StickyPlanet(game, 1050, 300, 20, "orange", 1.2), 
            new StickyPlanet(game, 820, 300, 45, "orange", 3),
            new StickyPlanet(game, 500, 230, 50, "orange", .2),
            // new StickyPlanet(game, 520, 280, 40, "orange", 1),
            new StickyPlanet(game, 500, 310, 15, "orange", 10),
            
        ]
        // const ellipse1 = polyFromFunction(game,
        //     t => 500+ 300* Math.sin(t), t => 290 + 120* Math.cos(t), - .78 * Math.PI, -.4*Math.PI, Math.PI/100);
        const ellipse2 = polyFromFunction(game,
            t => 800+ 300* Math.sin(t), t => 300 + 120* Math.cos(t), -0, 1.01 * Math.PI, Math.PI/100);
        this.obstacles = [
        ].concat(ellipse2);
        let sqrt = 1/Math.sqrt(2);
        this.hole = new Hole(game, 1050, 300,  [-1, 0], 100);
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 500;
        }
}

export default Level8;