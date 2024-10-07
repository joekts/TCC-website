import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 15;

const scene = new THREE.Scene();
let mattress;

const loader = new GLTFLoader();

loader.load('mattress.glb',
    function (gltf) {
        mattress = gltf.scene;
        scene.add(mattress);
        mattress.rotation.x = 1.65;
        mattress.rotation.y = 1.1;
        mattress.rotation.z = 0;
    },
    function (xhr) {},
    function (error) {}
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const axis = new THREE.Vector3(0, 1, 0).normalize();
const angle = -0.006;

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    mattress.rotateOnWorldAxis(axis, angle);
};
reRender3D();

