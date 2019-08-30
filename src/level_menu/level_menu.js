import LevelDisplay from './level_display';

class LevelMenu {
    constructor(game){
        const levels = game.levels.slice(1);
        this.levelDisplays = levels.map((lvl, idx)=>{
            console.log(200*Math.floor(idx/3))
            return (new LevelDisplay(
                new lvl(game),
         100 + (idx % 3) * 400,  
         10 + 200*Math.floor(idx/3)
         )
         );}
        )

    }

    draw(ctx){
        this.levelDisplays.forEach(ld=>ld.draw(ctx));
    }
}    

export default LevelMenu;
