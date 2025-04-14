import * as THREE from 'three';

const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

const container = document.getElementById('cube-container');
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

//mousemove controls
let mouseX = 0;
let mouseY = 0;
let userInteracting = false;
let mouseMoveTimeout;
//touch controls
let touchStartX = 0;
let touchStartY = 0;

const shadowTexture = loader.load('/assets/images/shadow.png');

const shadowMaterial = new THREE.MeshBasicMaterial({
  map: shadowTexture,
  transparent: true,
  opacity: 0.3,
  depthWrite: false // optional: makes it always render under cube
});

const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  shadowMaterial
);
// Rotate it slightly upward
shadowPlane.rotation.x = -Math.PI / 3.5; // ~-51.4 degrees — tweak as needed

// Move it back and down a bit
shadowPlane.position.z = -0.6;
shadowPlane.position.y = -0.4; // just beneath the cube
scene.add(shadowPlane);


//Texture Loading for Cube
let highlightedFaceIndex = null;
const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('/assets/images/work.png') }),   //0
    new THREE.MeshBasicMaterial({ map: loader.load('/assets/images/about.png') }),     //1
    new THREE.MeshBasicMaterial({ map: loader.load('/assets/images/work.png') }),       //2
    new THREE.MeshBasicMaterial({ map: loader.load('/assets/images/about.png') }),      //3
    new THREE.MeshBasicMaterial({ map: loader.load('/assets/images/laptop_cube.png') }), //4 (front)
    new THREE.MeshBasicMaterial({ map: loader.load('/assets/images/about.png') })    //5 (back)
  ];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// Face-index-to-link mapping
const faceLinks = {
    0: "/work/",
    1: "/about/",
    2: "/work/",
    3: "/about/",
    4: "/work/",
    5: "/about/"
};


//================EVENT LISTENERS=============================

//click event for links of cube
window.addEventListener('click', (event) => {
    // Normalize mouse position [-1, 1]
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    const intersects = raycaster.intersectObject(cube, true);
  
    if (intersects.length > 0) {
      const faceIndex = Math.floor(intersects[0].faceIndex / 2);
      const link = faceLinks[faceIndex];
      if (link) {
        window.location.href = link;
      }
    }
  });


container.addEventListener('mousemove', (event) => {
    //detect user movement
    userInteracting = true;

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
  
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube, true);
    
    if (intersects.length > 0) {
      const faceIndex = Math.floor(intersects[0].faceIndex / 2);

          // Highlight hovered face (any face)
        if (highlightedFaceIndex !== faceIndex) {
            if (highlightedFaceIndex !== null) {
                cube.material[highlightedFaceIndex].color.set(0xffffff); // reset old
            }
            cube.material[faceIndex].color.set(0xfdfd96); //tint colour
            highlightedFaceIndex = faceIndex;
        }

      if (faceLinks[faceIndex]) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    } else {
        // No intersection: reset highlight and cursor
        if (highlightedFaceIndex !== null) {
            cube.material[highlightedFaceIndex].color.set(0xffffff);
            highlightedFaceIndex = null;
        }
        document.body.style.cursor = "default";
    }

    //reset timeout to revert to idle mode
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
      userInteracting = false;
      mouseX = 0;
      mouseY = 0;
    }, 1000);
  });

  container.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    userInteracting = true;
  });
  
  container.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
  
    // Normalize values to [-1, 1]
    mouseX = deltaX / window.innerWidth;
    mouseY = deltaY / window.innerHeight;
  
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
      userInteracting = false;
      mouseX = 0;
      mouseY = 0;
    }, 1000);
  });

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

//Cube Geometry
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 2.3;

//Animate
function animate() {
    requestAnimationFrame(animate);
  
    if(userInteracting)
    {
        cube.rotation.y += ((mouseX * Math.PI * 3) - cube.rotation.y) * 0.03;
        cube.rotation.x += ((mouseY * Math.PI * 1.5) - cube.rotation.x) * 0.03;
    }
    else
    {
        cube.rotation.x += 0.003;
        cube.rotation.y += 0.003;
    }
  
    renderer.render(scene, camera);
  }
  animate();
  

//Handle resize
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  