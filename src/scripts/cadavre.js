let previousMouseX, previousMouseY;
let isPainting = false;
let brushWidth = 5;
let chosenColour = "#000";

const container = document.querySelector('.canvas-container');
const canvas = document.createElement('canvas');
canvas.id = 'paint-canvas';
canvas.style.backgroundColor = '#fff';
canvas.style.border = '2px solid black';
canvas.style.borderRadius = '2px';
const canWidth = window.getComputedStyle(container).width;
const canHeight = window.getComputedStyle(container).height;
const w = Math.floor(Number(canWidth.substring(0, canWidth.length - 2)));
const h = Math.floor(Number(canHeight.substring(0, canHeight.length - 2)));
canvas.setAttribute('width', w);
canvas.setAttribute('height', h);
container.appendChild(canvas);
const ctx = canvas.getContext("2d");
let pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);

function startPaint(event){
    isPainting = true;
    previousMouseX = event.offSetX;
    previousMouseY = event.offSetY;

    ctx.beginPath();
    ctx.lineWidth   = brushWidth;
    ctx.strokeStyle = chosenColour;
    ctx.fillStyle   = chosenColour;
    pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
function painting(event){
    if (isPainting == false){return};
    ctx.putImageData(pixelData, 0, 0);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mousemove", painting);
canvas.addEventListener("mouseup", () => isPainting = false);