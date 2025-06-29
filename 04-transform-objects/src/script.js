import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group() // para crear grupos y agregar objetos poder posicionarlos, escalarlos, rotarlos, etc juntos
scene.add(group);

group.position.y = 0;
group.scale.y = 1.4;
group.rotation.y = 1;

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
group.add(cube2);

cube2.position.x = 2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
group.add(cube3);

cube3.position.x = -2;

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// mesh.position.x = 0.7
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// mesh.position.set(0.6, -0.3, 1); // se pueden agregar todas posiciones a la vez (x, y, z)

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.3;
// mesh.scale.z = 0.4;
// mesh.scale.set(2, 0.3, 0.4);

// Rotation
// mesh.rotation.reorder('YXZ'); // reordena los axes a nuestro gusto para rotar en el orden que se desee
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;

//mesh.position.normalize() // para agregar todas posiciones a 1

// console.log(mesh.position.length()) // se obtiene el length es decir su posicion del objeto movido.

// Axes helper - guia para ayudarse a posicionar objetos en el espacio
const axesHelper = new THREE.AxesHelper();
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

// console.log(mesh.position.distanceTo(camera.position)) // se obtiene la posicion que tiene desde la camara

// camera.lookAt(mesh.position); // para posicionar la camara donde tiene que mirar en el espacio.

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)