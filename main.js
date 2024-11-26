import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Galaxy Background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Sun
const sunTexture = textureLoader.load('./assets/textures/sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, -50);
scene.add(sun);

// Earth
const earthTexture = textureLoader.load('./assets/textures/earth.jpg');
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earthGeometry = new THREE.SphereGeometry(3, 32, 32);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(-10, 5, -60);
scene.add(earth);

// Moon
const moonTexture = textureLoader.load('./assets/textures/moon.jpg');
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moonGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(10, -5, -40);
scene.add(moon);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Scroll Animations with GSAP
gsap.to(sun.position, {
    z: 0,
    scrollTrigger: {
        trigger: '#content',
        start: 'top top',
        end: '50% top',
        scrub: true,
    },
});

gsap.to(earth.position, {
    x: 0,
    z: -20,
    scrollTrigger: {
        trigger: '#content',
        start: '25% top',
        end: '75% top',
        scrub: true,
    },
});

gsap.to(moon.position, {
    x: 0,
    z: 0,
    scrollTrigger: {
        trigger: '#content',
        start: '50% top',
        end: '100% top',
        scrub: true,
    },
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;

    renderer.render(scene, camera);
}
animate();
