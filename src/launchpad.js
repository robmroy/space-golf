class LaunchPad {
    constructor() {
        this.x = 50,
        this.y =50
     }
     
     draw(c) {
        c.save()
        c.beginPath()
        c.arc(this.x, this.x, 50, 0, Math.PI * 2, false)
        c.fillStyle = "red";
        c.fill()
        c.closePath()
        c.restore()
     }
     
     update(c) {
        this.draw(c)
     }
  }

/* Canvas*/		

  class CanvasDisplay {
     constructor() {
        this.canvas = document.getElementById('launchpad');
          this.ctx = this.canvas.getContext('2d');
        this.stageConfig = {
             width: window.innerWidth,
             height: window.innerHeight
        };         
        this.canvas.width = this.stageConfig.width;
        this.canvas.height = this.stageConfig.height;
        this.LaunchPad = new LaunchPad();
     }
     
     animate() {
        this.ctx.clearRect(0, 0, this.stageConfig.width, this.stageConfig.height);
        this.LaunchPad.update(this.ctx)
     }
  }


let canvasDisplay = new CanvasDisplay();
canvasDisplay.animate();