import { animate } from 'animejs';
import * as blobs2 from "blobs/v2";

class lavaBlob {
    constructor(id, lavaColour, size, container){
        this.id = id;
        this.lavaColour = lavaColour;
        this.size = size;
        this.container = container;
        this.goingUp = true;
        this.containerBounds = this.container.getBoundingClientRect();
        this.minY = this.containerBounds.top - 100;
        this.maxY = this.containerBounds.bottom - 200;
        this.delay = Math.floor(Math.random() * 3000);
    };
    create(){
        this.div = document.createElement('div');
        this.div.className = `blob-div-${this.id}`;
        this.div.style = `height: fit-content; width: fit-content; filter: blur(15px); position: absolute;`;
        this.container.appendChild(this.div);
        const margin = 10;
        const left = margin;
        const right = this.container.clientWidth - this.size - margin;
        this.currentX = Math.floor(Math.random() * (right - left)) + left;
        this.currentY = this.container.clientHeight - margin;
        animate(this.div, {
            x: this.currentX,
            y: this.currentY,
            duration: 0
        });
        this.blobSVG = blobs2.svg(
            {
                seed: Math.random(),
                extraPoints: 4,
                randomness: 5,
                size: this.size
            },
            {
                fill: this.lavaColour
            }
        );
        this.svg = new DOMParser().parseFromString(this.blobSVG, "image/svg+xml").documentElement;
        this.svg.id = `blob-svg-${this.id}`;
        this.div.appendChild(this.svg);
        this.path = this.svg.querySelector('path');   
    };
    morph(){
        let newBlobPathDAttr = blobs2.svgPath({ seed: Math.random(), extraPoints: 4, randomness: 5, size: this.size });
        animate(this.path, {
            d: newBlobPathDAttr,
            duration: 3000,
            ease: 'inOutQuad'
        }).then(() => {  
            this.morph();
        });
    };
    move(){
        const driftRange = 100;
        let newX = Math.random() <= 0.5 ? this.currentX + driftRange : this.currentX - driftRange;
        const speed = Math.floor((1000 - (this.size*10)) + (Math.random() * 100000));
        if(this.goingUp == true){
            animate(this.div, {
                y: {
                    from: this.currentY,
                    to: this.minY,
                    duration: speed,
                    ease: 'easeInCirc',
                },
                x: {
                    from: this.currentX,
                    to: newX,
                    duration: speed,
                    ease: 'inOutQuart'
                },
                delay: this.delay
            }).then(() => {
                this.currentX = newX;
                this.goingUp = !this.goingUp
                this.currentY = this.minY;
                this.delay = 1000 + (Math.random() * 1000);
                this.move();
            });

        }else{
            animate(this.div, {
                y: {
                    from: this.currentY,
                    to: this.maxY,
                    duration: speed*1.5,
                    ease: 'easeOutExpo',
                },
                x: {
                    from: this.currentX,
                    to: newX,
                    duration: speed*1.5,
                    ease: 'inOutQuart'
                },
                delay: this.delay*3
            }).then(() => {
                this.currentX = newX;
                this.goingUp = true;
                this.currentY = this.maxY;
                this.delay = 1000 + (Math.random() * 1000);
                this.move();
            });

        };
    };
    
    init(){
        this.create();
        this.morph();
        this.move();
    };
};

//CREATE LAVA LAMP, FILL WITH BLOBS
const container = document.getElementById('lava-lamp-container');
const colourArr = [
    { "bgColour": "#8f00ff", "lavaColour":"#dc143c" }, //Violet with Red Lava V
    { "bgColour": "#7df9ff", "lavaColour":"#32cd32" }, //Blue with Green Lava V
    { "bgColour": "#fefe22", "lavaColour":"#ff6700" }, //Yellow with Orange Lava V
    { "bgColour": "#3f00ff", "lavaColour":"#ff1493" }, //Blue with Pink Lava V
    { "bgColour": "#8f00ff", "lavaColour":"#f28500" }, //Violet with Orange Lava V
    { "bgColour": "#8f00ff", "lavaColour":"#3f00ff" }, //violet with Turquoise Lava V
    { "bgColour": "#dcdcdc", "lavaColour":"#ff1493" }, //'Clear' with Pink Lava V
    { "bgColour": "#dcdcdc", "lavaColour":"#fefe22" }, //'Clear' with Yellow Lava V
    { "bgColour": "#dcdcdc", "lavaColour":"#32cd32" }, //'Clear' with Green Lava V
];
const randomColourPair = colourArr[Math.round(Math.random() * colourArr.length)];
console.log(randomColourPair);
container.style.backgroundColor = randomColourPair.bgColour;
let blobsArr = [];

//SMALLER BLOBS
let min = 10;
let max = 20;
const randomNumBlobs = Math.round(Math.random() * (max - min)) + min;
for(let i = 0; i < randomNumBlobs; i++){
    const randomSize = Math.round(Math.random() * (400 - 100)) + 100;
    const blob = new lavaBlob(i+1, randomColourPair.lavaColour, randomSize, container);
    blob.init();
    blobsArr.push(blob);
};
//BIGGER BLOBS
for(let i = 0; i < 4; i++){
    const randomSize = Math.round(Math.random() * (600 - 400)) + 100;
    const blob = new lavaBlob(i+randomNumBlobs+1, randomColourPair.lavaColour, randomSize, container);
    blob.init();
    blobsArr.push(blob);
};