class TimedMessage{
    constructor(text, duration = 60, color, font = '30px Arial', x = 400, y = 300) {
        this.text = text;
        this.duration = duration;
        this.font = font;
        this.x = x;
        this.y = y;
        this.color = color || "#3e78ad";
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, 
        this.x,
        this.y);
        ctx.fill();
    }
}

export default TimedMessage;