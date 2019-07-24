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
        ctx.font = `${21}px Arial`;
        ctx.fillText(`Start`, 
       this.x, this.y);
        ctx.fill();
     
        }

    }
    clickHandler(event){
        const cursor = {x: event.clientX -error().x, y: event.clientY - error().y};
        if (
            cursor.x >= this.x && cursor.x <= this.x + 200
            && cursor.y >=this.y && cursor.y <= this.y + 100
            ){
                console.log("successful click");
                this.game.setupLaunchPad();
                this.game.canvas.removeEventListener("click", this.clickHandler, false);
                this.visible = false;
            }
    }


}

export default StartButton;