import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';
import StartButton from '../start_button';
class Level4 {
    constructor(game){
        const sqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 560 + (25 + 5), 245);
        this.corners = [[-200, -200], [3400, 3100]];
        this.currentPlanet = new StickyPlanet(game, 560, 245, 25, "#27753a", 1);
        this.launchPad = new LaunchPad(game, this.ball.x, this.ball.y, [1, 0]);
        this.planets = [
            this.currentPlanet,
            // new StickyPlanet(game, 300, 400, 35), 
            new StickyPlanet(game, 640, 280, 20, "orange", 1),
            
        ]
        this.hole = new Hole(game, 650, 340,   [sqrt,-sqrt], 100);
        this.obstacles = [
            // new Obstacle(game, 90, 0, 90, 900)   ,
            new Obstacle(game, 250, 280, 640, 280),
            // new Obstacle(game, 360, 100, 650, 270)
        ]
        this.viewportMovementStartX = 700;
        this.viewportMovementStartY = 500;
        }
}

export default Level4;