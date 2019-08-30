import LevelDisplay from './level_display';

class LevelMenu {
    constructor(game){
        const levels = game.levels.slice(1);
        const perSide = Math.ceil(Math.sqrt(levels.length));
        this.perSide = perSide;
        const scale = 1/perSide;
        this.levelDisplays = levels.map((lvl, idx)=>{
            console.log(200*Math.floor(idx/perSide))
            return (new LevelDisplay(
                new lvl(game),
          (idx % perSide) * 1200/perSide,  
         600 *scale* Math.floor(idx/perSide), scale
         )
         );}
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
