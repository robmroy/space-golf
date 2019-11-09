import Ball from '../ball';
import LaunchPad from '../launchpad';
import StickyPlanet from '../Sticky_planet';
import {polyFromFunction} from '../obstacles';
import Hole from '../hole';
class TitleLevel {
    constructor(game){
        this.splash = true;
        const invSqrt = 1/Math.sqrt(2);
        this.ball = new Ball(game, 812, 190 );
        this.ball.stopped = false;
        this.ball.vx = -1.6;
        this.ball.vy = 3.1;
        this.ball.winHandler = this.winHandler.bind(this.ball);
        this.viewportStyle = "stopped";
        this.corners = [[-55500, -222500], [2225400, 2225100]];
        this.currentPlanet = new StickyPlanet(game, -1000, 120, 12, "black", .0001, Math.PI/2);
        this.launchPad = new LaunchPad(game, -1000, this.ball.y, [0, 1],
            Math.PI/2);
        this.planets = [
            this.currentPlanet,
        ]
        const ellipse1 = polyFromFunction(game,
            t => 790 + 34* Math.cos(t), t => 155 + 48* Math.sin(t), .55,    1.75*Math.PI, Math.PI/60,
            "orange", 2);
        const ellipse2 = polyFromFunction(game,
            t => 910 + 45* Math.cos(t), t => 155 + 59* Math.sin(t), .5,    1.8*Math.PI, Math.PI/60,
            "orange", 25);

        this.obstacles = [
        ].concat(ellipse1);
        this.hole = new Hole(game, 860, 222,  [0, -1], 100);
        }
        winHandler(){
        const game = this.game;
        game.titleSequenceController.winHandler();
                
    }

}

export default TitleLevel;