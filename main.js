
function myMove() {
  
  const mvw = 600;
  let d = 8;
  let ball = {
    vx: .17,
    vy: .02,
    r: d/2,
    d,
    x: 0,
    y: 200 - d,
    stopped: false
  }

  let g_source={
    x: 304,
    y: 304,
    g: 500
  }
  
  

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
        const dx = ball.x - g_source.x;
        const dy = ball.y - g_source.y;
        const dz2 = ((dx)**2 + (dy)**2);
        const dz = Math.sqrt(dz2);

        if (dz <=  ball.d){
          ball.vx = 0;
          ball.vy=0;
          ball.stopped = true;
        }
        else{
        ball.vx -= (1/dz2)*g_source.g * dx/dz;
        ball.vy -= (1/dz2)*g_source.g * dy/dz;
        }

        elem.style.top = `${ball.y -ball.r}px`; 
        elem.style.left = 
        `${ball.x - ball.r}px`; 

      }
    }
    }
  }

  function myPosition() {
    var elem = document.getElementById("myAnimation");   
        elem.style.top = `550px`;
        elem.style.left = '0px'; 
    
  }