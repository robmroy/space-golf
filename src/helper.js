export const dottedArc = function(ctx, x, y, radius, theta0, theta1, color){
    const a = .1;
    let theta = theta1 - theta0;
    let numPieces = 2* Math.ceil(.5*(theta/a - 1)) + 1;
    let dTheta = theta/numPieces;
    ctx.strokeStyle = color;
    for (let i=0; i < numPieces; i++){ 
        ctx.beginPath();
        if (i % 2 == 0){
            ctx.arc(
                x, y, radius, theta0 + i*dTheta, theta0+(i+1)*dTheta 
                );
                ctx.stroke();
            
        }
    }

}

export const vectorAngle = function(vector){
    const x = vector[0];
    const y = vector[1];
    if (x==0){
        return y > 0 ? Math.PI/2 : -Math.PI/2;
    }
    
    return x > 0 ? Math.atan(y/x) : Math.PI + Math.atan(y/x);
    
}