import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 1, 15);

const textureLoader = new THREE.TextureLoader();
const matcapNumber = Math.floor(Math.random() * 8) + 1;
const matcapTexture = textureLoader.load(`/textures/matcaps/${matcapNumber}.png`);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    sizeAttenuation: true
});

const starVertices = [];
for (let i = 0; i < 2000; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const fontLoader = new FontLoader();
const randomTexts = [
    'hi!\n my name is\n Jean Rondon',
    'aprendiendo\nthree.js :D\n SiuuUU!!',
    'learning\nthree.js :D\n yEeEes!!',
    'i love\njavaScript\n <3',
    'i love\nthree.js\n <3',
    'hello\nworld!\n :)',
    'i am frontend\ndeveloper\n :D',
    'soy web\ndeveloper\n :D',
    'hire me!\n i love money too!\n :D',
    'github.com/jeandv',
    'jeanrondon.dev',
    'contact me\n jeanrdev@gmail.com',
    'work \nand create\n with me',
    'chambea \ny crea\n conmigo',
    'camina\n hacia\n el futuro!!',
];

const randomIndex = Math.floor(Math.random() * randomTexts.length);
const randomText = randomTexts[randomIndex];

let textMesh;
const donutMeshes = [];

fontLoader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(randomText, {
            font: font,
            size: 0.5,
            depth: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.08,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        });
        textGeometry.center();

        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

        textMesh = new THREE.Mesh(textGeometry, material);
        scene.add(textMesh);

        for (let i = 0; i < 130; i++) {
            const donut = new THREE.Mesh(donutGeometry, material);
            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;
            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;
            const scale = Math.random();
            donut.scale.set(scale, scale, scale);
            scene.add(donut);
            donutMeshes.push(donut);
        }
    }
);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.5,
    0.2,
    0.85
);
composer.addPass(bloomPass);

const bokehPass = new BokehPass(scene, camera, {
    focus: 3.0,
    aperture: 0.0001,
    maxblur: 0.01
});
composer.addPass(bokehPass);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 0, 3);
scene.add(pointLight);

const cursor = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    cursor.x = (event.clientX / sizes.width - 0.5) * 2;
    cursor.y = -(event.clientY / sizes.height - 0.5) * 2;
});

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    const targetX = cursor.x * 2;
    const targetY = cursor.y * 2;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    if (textMesh) {
        textMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
        textMesh.rotation.y = Math.cos(elapsedTime * 0.5) * 0.05;
    }

    donutMeshes.forEach(donut => {
        donut.position.y += Math.sin(elapsedTime * 0.5 + donut.uuid.charCodeAt(0)) * 0.0005;
        donut.position.x += Math.sin(elapsedTime * 0.5 + donut.uuid.charCodeAt(1)) * 0.0005;
    });

    controls.update();
    composer.render();
    window.requestAnimationFrame(tick);
};

tick();