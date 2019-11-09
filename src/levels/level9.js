import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import {polyFromFunction} from '../obstacles';
import Hole from '../hole';
class Level9 {
    constructor(game){
        const invSqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 550 +12+5, 120 );
        this.corners = [[-55500, -222500], [2225400, 2225100]];
        this.currentPlanet = new StickyPlanet(game, 550, 120, 12, "#27753a", 1, Math.PI/2);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [1, 0],
            Math.PI/2);
        this.planets = [
            this.currentPlanet,
            new StickyPlanet(game, 1120, 1200, 750, "orange", .005)            
        ]
        const ellipse2 = polyFromFunction(game,
            t => 50 + 400* Math.cos(t), t => 400 - 250* Math.sin(t), -.9,    Math.PI, Math.PI/60);
        this.obstacles = [
        ].concat(ellipse2);
        let sqrt = 1/Math.sqrt(2);
        this.hole = new Hole(game, 30, 430,  [0, -1], 480);
        this.viewportStyle = 'centered';
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 500;
        }
}

export default Level9;