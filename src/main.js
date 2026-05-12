import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'gsap'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const world = new THREE.Group()
scene.add(world)

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)

camera.position.z = 90

const renderer = new THREE.WebGLRenderer({
  antialias: false
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

document.body.style.margin = 0
document.body.style.overflow = 'hidden'
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.enablePan = true
controls.enableZoom = true

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

const imagePaths = [
  '/images/img_01.jpg',
  '/images/img_02.jpg',
  '/images/img_03.jpg',
  '/images/img_04.jpg',
  '/images/img_05.jpg'
]

const loader = new THREE.TextureLoader()

const textures = imagePaths.map((path) => {
  const tex = loader.load(path)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
})

const cards = []
const CARD_COUNT = 50

for (let i = 0; i < CARD_COUNT; i++) {
  const imageIndex = i % imagePaths.length

  const geometry = new THREE.PlaneGeometry(8, 8)

  const material = new THREE.MeshBasicMaterial({
    map: textures[imageIndex],
    transparent: true,
    side: THREE.DoubleSide
  })

  const card = new THREE.Mesh(geometry, material)

  card.userData.imagePath = imagePaths[imageIndex]

  card.position.set(
    randomRange(-120, 120),
    randomRange(-120, 120),
    randomRange(-120, 120)
  )

  const scale = randomRange(0.7, 2.0)
  card.scale.set(scale, scale, scale)

  world.add(card)
  cards.push(card)

  gsap.to(card.position, {
    y: card.position.y + randomRange(-8, 8),
    duration: randomRange(5, 12),
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
}

const starGeometry = new THREE.BufferGeometry()
const starCount = 800
const positions = []

for (let i = 0; i < starCount; i++) {
  positions.push(
    randomRange(-500, 500),
    randomRange(-500, 500),
    randomRange(-500, 500)
  )
}

starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(positions, 3)
)

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.5
})

const stars = new THREE.Points(starGeometry, starMaterial)
world.add(stars)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

function openImageOnWhiteBackground(imagePath) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Image View</title>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100%;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          img {
            max-width: 100vw;
            max-height: 100vh;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${imagePath}">
      </body>
    </html>
  `

  const newWindow = window.open('', '_blank')
  newWindow.document.write(html)
  newWindow.document.close()
}

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const hits = raycaster.intersectObjects(cards)

  if (hits.length > 0) {
    const imagePath = hits[0].object.userData.imagePath
    openImageOnWhiteBackground(imagePath)
  }
})

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  world.rotation.y += 0.00015
  world.rotation.x += 0.00004

  for (const card of cards) {
    card.lookAt(camera.position)
  }

  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})