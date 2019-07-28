import fastRandom from 'fast-random';

class Stars {
    constructor(level){
        this.topLeft = {x: level[corners][0]-600, y: level[corners][0]-300};
        this.bottomRight = {x: level[corners][1]+600, y: level[corners][1]+300};
    }
}