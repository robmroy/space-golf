import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import Hole from '../hole';
class Level1 {
    constructor(game){
        this.ball = new Ball(game, 300 + 25 + 5, 240 );
        this.corners = [[-200, -200], [1200, 600]];
        this.currentPlanet = new StickyPlanet(game, 300, 240, 25, "#27753a", 1);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [1, 0]);
        this.planets = [
            this.currentPlanet,
        ]
        this.hole = new Hole(game, 680, 435,  [0,-1], 100);
        this.obstacles = [
            new Obstacle(game, 350, 280, 750, 500),
            new Obstacle(game, 750, 150, 750, 500)
        ]
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 500;
        }
}

export default Level1;