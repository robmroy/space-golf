import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import {polyFromFunction} from '../obstacles';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';
import StartButton from '../start_button';
class Level6 {
    constructor(game){
        const invSqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 150 + 5 + 35, 190 );
        this.corners = [[-500, -500], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 150, 190, 35, "#27753a", 1, Math.PI/2);
        // this.startButton = new StartButton(game, 400, 400);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [1, 0],
            Math.PI/2);
        this.planets = [
            this.currentPlanet,
            // new StickyPlanet(game, 700, 250, 35, "orange", 1.2), 
            // new StickyPlanet(game, 440, 200, 30, "orange", 1.2),
            // new StickyPlanet(game, 660, 430, 30, "orange", 1.2),
            
        ]
        let sqrt = 1/Math.sqrt(2);
        this.hole = new Hole(game, 400, 390,  [sqrt,-sqrt], 100);
        const ellipse1 = polyFromFunction(game,
            t => 500+ 300* Math.sin(t), t => 290 + 120* Math.cos(t), - .78 * Math.PI, -.4*Math.PI, Math.PI/100);
        const ellipse2 = polyFromFunction(game,
            t => 500+ 300* Math.sin(t), t => 290 + 120* Math.cos(t), -Math.PI/4 + .5, Math.PI, Math.PI/100);
        this.obstacles = [
        ].concat(ellipse1).concat(ellipse2);
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 500;
        }
}

export default Level6;