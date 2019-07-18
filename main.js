
function myMove(ball, planet, mvw) {
  
    var elem = document.getElementById("ball");   
    var t = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (t >= 30) {
        clearInterval(id);
      } else {
        t+=.1; 

        if (!ball.stopped){
        ball.x += t* ball.vx;
        ball.y += t* ball.vy;
        const dx = ball.x - planet.x;
        const dy = ball.y - planet.y;
        const dz2 = ((dx)**2 + (dy)**2);
        const dz = Math.sqrt(dz2);

        if (dz <=  ball.d){
          ball.vx = 0;
          ball.vy=0;
          ball.stopped = true;
        }
        else{
        ball.vx -= (1/dz2)*planet.g * dx/dz;
        ball.vy -= (1/dz2)*planet.g * dy/dz;
        }

        elem.style.top = `${ball.y -ball.r}px`; 
        elem.style.left = 
        `${ball.x - ball.r}px`; 

      }
    }
    }
  }

  function setup() {
    var elem = document.getElementById("ball");   
        elem.style.top = `550px`;
        elem.style.left = '0px'; 
    
  }

  function game1Setup(){
    var elem = document.getElementById("game1-start"); 
    elem.style.display = "block"; 
  }
  function game1(){
    const mvw = 600;
  let d = 8;
  let ball = {
    vx: .05,
    vy: .1,
    r: d/2,
    d,
    x: 0,
    y: 200 - d,
    stopped: false
  }

  let planet={
    x: 304,
    y: 304,
    g: 500
  }
    myMove(ball, planet, mvw);
  }