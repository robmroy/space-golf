import StartButton from "./start_button";

class Menu{
    constructor(game){
        this.color = '#e8e4da';
        this.game = game;
        this.startButton = new StartButton(game, 500, 350);
    }

    draw(ctx, x = 400, y = 100) {
        const levels = this.game.levels;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(
         x, y, x+200, y+250
        );
        ctx.stroke();
        ctx.fill();
        // ctx.font = `${Math.floor(.9 * r)}px Arial`;
          ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.font = `${18}px Arial`;
        ctx.fillText(`Use mouse or arrow keys to select launch direction. Click to launch.`, 
       x + 30, y + 40);
        ctx.fillText(`Use 's' or 'f' for slower or faster playspeed, and 'p' to pause.`, 
       x + 30, y + 80);
        ctx.fillText(`Pressing 'r' restarts the current level.`, 
       x + 30, y + 120);
        ctx.fillText(`Press 'm' to return to this menu.`, 
       x + 30, y + 160);
        
    //      `${y + .5 * r + this.game.ball.radius}`);
        ctx.fill();
        this.startButton.draw(ctx);
        }
}

export default Menu;