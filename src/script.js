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



/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
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
        //textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        console.time('donuts')
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
        // create 100 dounuts
        for(let i = 0; i < 100; i++)
        {

            const donut = new THREE.Mesh(donutGeometry, donutMaterial)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
        console.timeEnd('donuts')

        console.time('cubes')
        const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
        const cubeMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })

        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight

        for(let i = 0; i < 100; i++)
        {
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

            cube.position.x = (Math.random() - 0.5) * screenWidth
            cube.position.y = (Math.random() - 0.5) * screenHeight
            cube.position.z = (Math.random() - 0.5) * 10

            cube.rotation.x = Math.random() * Math.PI
            cube.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            cube.scale.set(scale, scale, scale)

            scene.add(cube)
        }
        console.timeEnd('cubes')


        // create 100 spheres
        console.time('spheres')
        const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32)
        const sphereMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture6 })

        for(let i = 0; i < 100; i++)
        {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

            sphere.position.x = (Math.random() - 0.5) * 10
            sphere.position.y = (Math.random() - 0.5) * 10
            sphere.position.z = (Math.random() - 0.5) * 10

            sphere.rotation.x = Math.random() * Math.PI
            sphere.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            sphere.scale.set(scale, scale, scale)

            scene.add(sphere)
        }
        console.timeEnd('spheres')

        // create 100 icosahedrons
        console.time('icosahedrons')
        const icosahedronGeometry = new THREE.IcosahedronGeometry(0.3, 0)
        const icosahedronMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })

        for(let i = 0; i < 100; i++)
        {
            const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial)

            icosahedron.position.x = (Math.random() - 0.5) * 10
            icosahedron.position.y = (Math.random() - 0.5) * 10
            icosahedron.position.z = (Math.random() - 0.5) * 10

            icosahedron.rotation.x = Math.random() * Math.PI
            icosahedron.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            icosahedron.scale.set(scale, scale, scale)

            scene.add(icosahedron)
        }
        console.timeEnd('icosahedrons')
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
camera.position.z = 2
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