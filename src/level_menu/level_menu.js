import LevelDisplay from './level_display';
const error = () => {let m = document.getElementById("game-canvas");
let rect = m.getBoundingClientRect();
return {x: rect.x, y: rect.y};
}

class LevelMenu {
    constructor(game){
        this.game = game;
        const levels = game.levels.slice(1);
        const perSide = Math.ceil(Math.sqrt(levels.length));
        this.perSide = perSide;
        this.draw = this.draw.bind(this);
        this.installEventListener = this.installEventListener.bind(this);
        this.removeEventListener = this.removeEventListener.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        const scale = 1/perSide;
        this.levelDisplays = levels.map((lvl, idx)=>{
            return (new LevelDisplay(
                new lvl(game),
          (idx % perSide) * 1200/perSide,  
         600 *scale* Math.floor(idx/perSide), scale
         )
         );}
        )
    }

    installEventListener(){
        this.game.canvas.addEventListener(
            "click", this.clickHandler
        )
    }

    clickHandler(event){
        const perSide = this.perSide;
        const cursor = {x: event.clientX -error().x, y: event.clientY - error().y};
        const i = Math.floor(perSide * cursor.x/1200);
        const j = Math.floor(perSide * cursor.y/600);
        const levelNumber = 1 + i + j * perSide;
        this.game.currentLevelNumber = levelNumber - 1;
        this.game.animating = true;
        this.game.animate();
        this.game.initiateLevel();
        this.removeEventListener();
    }

    removeEventListener(){
        this.game.canvas.removeEventListener(
            "click", this.clickHandler
        )
    }

    draw(ctx){
        ctx.strokeStyle = 'white';
        const perSide = this.perSide;
        for (let i=1; i<perSide; i++){
            ctx.beginPath();
            ctx.moveTo(0, i*600/perSide);
            ctx.lineTo(1200, i*600/perSide);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(i*1200/perSide, 0);
            ctx.lineTo(i*1200/perSide, 600);
            ctx.stroke();
        }
        this.levelDisplays.forEach(ld=>ld.draw(ctx));
    }
}    

export default LevelMenu;
