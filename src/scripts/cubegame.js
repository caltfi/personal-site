import * as THREE from 'three';
const scene = new THREE.Scene();
scene.background = new THREE.Color().setHex( 0x112233 );
const loader = new THREE.TextureLoader();
const container = document.getElementById('cube-game-container');
const w = container.clientWidth;
const h = container.clientHeight;
const camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 1000);
camera.position.z = 2.3;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

// //mousemove controls
// let mouseX = 0;
// let mouseY = 0;
// let userInteracting = false;
// let mouseMoveTimeout;
// //touch controls
// let touchStartX = 0;
// let touchStartY = 0;

//Cube Geometry
const geometry = new THREE.BoxGeometry();
const materials = [
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex( 0xffffff ) }),   //0
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex( 0xffffff ) }),     //1
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex( 0xffffff ) }),       //2
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex( 0xffffff ) }),      //3
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex( 0xffffff ) }), //4 (front)
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex( 0xffffff ) })    //5 (back)
  ];
let currentFace = 0;
materials.forEach((face, index) => {
    console.log(
        `FACE NUMBER ${index} - COLOUR: RGB(${((face.color.r)*100).toFixed()},${((face.color.g)*100).toFixed()},${((face.color.b)*100).toFixed()}) - CURRENT FACE IS ${currentFace}`
        );
    currentFace++
});

// for (let i = 0; i < materials.length; i++) {
//     materials[i] = new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex( 0xf94949 ) });
//     console.log(
//         `COLOUR: RGB(${materials[i].color.r},${materials[i].color.g},${materials[i].color.b})`
//         );
// }
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

//Animate
function animate() {
    requestAnimationFrame(animate);

    // if(userInteracting)
    // {
    //     const targetY = mouseX * Math.PI * 3;
    //     const targetX = -mouseY * Math.PI * 1.5;

    //     cube.rotation.y += (targetY - cube.rotation.y) * 0.03;
    //     cube.rotation.x += (targetX - cube.rotation.x) * 0.03;
    // }
    // else
    // {
    //     cube.rotation.x += 0.003;
    //     cube.rotation.y += 0.003;
    // }

    cube.rotation.x += 0.003;
    cube.rotation.y += 0.003;

    renderer.render(scene, camera);
}
animate();
  
//Handle resize
window.addEventListener('resize', () => {
    renderer.setSize(w, h);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  });