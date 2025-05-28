const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let startX = 0;
let startY = 0;
let savedStates = [];
let drawingMode = 'freehand';
let lastX, lastY;

function resizeCanvas() {
  const canvas = document.getElementById('drawingCanvas');

  canvas.width = window.innerWidth * 0.8; 
  canvas.height = window.innerHeight * 0.6; 
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
function getPosition(event) {
  if (event.touches && event.touches.length > 0) {
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: event.touches[0].clientX - rect.left,
      offsetY: event.touches[0].clientY - rect.top
    };
  } else {
    return {
      offsetX: event.offsetX,
      offsetY: event.offsetY
    };
  }
}

function startDrawing(e) {
  const pos = getPosition(e);
  isDrawing = true;
  startX = pos.offsetX;
  startY = pos.offsetY;
  if (drawingMode === 'freehand') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  } else {
    saveState();
  }
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getPosition(e);
  const currentX = pos.offsetX;
  const currentY = pos.offsetY;
  lastX = currentX;
  lastY = currentY;

  if (drawingMode === 'freehand') {
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }
}



  
  let animating = false;
  let animationFrameId;
  
  function animateShapeDrawing(x1, y1, x2, y2, shape) {
    if (animating) {
      cancelAnimationFrame(animationFrameId);
    }
    animating = true;
  
    const steps = 30;
    let stepCount = 0;
  
    const stepX = (x2 - x1) / steps;
    const stepY = (y2 - y1) / steps;
    let currentX = x1;
    let currentY = y1;
  
    function animateStep() {
      if (stepCount < steps) {
        stepCount++;
        currentX += stepX;
        currentY += stepY;

        ctx.putImageData(savedStates[savedStates.length - 1], 0, 0);
  

        drawShape(x1, y1, currentX, currentY, shape);

        animationFrameId = requestAnimationFrame(animateStep);
      } else {
        animating = false;
      }
    }
  
    animateStep();
  }
  
  function drawShape(x1, y1, x2, y2, shape) {
    if (animating) {

      switch (shape) {
        case 'circle':
          drawCircle(x1, y1, x2, y2);
          break;
        case 'square':
          drawSquare(x1, y1, x2, y2);
          break;
        case 'triangle':
          drawTriangle(x1, y1, x2, y2);
          break;
      }
    } else {

      animateShapeDrawing(x1, y1, x2, y2, shape);
    }
  }

  function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    if (drawingMode !== 'freehand') {

      animateShapeDrawing(startX, startY, lastX, lastY, drawingMode);
    } else {

      saveState();
    }
  }

function drawCircle(x1, y1, x2, y2) {
  let radius = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawSquare(x1, y1, x2, y2) {
  let sideLength = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  ctx.beginPath();
  ctx.rect(x1, y1, sideLength, sideLength);
  ctx.stroke();
}

function drawTriangle(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x1 * 2 - x2, y2);
  ctx.closePath();
  ctx.stroke();
}

function saveState() {
  savedStates.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undoLast() {
  if (savedStates.length === 0) return;
  savedStates.pop();
  if (savedStates.length === 0) {
    clearCanvas();
  } else {
    ctx.putImageData(savedStates[savedStates.length - 1], 0, 0);
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  savedStates = [];
}

function saveCanvas() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'my-drawing.png';
  link.href = dataURL;
  link.click();
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);


canvas.addEventListener('touchstart', function(e) {
  e.preventDefault(); 
  startDrawing(e);
}, false);
canvas.addEventListener('touchmove', function(e) {
  e.preventDefault(); 
  draw(e);
}, false);
canvas.addEventListener('touchend', function(e) {
  e.preventDefault();
  stopDrawing();
}, false);
canvas.addEventListener('touchcancel', function(e) {
  e.preventDefault();
  stopDrawing();
}, false);


document.getElementById('drawFreehand').addEventListener('click', () => drawingMode = 'freehand');
document.getElementById('drawCircle').addEventListener('click', () => drawingMode = 'circle');
document.getElementById('drawSquare').addEventListener('click', () => drawingMode = 'square');
document.getElementById('drawTriangle').addEventListener('click', () => drawingMode = 'triangle');


canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);


document.getElementById('clearCanvas').addEventListener('click', clearCanvas);
document.getElementById('undoCanvas').addEventListener('click', undoLast);
document.getElementById('saveCanvas').addEventListener('click', saveCanvas);


ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#000';
ctx.lineWidth = 5;
saveState(); 