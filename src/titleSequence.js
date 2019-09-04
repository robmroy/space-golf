import TitleLevel from './levels/titleLevel';
class TitleSequence {
    constructor(game){
        this.game = game;
        this.start = this.start.bind(this);
        this.textRGB=[75,45,0];
        this.phase = 0;
        this.starRGB = [0,0,0];
        }
        start(){
            const game = this.game;

            game.initiateLevel(TitleLevel);
            requestAnimationFrame(this.game.animate);
        }

        draw(ctx){
            if (this.phase === 1){
                let currentColor = this.textRGB.slice();
            const newRed = Math.min(255, currentColor[0]+2);
            this.textRGB=[newRed, Math.floor(newRed * 165/255), 0]; 
            let brightness = this.starRGB[0];
            let newBrightness = Math.min(brightness + 2, 255);
            this.starRGB = [newBrightness, newBrightness, newBrightness];
            }
            ctx.fillStyle = 
            `rgb(${this.textRGB[0]},${this.textRGB[1]},${this.textRGB[2]})`;
            ctx.font = `bold 180px Arial`; 
            if(this.phase === 1){
                ctx.font = `bold 180px Arial`;    
                ctx.fillText("SPACE", 485, 220);                 
            }
            ctx.fillText("GOLF", 500, 400);

        }

        drawStars(ctx){
            const rgb = this.starRGB;
            const colorStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            this.game.stars.draw(ctx, colorStr);

        }

        winHandler(){
            this.phase = 1;
            const game = this.game;
            const ctx = game.ctx;
            // game.animating = false;
        }
}

export default TitleSequence;