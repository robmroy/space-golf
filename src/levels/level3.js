import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import Hole from '../hole';
class Level3 {
    constructor(game){
        const invSqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 100 + (25 + 5)*invSqrt, 40 + (25 + 5)*invSqrt);
        this.corners = [[-200, -200], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 100, 40, 25, "#27753a", 1);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [invSqrt, invSqrt]);
        this.planets = [
            this.currentPlanet,
            new StickyPlanet(game, 640, 490, 22, "orange", 2),
            
        ]
        let sqrt = 1/Math.sqrt(2);
        this.hole = new Hole(game, 720, 420,  [sqrt,-sqrt], 100);
        this.obstacles = [
            new Obstacle(game, 250, 150, 640, 340),
        ]
        }
}

export default Level3;