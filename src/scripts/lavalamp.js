import * as blobs2 from "blobs/v2";
import * as blobs2Animate from "blobs/v2/animate";

const container = document.getElementById('lava-lamp-container');
// Array
//     .from({length: 10}, () => blobs2.svg(
//         {
//             seed: Math.random(),
//             extraPoints: 8,
//             randomness: 4,
//             size: 500,
//         },
//         {
//             fill: "white", // 🚨 NOT SANITIZED
//             stroke: "black", // 🚨 NOT SANITIZED
//             strokeWidth: 4,
//         }))
//     .forEach(blobSVG => container.innerHTML += blobSVG);

const ctx = document.getElementById('blob-canvas').
const path = blobs2.canvasPath(
    {
        seed: Math.random(),
        extraPoints: 16,
        randomness: 2,
        size: 128,
    },
    {
        offsetX: 16,
        offsetY: 32,
    },
);
ctx.stroke(path);