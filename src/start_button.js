const error = () => {let m = document.getElementById("game-canvas");
let rect = m.getBoundingClientRect();
return {x: rect.x, y: rect.y};
}
class StartButton{
    constructor(game, x, y){
        this.game = game;
        this.clickHandler = this.clickHandler.bind(this);
        game.canvas.addEventListener("click", this.clickHandler);
        this.visible = true;
        this.x =x;
        this.y = y;
    }
    draw(ctx){
        if(this.visible){
            ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.font = `${25}px Arial`;
        ctx.fillText(`Start`, 
       this.x, this.y);
        ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.moveTo(this.x - 20, this.y+10);
            ctx.lineTo(this.x - 20, this.y - 25);
            ctx.lineTo(this.x + 75, this.y - 25);
            ctx.lineTo(this.x + 75, this.y + 10 );
            ctx.lineTo(this.x - 20, this.y + 10);
            ctx.stroke();
        }

    }
    clickHandler(event){
        const cursor = {x: event.clientX -error().x, y: event.clientY - error().y};
        if (
            cursor.x >= this.x -20 && cursor.x <= this.x + 75
            && cursor.y >=this.y - 25 && cursor.y <= this.y + 10
            ){
                this.game.setupLaunchPad();
                this.game.canvas.removeEventListener("click", this.clickHandler, false);
                this.visible = false;
            }
    }


}

export default StartButton;