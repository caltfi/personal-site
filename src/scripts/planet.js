import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const container = document.getElementById('planet-container');
const w = container.clientWidth;
const h = container.clientHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);
const loader  = new THREE.TextureLoader();

//SPACE
const spaceTexture = loader.load(
    '/assets/images/planettextures/outerspace.jpg',
    () => {
      spaceTexture.mapping = THREE.EquirectangularReflectionMapping;
      spaceTexture.colorSpace = THREE.SRGBColorSpace;
      scene.background = spaceTexture;
});

//EARTH
const earthGeometry = new THREE.SphereGeometry(1, 1024, 1024);
const earthTexture  = loader.load('/assets/images/planettextures/earthmap.jpg');
const normTexture = loader.load('/assets/images/planettextures/earthnormal.png');
const surface     = new THREE.MeshStandardMaterial({map: earthTexture});
surface.normalMap = normTexture;
const earth = new THREE.Mesh(earthGeometry, surface);
earth.rotation.z += 0.03;
scene.add(earth);

//MOON
const moonGeometry = new THREE.SphereGeometry(0.08, 512, 512);
const moonTexture  = loader.load(`/assets/images/planettextures/moon.jpg`);
const moonNormTexture = loader.load('/assets/images/planettextures/moonnormal.jpg');
const moonSurface     = new THREE.MeshStandardMaterial({map: moonTexture});
moonSurface.normalMap = moonNormTexture;
const moon           = new THREE.Mesh( moonGeometry, moonSurface );
const point = new THREE.Object3D();
point.position.y = 1.5;
point.position.x = 1.5;
earth.add(point);
point.add(moon);

//SUN
const sunGeometry = new THREE.SphereGeometry(2, 512, 512);
const sunSurface = new THREE.MeshStandardMaterial();
const sun = new THREE.Mesh( sunGeometry, sunSurface );
sunSurface.emissive = new THREE.Color(0xcdffff);
sunSurface.emissiveIntensity = 300;
sun.position.set(150,-6,0);
scene.add(sun);


//CLOUDS
const cloudGeometry = new THREE.SphereGeometry(1.01, 1024, 1024);
const cloudTexture = loader.load('/assets/images/planettextures/clouds.png');
const cloudSurface = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.15
});
const clouds = new THREE.Mesh(cloudGeometry, cloudSurface);
scene.add(clouds);

//LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.02));
const sunLight = new THREE.SpotLight(0xcdffff, 6500);
sunLight.position.set(50,-6,0);
sunLight.target = earth;
scene.add(sunLight);
const moonLight = new THREE.SpotLight(0xffffff, 1000);
moonLight.position.set(20,0,0);
moonLight.target = moon;
scene.add(moonLight);

//cameracontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.target = earth.position;
controls.update();

//ACTION
function animate() {
    requestAnimationFrame(animate);
    clouds.rotation.y += 0.005;
    earth.rotation.y += 0.003;
    renderer.render(scene, camera);
    controls.update();
}
animate();
//RESIZE
window.addEventListener('resize', () => {
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});