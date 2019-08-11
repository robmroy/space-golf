import Obstacle from './obstacle';

export const polyFromFunction = function(game, f, g, a, b, step){
    let [t0, t1] = [a, a+ step];
    let result = [];
    while( t1 <= b + .01){
        const obst = new Obstacle(game, f(t0), g(t0), f(t1), g(t1));
        t0 += step;
        t1 += step;
        result.push(obst);
    }
    return result;
}