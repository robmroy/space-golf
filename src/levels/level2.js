import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';

class Level2 {
    constructor(game){
    this.ball = new Ball(game, 600, 440);
        this.currentPlanet = new StickyPlanet(game, 600, 470, 25, "#27753a", 1);
        this.corners = [[-200, -200], [2400, 1900]];
        this.launchPad = new LaunchPad(game, 600, 440, [0, -1]);
        this.planets = [
            this.currentPlanet,
            
        ]
        this.hole = new Hole(game, 640, 320);
        this.obstacles=[];
        // this.obstacles = [
        //     new Obstacle(game, 90, 0, 90, 900)   ,
        //     new Obstacle(game, 600, 40, 850, 300)
        // ]
        }
}

export default Level2;