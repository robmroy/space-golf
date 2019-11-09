import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Hole from '../hole';

class Level2 {
    constructor(game){
    this.ball = new Ball(game, 600, 300);
        this.currentPlanet = new StickyPlanet(game, 600, 330, 25, "#27753a", 1);
        this.corners = [[-200, -800], [2400, 1900]];
        this.launchPad = new LaunchPad(game, 600, 300, [0, -1]);
        this.planets = [
            this.currentPlanet,
        ]
        this.hole = new Hole(game, 640, 180);
        this.obstacles=[];
        }
}

export default Level2;