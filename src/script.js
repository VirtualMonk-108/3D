import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'



/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
const axesHelper = new THREE.AxesHelper(5)

//scene.add(axesHelper)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
console.log(matcapTexture)

const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')

const items = [];

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Yauvan',
            {
                font: font, // font is a FontLoader instance
                size: 1.5,
                height: 0.5,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial()
        textMaterial.matcap = matcapTexture8
        textMaterial.flatShading = false
        //textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        // 100 cubes that will move around the screen store in array outside for loop

        for (let i = 0; i < 100; i++) {
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(0.1, 0.1, 0.1),
                new THREE.MeshMatcapMaterial({matcap: matcapTexture5})
            )
            cube.position.x = (Math.random() - 0.5) * 10
            cube.position.y = (Math.random() - 0.5) * 10
            cube.position.z = (Math.random() - 0.5) * 10

            // Assign a random velocity
            cube.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.04,
                (Math.random() - 0.5) * 0.04,
                (Math.random() - 0.5) * 0.04
            );

            scene.add(cube)
            items.push(cube)
        }
        // 100 pyramids like the ones above store in array outside for loop
        for (let i = 0; i < 100; i++) {
            const pyramid = new THREE.Mesh(
                new THREE.ConeGeometry(0.1, 0.1, 4),
                new THREE.MeshMatcapMaterial({matcap: matcapTexture8})
            )
            pyramid.position.x = (Math.random() - 0.5) * 10
            pyramid.position.y = (Math.random() - 0.5) * 10
            pyramid.position.z = (Math.random() - 0.5) * 10

            // Assign a random velocity
            pyramid.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );

            scene.add(pyramid)
            items.push(pyramid)

        }

        // 100 spheres like the ones above
        for (let i = 0; i < 100; i++) {
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 32, 32),
                new THREE.MeshMatcapMaterial({matcap: matcapTexture2})
            )
            sphere.position.x = (Math.random() - 0.5) * 10
            sphere.position.y = (Math.random() - 0.5) * 10
            sphere.position.z = (Math.random() - 0.5) * 10

            // Assign a random velocity
            sphere.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );


            scene.add(sphere)
            items.push(sphere)
        }

    }

)

/**
 * Object
 */



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = -4
camera.position.y = 4
camera.position.z = 6
scene.add(camera)


let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

document.addEventListener('mousemove', onDocumentMouseMove, false);


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

const tick = () => {

    // Update positions
    items.forEach(item => {
        item.position.add(item.velocity);

        // Check for boundaries and bounce back
        const bounds = 5; // Define your boundary size
        if (item.position.x > bounds || item.position.x < -bounds) {
            item.velocity.x *= -1;
        }
        if (item.position.y > bounds || item.position.y < -bounds) {
            item.velocity.y *= -1;
        }
        if (item.position.z > bounds || item.position.z < -bounds) {
            item.velocity.z *= -1;
        }
    });

    const elapsedTime = clock.getElapsedTime()

    // Update camera rotation
    camera.rotation.y += (mouseX - camera.rotation.y) * 0.05;
    camera.rotation.x += (-mouseY - camera.rotation.x) * 0.05;


        // Update camera position
        //updateCameraPosition(elapsedTime);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

