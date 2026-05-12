import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)

camera.position.z = 40

const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.style.margin = 0
document.body.style.overflow = 'hidden'
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03
controls.autoRotate = true
controls.autoRotateSpeed = 0.05

const loader = new THREE.TextureLoader()

const imageItems = [
  {
    path: '/images/img_01.jpg',
    title: 'PLX DATA MATRIX 01',
    caption: 'Ocean plastic transformed into digital structure.',
    year: '2026'
  },
  {
    path: '/images/img_02.jpg',
    title: 'PLX DATA MATRIX 02',
    caption: 'Memory fragments floating in digital space.',
    year: '2026'
  },
  {
    path: '/images/img_03.jpg',
    title: 'PLX DATA MATRIX 03',
    caption: 'Plastic as future archaeological data.',
    year: '2026'
  },
  {
    path: '/images/img_04.jpg',
    title: 'PLX DATA MATRIX 04',
    caption: 'Image universe generated from collected waste.',
    year: '2026'
  },
  {
    path: '/images/img_05.jpg',
    title: 'PLX DATA MATRIX 05',
    caption: 'A contradiction between cleanup and attraction.',
    year: '2026'
  }
]

const meshes = []

for (let i = 0; i < 100; i++) {

  const item =
    imageItems[Math.floor(Math.random() * imageItems.length)]

  const texture = loader.load(item.path)

  const geometry = new THREE.PlaneGeometry(4, 4)

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  })

  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = (Math.random() - 0.5) * 200
  mesh.position.y = (Math.random() - 0.5) * 200
  mesh.position.z = (Math.random() - 0.5) * 200

  mesh.rotation.x = Math.random() * Math.PI
  mesh.rotation.y = Math.random() * Math.PI

  mesh.userData = item

  scene.add(mesh)
  meshes.push(mesh)

  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
    duration: 20 + Math.random() * 20,
    repeat: -1,
    ease: 'none'
  })
}

const starsGeometry = new THREE.BufferGeometry()
const starsCount = 3000

const positions = new Float32Array(starsCount * 3)

for (let i = 0; i < starsCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 1000
}

starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)

const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.7
})

const stars = new THREE.Points(
  starsGeometry,
  starsMaterial
)

scene.add(stars)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('click', (event) => {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(meshes)

  if (intersects.length > 0) {

    const item = intersects[0].object.userData

    showOverlay(item)
  }
})

function showOverlay(item) {

  let overlay = document.getElementById('overlay')

  if (!overlay) {

    overlay = document.createElement('div')
    overlay.id = 'overlay'

    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.background = 'white'
    overlay.style.display = 'flex'
    overlay.style.flexDirection = 'column'
    overlay.style.justifyContent = 'center'
    overlay.style.alignItems = 'center'
    overlay.style.zIndex = '9999'
    overlay.style.padding = '40px'
    overlay.style.boxSizing = 'border-box'

    document.body.appendChild(overlay)
  }

  overlay.innerHTML = `
    <img 
      src="${item.path}" 
      style="
        max-width:80%;
        max-height:70%;
        object-fit:contain;
        margin-bottom:30px;
      "
    />

    <h1 style="
      color:black;
      font-family:sans-serif;
      margin:0;
    ">
      ${item.title}
    </h1>

    <p style="
      color:black;
      font-family:sans-serif;
      max-width:700px;
      text-align:center;
      line-height:1.7;
    ">
      ${item.caption}
    </p>

    <p style="
      color:gray;
      font-family:sans-serif;
    ">
      ${item.year}
    </p>

    <button id="closeButton"
      style="
        padding:12px 24px;
        border:none;
        background:black;
        color:white;
        cursor:pointer;
        font-size:16px;
      "
    >
      CLOSE
    </button>
  `

  document
    .getElementById('closeButton')
    .addEventListener('click', () => {
      overlay.remove()
    })
}

function animate() {

  requestAnimationFrame(animate)

  scene.rotation.y += 0.00015

  controls.update()

  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {

  camera.aspect =
    window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  )
})