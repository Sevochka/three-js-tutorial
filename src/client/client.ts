import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

const scene: THREE.Scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

var light1 = new THREE.PointLight();
light1.position.set(2.5, 2.5, 2.5)
scene.add(light1);

var light2 = new THREE.PointLight();
light2.position.set(-2.5, 2.5, 2.5)
scene.add(light2);


const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(0.8, 1.4, 1.0)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.screenSpacePanning = true
controls.target.set(0, 1, 0)

let mixer: THREE.AnimationMixer
let modelReady = false;
let animationActions: THREE.AnimationAction[] = new Array()
let activeAction: THREE.AnimationAction
let lastAction: THREE.AnimationAction
const gltfLoader: GLTFLoader = new GLTFLoader();

gltfLoader.load(
  'models/xbot.glb',
  (gltf) => {
    // gltf.scene.scale.set(.01, .01, .01)
    mixer = new THREE.AnimationMixer(gltf.scene);

    let animationAction = mixer.clipAction((gltf as any).animations[0]);
    animationActions.push(animationAction)
    animationsFolder.add(animations, "default")
    activeAction = animationActions[0]

    scene.add(gltf.scene);

    //add an animation from another file
    gltfLoader.load('models/samba.glb',
      (gltf) => {
        console.log("loaded samba")
        let animationAction = mixer.clipAction((gltf as any).animations[0]);
        animationActions.push(animationAction)
        animationsFolder.add(animations, "samba")

        //add an animation from another file
        gltfLoader.load('models/belly.glb',
          (gltf) => {
            console.log("loaded bellydance")
            let animationAction = mixer.clipAction((gltf as any).animations[0]);
            animationActions.push(animationAction)
            animationsFolder.add(animations, "bellydance")

            //add an animation from another file
            gltfLoader.load('models/jump.glb',
              (gltf) => {
                console.log("loaded goofyrunning");
                (gltf as any).animations[0].tracks.shift() //delete the specific track that moves the object forward while running
                let animationAction = mixer.clipAction((gltf as any).animations[0]);
                animationActions.push(animationAction)
                animationsFolder.add(animations, "goofyrunning")

                modelReady = true
              },
              (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
              },
              (error) => {
                console.log(error);
              }
            )
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        console.log(error);
      }
    )
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  },
  (error) => {
    console.log(error);
  }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

var animations = {
  default: function () {
    setAction(animationActions[0])
  },
  samba: function () {
    setAction(animationActions[1])
  },
  bellydance: function () {
    setAction(animationActions[2])
  },
  goofyrunning: function () {
    setAction(animationActions[3])
  },
}

const setAction = (toAction: THREE.AnimationAction) => {
  if (toAction != activeAction) {
    lastAction = activeAction
    activeAction = toAction
    //lastAction.stop()
    lastAction.fadeOut(1)
    activeAction.reset()
    activeAction.fadeIn(1)
    activeAction.play()
  }
}

const gui = new GUI()
const animationsFolder = gui.addFolder("Animations")
animationsFolder.open()

const clock: THREE.Clock = new THREE.Clock()

var animate = function () {
  requestAnimationFrame(animate)

  controls.update()

  if (modelReady) mixer.update(clock.getDelta());

  render()

  stats.update()
};

function render() {
  renderer.render(scene, camera)
}
animate();