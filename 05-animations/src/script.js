import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Animations
// let velocity = 0.1;

// Time
// let time = Date.now();

// Clock
const clock = new THREE.Clock();

const tick = () => {

    // Time
    //const currentTime = Date.now();
    //const deltaTime = currentTime - time;
    //time = currentTime;

    // Clock
    const elapsedTime = clock.getElapsedTime();

    // Update objects - position, scale, rotation, etc
    //mesh.rotation.y += 0.001 * deltaTime; // usando time
    //mesh.rotation.x += 0.01;

    // mesh.position.z += velocity;

    // if (mesh.position.z > 2 || mesh.position.z < -2)
    //     velocity = -velocity;

    // usando clock
    mesh.rotation.y = elapsedTime * Math.PI;
    mesh.rotation.x = elapsedTime * Math.PI;

    mesh.position.x = Math.cos(elapsedTime);
    mesh.position.y = Math.sin(elapsedTime);


    camera.position.x = Math.cos(elapsedTime);
    camera.position.y = Math.sin(elapsedTime);
    camera.lookAt(mesh.position);

    //  Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}
tick();
