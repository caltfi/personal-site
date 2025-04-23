let previousMouseX, previousMouseY, brushWidth;
let isPainting = false;

const container = document.querySelector('.canvas-container');
const canvas = document.createElement('canvas');
canvas.id = 'paint-canvas';
//canvas.style.backgroundColor = '#fff';
canvas.style.border = '8px solid rgb(210, 183, 142)';
canvas.style.borderRadius = '2px';
const canWidth = window.getComputedStyle(container).width;
const canHeight = window.getComputedStyle(container).height;
const w = Math.floor(Number(canWidth.substring(0, canWidth.length - 2)));
const h = Math.floor(Number(canHeight.substring(0, canHeight.length - 2)));
canvas.setAttribute('width', w);
canvas.setAttribute('height', h);
container.appendChild(canvas);
const ctx = canvas.getContext("2d");
clearCanvas();
let pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const colourButtons = Array.from(document.querySelectorAll('.colour-btn'));
let chosenColour = colourButtons[0].dataset.colour;
let colourName = colourButtons[0].id;
console.log("Colour is: ", colourName, ' ', chosenColour);
const clearButton = document.querySelector('.clear');
const saveButton = document.querySelector('.save');
const brushWidthSlider = document.querySelector('#brush-width-slider');
setBrushWidth();

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
function changeColour(){
    colourName = this.id;
    chosenColour = this.dataset.colour;
    console.log("Colour is: ", colourName, ' ', chosenColour);
}
function setBrushWidth(){
    brushWidth = brushWidthSlider.value;
    console.log('Brush width: ', brushWidth);
}
function clearCanvas(){
    ctx.fillStyle = "rgb(255,239,213)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared!");
}
function saveImage(){
    let currentDate = new Date();
    let dateStamp = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
    let uuid = crypto.randomUUID();
    const link = document.createElement("a");
    link.download = `${dateStamp}_${uuid.slice(0, 7)}.jpg`;
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
}

colourButtons.forEach((button) => { button.addEventListener('click', changeColour); });
brushWidthSlider.addEventListener('change', setBrushWidth);
clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveImage);
canvas.addEventListener("mouseover", () => { canvas.style.cursor = `url('/assets/cursors/paint_cursor_${colourName}.svg'), auto` });
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mousemove", painting);
document.addEventListener("mouseup", () => isPainting = false);