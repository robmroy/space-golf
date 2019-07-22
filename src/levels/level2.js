import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import Obstacle from '../obstacle';
import BouncyPlanet from '../bouncy_planet';
import Hole from '../hole';

class Level2 {
    constructor(game){
        console.log('level2');
    this.ball = new Ball(game, 300, 100);
        this.currentPlanet = new StickyPlanet(game, 300, 70, 25, "#27753a", .4);

        this.launchPad = new LaunchPad(game, 300, 100);
        this.planets = [
            this.currentPlanet,
            new StickyPlanet(game, 300, 400, 35), 
            new StickyPlanet(game, 520, 250, 30, "orange"),
            new StickyPlanet(game, 620, 450, 30, "orange"),

            
        ]
        this.hole = new Hole(game, 700, 500);
        this.obstacles=[];
        this.obstacles = [
            new Obstacle(game, 90, 0, 90, 900)   ,
            new Obstacle(game, 600, 40, 850, 300)
        ]
        }
}

export default Level2;