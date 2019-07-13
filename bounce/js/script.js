import { CONFIG } from './config.js';
import Ball from './ball.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var ballsData = [
  {
    x: 100,
    y: CONFIG.BLACK_BOX_HEIGHT + CONFIG.BALL_RADIUS,
    r: CONFIG.BALL_RADIUS
  }
];
var balls = [];
var currentT;
var deltaT = 0;
const ga = CONFIG.GRAVITATIONAL_ACCELERATION;

var mouseEvent;
var mouseDowned;
var mouseOrgX;
var mouseOrgY;
var ballDragging = false;

// -----------------------------------------
// PREPARE
// -----------------------------------------
const updateCanvasSize = () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

const makeUpBackground = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, CONFIG.BLACK_BOX_HEIGHT);
  context.fillRect(0, canvas.height - CONFIG.BLACK_BOX_HEIGHT, canvas.width, CONFIG.BLACK_BOX_HEIGHT);
}

const initBalls = () => {
  for (let data of ballsData) {
    balls.push(new Ball(context, data.x, data.y, data.r, { strokeWidth: CONFIG.BALL_STROKE_WIDTH }));
  }
}

const updateBalls = () => {
  for (let ball of balls) {
    if (ballDragging || mouseEvent && ball.isClicked(mouseEvent.clientX, mouseEvent.clientY)) {
      if (!ballDragging) {
        ball.orgX = ball.x;
        ball.orgY = ball.y;
      }
      ballDragging = true;

      ball.vx = 0;
      ball.vy = 0;
      
      ball.x = ballDragging ? (ball.orgX + mouseEvent.clientX - mouseOrgX) : ball.x;
      ball.y = ballDragging ? (ball.orgY + mouseEvent.clientY - mouseOrgY) : ball.y;
    } else {
      ball.vy = ga * deltaT * CONFIG.BALL_MASS + ball.vy;
  
      const dx = deltaT * ball.vx;
      const dy = deltaT * ball.vy;
  
      ball.x += dx;
      ball.y += dy;
    }

  }
}

const drawBalls = () => {
  for (let ball of balls) {
    ball.draw();
  }
}

// Mouse event handling
const handleMouseDown = (e) => {
  mouseEvent = e;
  mouseOrgX = e.clientX;
  mouseOrgY = e.clientY;
  mouseDowned = true;
}

const handleMouseMove = (e) => {
  if (mouseDowned) {
    mouseEvent = e;
  }
}

const handleMouseUp = (e) => {
  mouseEvent = null;
  mouseDowned = false;
  ballDragging = false;
}

const main = () => {
  deltaT = currentT ? ((performance.now() - currentT)) : 0;
  currentT = performance.now();
  makeUpBackground();
  updateBalls();
  drawBalls();
  window.requestAnimationFrame(main);
}

// -----------------------------------------
// START
// -----------------------------------------
updateCanvasSize();
window.addEventListener(
  'resize',
  updateCanvasSize
);

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

initBalls();
window.requestAnimationFrame(main);