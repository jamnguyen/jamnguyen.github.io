export default class Ball {
  ctx;
  x;
  orgX;
  y;
  orgY;
  r;
  vx;
  vy;
  strokeColor;
  strokeWidth;
  fillColor;

  constructor (context, x, y, r, options) {
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = 0;
    this.vy = 0;
    
    if (options) {
      if (options.strokeWidth) {
        this.strokeWidth = options.strokeWidth;
        this.strokeColor = options.strokeColor || 'black';
      } else {
        this.strokeWidth = 0;
      }

      this.fillColor = options.fillColor;
    }
  }

  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isClicked(mouseX, mouseY) {
    return Math.abs(mouseX - this.x) <= this.r && Math.abs(mouseY - this.y) <= this.r;
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    if (this.strokeWidth > 0) {
      ctx.lineWidth = this.strokeWidth;
      ctx.strokeStyle = this.strokeColor;
      ctx.stroke();
    }
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }
    ctx.closePath();
  }
}