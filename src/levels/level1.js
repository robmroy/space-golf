import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';

class Level1 {
    constructor(game){
    this.ball = new Ball(game, 300, 100);
        this.currentPlanet = new StickyPlanet(game, 300, 70, 25, "#27753a", .4);

        this.launchPad = new LaunchPad(game, 300, 100);
        this.planets = [
            this.currentPlanet,
            new StickyPlanet(game, 300, 400, 35), 
            new StickyPlanet(game, 520, 250, 30, "orange"),
           

            
        ]
        this.hole = new Hole(game, 400, 300);
        this.obstacles=[];
        this.obstacles = [
            new Obstacle(game, 90, 0, 90, 900)   ,
            new Obstacle(game, 600, 40, 850, 300)
        ]
        }
}

export default Level1;