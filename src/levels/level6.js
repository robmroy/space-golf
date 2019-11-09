import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import {polyFromFunction} from '../obstacles';
import Hole from '../hole';
class Level6 {
    constructor(game){
        this.ball = new Ball(game, 150 + 5 + 35, 190 );
        this.corners = [[-500, -500], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 150, 190, 35, "#27753a", 1, Math.PI/2);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [1, 0],
            Math.PI/2);
        this.planets = [
            this.currentPlanet
        ];
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