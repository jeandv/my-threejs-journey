import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = -0.6;
mesh.position.z = 1;

mesh.position.set(-0.7, 0.6, 1); // se pueden agregar todas posiciones a la vez (x, y, z)

scene.add(mesh)

//mesh.position.normalize() // para agregar todas posiciones a 1

console.log(mesh.position.length()) // se obtiene el length es decir su posicion del objeto movido.

// Axes helper - guia para ayudarse a posicionar objetos en el espacio
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper); 

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1

scene.add(camera)

console.log(mesh.position.distanceTo(camera.position)) // se obtiene la posicion que tiene desde la camara


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)