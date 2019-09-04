import TitleLevel from './levels/titleLevel';
class TitleSequence {
    constructor(game){
        this.game = game;
        this.start = this.start.bind(this);
        }
        start(){
            const game = this.game;
            game.initiateLevel(TitleLevel);
            requestAnimationFrame(this.game.animate);
        }

        winHandler(){console.log('titleseq winhandle');
        console.log(this.game.levels.length)
            const game = this.game;
            const ctx = game.ctx;
            game.animating = false;
            ctx.fillStyle = "orange";
            ctx.font = `bold 180px Arial`;    
            ctx.fillText("SPACE", 485, 220);
            ctx.fillText("GOLF", 500, 400);
            ctx.fill();
        }
}

export default TitleSequence;