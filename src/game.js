import Level1 from './levels/level1';
import Level2 from './levels/level2';
import Level3 from './levels/level3';
import Level4 from './levels/level4';
import Level5 from './levels/level5';
import Level6 from './levels/level6';
import Level7 from './levels/level7';
import Level8 from './levels/level8';
import Level9 from './levels/level9';
import TitleSequence from './titleSequence';
import TimedMessage from './timedMessage';
import Viewport from './viewport';
import Stars from './stars';
import Menu from './menu';
import LevelMenu from './level_menu/level_menu';

class Game {

    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.canvas.setAttribute("tabindex", 0);
        this.ctx = this.canvas.getContext("2d");
        this.animating = true;
        this.levels = [null,
            Level1,
            Level2,
            Level3,
            Level4,
            Level5,
            Level6,
            Level7,
            Level8,
            Level9
        ];
        // this.menu = new Menu(this);
        this.currentLevelNumber = 0;
        this.draw = this.draw.bind(this);
        this.initiateLevel = this.initiateLevel.bind(this);
        this.setupLaunchPad = this.setupLaunchPad.bind(this);
        this.playSpeed = { num: 1, fractional: false };
        this.setSpeedAndZoom = this.setSpeedAndZoom.bind(this);
        this.animate = this.animate.bind(this);
        this.frameCount = 0;
        this.vp = new Viewport({});
        this.restartLevel = this.restartLevel.bind(this);
        this.levelControl = this.levelControl.bind(this);
        this.displayKeyCommands = this.displayKeyCommands.bind(this);
        this.switchToLevelMenu = this.switchToLevelMenu.bind(this);
        this.timedMessages = [];
        this.canvas.addEventListener("keydown", this.levelControl);
        window.printo = () => {
            let ball = this.ball;
            console.log(`
            vpx1: ${this.vp.x1},  vpy1: ${this.vp.y1}, zoom: ${this.vp.zoom}`
            )
        }
        // requestAnimationFrame(this.animate.bind(this));
        this.menuReady();
        this.titleSequenceController = new TitleSequence(this);
    }

    start() {
        this.titleSequenceController.start();
    }

    levelControl(event) {
        console.log(event.keyCode);
        if (event.keyCode === 82) this.restartLevel();
        if (event.keyCode === 76) this.switchToLevelMenu();
    }

    switchToLevelMenu() {
        const levelMenu = new LevelMenu(this);
        const { ctx, canvas } = this;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        this.animating = false;
        ctx.clearRect(0, 0, 1200, 600);
        levelMenu.draw(this.ctx);
        levelMenu.installEventListener();
    }

    initiateLevel(levelClass) {
        this.won = false;
        if (!levelClass) {
            this.currentLevelNumber += 1;
            levelClass = this.levels[this.currentLevelNumber];
        }

        const level = new levelClass(this);
        this.level = level;
        this.vp = new Viewport(level);
        this.ball = level.ball;
        this.currentPlanet = level.currentPlanet;
        this.launchPad = level.launchPad;
        this.planets = level.planets || [];
        this.hole = level.hole;
        this.obstacles = level.obstacles || [];
        this.corners = level.corners;
        this.stars = new Stars(this, level, this.currentLevelNumber);
        this.stars.generateBlock(0, 0);
        this.vp.setMovementStartPoints(
            level.viewportMovementUp,
            level.viewportMovementRight,
            level.viewportMovementDown,
            level.viewportMovementLeft);

        this.canvas.addEventListener("keydown", this.setSpeedAndZoom, false);

        if (!this.menu) { this.setupLaunchPad(); }
    }

    restartLevel() {
        this.currentLevelNumber -= 1;
        this.initiateLevel();
    }

    zoomIn() {
        const upperLimitOnZoom = 2;
        let vp = this.vp;
        let zoom = vp.zoom;
        let fixedX = this.ball.interpolateX;
        let fixedY = this.ball.interpolateY;
        if(vp.zoom >= upperLimitOnZoom) {return;}
        const zoomInc = .1;
        vp.x1 = fixedX + (vp.x1 - fixedX) * zoom / (zoom + zoomInc); 
        vp.y1 = fixedY + (vp.y1 - fixedY) * zoom / (zoom + zoomInc);
        vp.zoom = Math.min(vp.zoom + zoomInc, upperLimitOnZoom);
    }
    zoomOut() {
        const lowerLimitOnZoom = .5;
        let vp = this.vp;
        let zoom = vp.zoom;
        let fixedX = this.ball.interpolateX;
        let fixedY = this.ball.interpolateY;
        if(vp.zoom <= lowerLimitOnZoom) {return;}
        const zoomDec = .1;
        vp.x1 = fixedX + (vp.x1 - fixedX) * zoom / (zoom - zoomDec); 
        vp.y1 = fixedY + (vp.y1 - fixedY) * zoom / (zoom - zoomDec);
        vp.zoom = Math.max(vp.zoom - zoomDec, lowerLimitOnZoom);
    }
    setSpeedAndZoom(event) {
        if (![70, 83, 88, 90].includes(event.keyCode)) return;
        if (event.keyCode === 90){
           return this.zoomIn();
        }
        if(event.keyCode === 88){
            return this.zoomOut();
        }
        if (event.keyCode === 70) {
            if (this.playSpeed.fractional) {
                if ([2, 3, 4].includes(this.playSpeed.num)) {
                    this.playSpeed.num -= 1;
                }
                else if (this.playSpeed.num === 1) {
                    this.playSpeed.fractional = false;
                    this.playSpeed.num = 2;
                }
            }
            else {
                if ([1, 2, 3].includes(this.playSpeed.num)) {
                    this.playSpeed.num += 1;
                }
            }
        }
        if (event.keyCode === 83) {
            if (this.playSpeed.fractional) {
                if ([1, 2, 3].includes(this.playSpeed.num)) {
                    this.playSpeed.num += 1;
                }
            }
            else {
                if ([2, 3, 4].includes(this.playSpeed.num)) {
                    this.playSpeed.num -= 1;
                }
                else if (this.playSpeed.num === 1) {
                    this.playSpeed.fractional = true;
                    this.playSpeed.num = 2;
                }
            }
        }
        this.timedMessages = [new TimedMessage(
            `Playspeed: ${this.playSpeed.fractional ?
                (1 / this.playSpeed.num).toFixed(2) : this.playSpeed.num}`)];
    }

    victoryMessage() {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.font = `${30}px Arial`;
        ctx.fillText('You win!',
            400, 400);
        ctx.fill();
    }



    setupLaunchPad() {
        let game = this;
        let canvas = game.canvas;
        let setVelocityWithMouse = e => this.launchPad.setVelocity(e);
        let launchBallWithMouse = e => {
            if (this.launchPad.launch()) {
                canvas.removeEventListener('mousemove', setVelocityWithMouse, false);
                canvas.removeEventListener("click", launchBallWithMouse, false);
                canvas.removeEventListener("keydown", keyDownHandler, false);
                this.launchPad = null;
            }
        }
        let arrowCodes = [37, 38, 39, 40];
        let keyDownHandler = e => {
            if (arrowCodes.includes(e.keyCode)) {
                canvas.removeEventListener('mousemove', setVelocityWithMouse, false);
            }
            game.launchPad.setVelocityByArrowKeys(e, () => {
                canvas.removeEventListener('keydown', keyDownHandler, false);
                canvas.removeEventListener("click", launchBallWithMouse, false);
                this.launchPad = null;
            });
        }

        this.setVelocityWithMouse = setVelocityWithMouse;
        this.keyDownHandler = keyDownHandler;
        this.launchBallWithMouse = launchBallWithMouse;
        canvas.addEventListener("mousemove", this.setVelocityWithMouse, false);
        canvas.addEventListener('keydown', this.keyDownHandler, false);
        canvas.addEventListener("click", this.launchBallWithMouse, false);
    }

    disableLaunchPad() {
        let canvas = this.canvas;
        canvas.removeEventListener('keydown', this.keyDownHandler, false);
        canvas.removeEventListener("click", this.launchBallWithMouse, false);
        canvas.removeEventListener('mousemove', this.setVelocityWithMouse, false);
    }

    menuReady() {
        let canvas = this.canvas;
        canvas.addEventListener('keydown', (e) => {
            if (e.keyCode === 77) {
                this.disableLaunchPad();
                this.menu = new Menu(this)
            }
            if (e.keyCode === 80) {
                if (this.animating) { this.animating = false; }
                else {
                    this.animating = true;
                    requestAnimationFrame(this.animate.bind(this));
                }
            }
        }
            , false);
    }


    step(delta) {
        this.moveObjects(delta);
        this.vp.moveWithBall(this.ball.interpolateX, this.ball.interpolateY,
            this.ball);
        this.timedMessages.forEach(message => {
            message.duration -= 1;
        });
        this.timedMessages = this.timedMessages.filter(message =>
            (message.duration >= 0));
    }

    moveObjects() {
        let { playSpeed } = this;
        if (playSpeed.fractional) {
            if (this.frameCount % playSpeed.num === 0) {
                this.ball.move();
                if (!this.ball.checkRectangle(this.corners)) {
                    this.restartLevel();
                    return;
                }
            }

        }
        else {
            for (let i = 1; i <= playSpeed.num; i++) {
                this.ball.move();
                if (!this.ball.checkRectangle(this.corners)) {
                    this.restartLevel();
                    return;
                }
            }
        }
    }

    animate(time) {
        const timeDelta = time - this.lastTime;
        this.step(timeDelta);
        if (!this.animating) return;
        this.draw();
        this.lastTime = time;
        this.frameCount += 1;

        requestAnimationFrame(this.animate.bind(this));
    }

    displayKeyCommands() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.font = `15px Arial`;
        ctx.fillText('r to restart', 1090, 510);
        ctx.fill();

        ctx.beginPath();
        ctx.fillText('p to pause', 1090, 525);
        ctx.fill();

        ctx.beginPath();
        ctx.fillText('l to select level', 1090, 540);
        ctx.fill();

        ctx.beginPath();
        ctx.fillText('s/f: slow/fast', 1090, 555);
        ctx.fill();

        ctx.beginPath();
        ctx.fillText('z/x: zoom in/out', 1090, 570);
        ctx.fill();
    }


    draw() {
        let { ctx, ball, vp, launchPad, hole } = this;
        // ctx.width = 1200;
        // ctx.height = 600;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.clearRect(0, 0, 1200, 600);
        this.displayKeyCommands();
        if (this.stars) {
            if (this.titleSequenceController) {
                this.titleSequenceController.drawStars(ctx);
            }
            else this.stars.draw(ctx);
        }
        hole.drawFlag(ctx, vp);
        hole.drawHole(ctx, vp);
        this.obstacles.forEach(obstacle => obstacle.draw(ctx, vp));
        ball.draw(ctx);
        this.planets.forEach(planet =>
            planet.draw(ctx, vp));
        this.timedMessages.forEach(message => { message.draw(ctx); })
        if (launchPad) { launchPad.draw(ctx, vp); }
        if (this.won) this.victoryMessage();
        if (!this.titleSequenceController) {
            ctx.fillStyle = "#3e78ad";
            ctx.font = `14px Arial`;
            ctx.fillText(`Velocity_x=${this.ball.vx.toFixed(0)}, Velocity_y=${this.ball.vy.toFixed(0)},
        speed = ${Math.sqrt(this.ball.vx ** 2 + this.ball.vy ** 2).toFixed(0)}`,
                20,
                550);
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(`Level ${this.currentLevelNumber}`,
                20,
                580);
        }
        if (this.menu) this.menu.draw(ctx);
        if (this.titleSequenceController) {
            this.titleSequenceController.draw(ctx);
        }
    }
}

export default Game;