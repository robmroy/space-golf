import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import {polyFromFunction} from '../obstacles';
import Hole from '../hole';
class Level7 {
    constructor(game){
        this.ball = new Ball(game, 185, 333 );
        this.corners = [[-500, -500], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 185, 350, 12, "#27753a", 1, Math.PI/2);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [0, -1],
            Math.PI/2);
        this.planets = [
            this.currentPlanet,
            new StickyPlanet(game, 650, 380, 20, "orange", 1.2), 
            new StickyPlanet(game, 500, 430, 35, "orange", 1.2),
        ]
        let sqrt = 1/Math.sqrt(2);
        this.hole = new Hole(game, 535, 270 + 90,  [-1, 0], 100);
        const ellipse = polyFromFunction(game,
            t => 530 +  (26)* t * Math.sin(t), t => 330 + 90+ 27 * t* Math.cos(t), 3.5, 17, Math.PI/100);
        this.obstacles = [
        ]
        this.obstacles.push(...ellipse);
        this.viewportZoom = .75;
        this.viewportX2=1500;
        this.viewportY2=750;
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 1200;
        }
}

export default Level7;