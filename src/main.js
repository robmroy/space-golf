const error = () => {let m = document.getElementById("myContainer");
let rect = m.getBoundingClientRect();
return {x: rect.x, y: rect.y};
}
function myMove(ball, planet, mvw) {
  
    var elem = document.getElementById("ball");   
    var t = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (t >= 90) {
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
    
    var ball = {
      x: 100,
      y: 100,
      r: 4,
      vx: .05,
      vy: .1,
      d: 8,
      stopped: false
    }
    
    // var arrow=document.getElementById("arrow");
    // arrow.style.top = '100px';
    // arrow.style.left = '100px';

    var launchpad = document.getElementById("launchpad");

    var ballElt = document.getElementById("ball");
    ballElt.style.top = `${ball.y - ball.r}px`;
    ballElt.style.left = `${ball.x - ball.r}px`;

    var launchpad = document.getElementById("launchpad");
    launchpad.style.top = '50px';
    launchpad.style.left = '50px';
    
    

    var myContainer  = document.getElementById("myContainer");

    var svb = e => setVelocity(ball, e);
    launchpad.addEventListener("mousemove", svb);

     
    launchpad.onclick = () => {game1(ball);
      launchpad.removeEventListener("mousemove", svb); 
    } 
  }

  function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coor = "X coords: " + x + ", Y coords: " + y;
    // document.getElementById("demo").innerHTML = coor;
  }
  
  function clearCoor() {
    document.getElementById("demo").innerHTML = "";
  }

  function game1(ball){

    // clearSetVelocity();
    const mvw = 600;
  
  

  let planet={
    x: 304,
    y: 304,
    g: 8
  }


    myMove(ball, planet, mvw);
  }

  function setVelocity(ball, event){

    var dx = event.clientX - error().x - ball.x ;
    var dy = event.clientY - error().y - ball.y ;

    var coor = "Choose Vector. X coords: " + ball.x + ", Y coords: " + ball.y;
    coor += `Vector: [${dx}, ${dy}]`;
    ball.vx = dx/ 1000;
    ball.vy = dy/ 1000;
    
    // document.getElementById("demo").innerHTML = coor;
    console.log(`ball.x=${ball.x}`)
    var c = document.getElementById("launchpad");
    
    
    // c.style.top = ball.y;
    // c.style.left=ball.x;
    var ctx = c.getContext("2d");
    ctx.fillStyle="black";
    ctx.fillRect(0,0,900,600);
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(event.clientX - error().x, event.clientY - error().y);
    ctx.stroke();
  }

  function clearSetVelocity(){
    let box = document.getElementById("box");
    box.removeEventListener("mousemove", setVelocity);
  }