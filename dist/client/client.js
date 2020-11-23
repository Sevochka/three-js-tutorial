import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
// set bg of the scene - scene.background = new THREE.Color('red');
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const camera2 = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 10);
const camera3 = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 10);
const camera4 = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 10);
const canvas = document.getElementById('c');
const canvas2 = document.getElementById('c2');
const canvas3 = document.getElementById('c3');
const canvas4 = document.getElementById('c4');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(200, 200);
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer2.setSize(200, 200);
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 });
renderer3.setSize(200, 200);
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 });
renderer4.setSize(200, 200);
const controls = new OrbitControls(camera, renderer.domElement);
const controls2 = new OrbitControls(camera, renderer2.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 2;
camera2.position.y = 2;
camera2.lookAt(new THREE.Vector3(0, 0, 0));
camera3.position.z = 2;
camera4.position.z = 2;
camera4.lookAt(new THREE.Vector3(0, 0, 0));
const animate = function () {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    controls2.update();
    renderer.render(scene, camera);
    renderer2.render(scene, camera2);
    renderer3.render(scene, camera3);
    renderer4.render(scene, camera4);
};
animate();
