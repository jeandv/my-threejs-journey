import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('onStart');
}

loadingManager.onLoad = () => {
    console.log('onLoad');
}

loadingManager.onProgress = () => {
    console.log('onProgress');
}

loadingManager.onError = () => {
    console.log('onError');
}

// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//     texture.needsUpdate = true;
// }

// image.src = 'textures/door/color.jpg';

// mejor forma de cargar texturas images:
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('textures/door/color.jpg')
const alphaTexture = textureLoader.load('textures/door/alpha.jpg');
const heightTexture = textureLoader.load('textures/door/height.jpg');
const metalnessTexture = textureLoader.load('textures/door/metalness.jpg');
const normalTexture = textureLoader.load('textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg');
const minecraftTexture = textureLoader.load('textures/minecraft.png')

// Transfom textures
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// Filtering and mipmapping
//colorTexture.minFilter = THREE.NearestFilter; // se ve commo mas nitido
minecraftTexture.magFilter = THREE.NearestFilter; // quita lo borroso de una imagen pequeña 

//Nota del uso de NearestFilter: Obtendra una mejor velocidad de fotogramas cuando se use NearestFilter, cuando no te importe el resultado, ejemplo cuando se requiera crear un objeta a distancia usa NearestFilter para mejor resultados y performance y una mejor velocidad de fotogramas (FrameRate)

// const texture = textureLoader.load('textures/door/color.jpg', 
//     () => {
//         console.log('load');
//     },
//     () => {
//         console.log('progress');
//     },
//     () => {
//         console.log('error');
//     },
// );


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: minecraftTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()