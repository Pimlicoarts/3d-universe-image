import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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

renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 1.5)
)

document.body.appendChild(
  renderer.domElement
)

const controls = new OrbitControls(
  camera,
  renderer.domElement
)

controls.enableDamping = true
controls.dampingFactor = 0.03

controls.autoRotate = true
controls.autoRotateSpeed = 0.05

const imageLoader =
  new THREE.TextureLoader()

// ======================================================
// CONTENTS
// ======================================================

const contentItems = [

  // ======================================================
  // VIDEO
  // ======================================================

  {
    type: 'video',
    path: '/videos/vid_01.MP4',
    title: 'VIDEO 01',
    category: 'VIDEO',
    caption: 'Moving image archive.',
    year: '2026'
  },

  {
    type: 'video',
    path: '/videos/vid_02.MP4',
    title: 'VIDEO 02',
    category: 'VIDEO',
    caption: 'Experimental visual sequence.',
    year: '2026'
  },

  {
    type: 'video',
    path: '/videos/vid_03.MP4',
    title: 'VIDEO 03',
    category: 'VIDEO',
    caption: 'Video fragment floating in digital space.',
    year: '2026'
  },

  {
    type: 'video',
    path: '/videos/vid_04.MP4',
    title: 'VIDEO 04',
    category: 'VIDEO',
    caption: 'Motion texture inside the PLX universe.',
    year: '2026'
  },

  {
    type: 'video',
    path: '/videos/vid_05.MP4',
    title: 'VIDEO 05',
    category: 'VIDEO',
    caption: 'Moving memory in the image universe.',
    year: '2026'
  },

  // ======================================================
  // PHYSICAL
  // ======================================================

  {
    type: 'image',
    path: '/physical/phy_01.jpg',
    title: 'memoryPACK 01',
    category: 'PHYSICAL',
    caption: 'Ocean plastic transformed into physical sculpture.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/physical/phy_02.jpg',
    title: 'memoryPACK 02',
    category: 'PHYSICAL',
    caption: 'Material memories collected from the ocean.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/physical/phy_03.jpg',
    title: 'PHYSICAL 03',
    category: 'PHYSICAL',
    caption: 'A physical work made from plastic material.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/physical/phy_04.jpg',
    title: 'PHYSICAL 04',
    category: 'PHYSICAL',
    caption: 'Object archive from Pimlico Arts.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/physical/phy_05.jpg',
    title: 'PHYSICAL 05',
    category: 'PHYSICAL',
    caption: 'Physical plastic memory object.',
    year: '2026'
  },

  // ======================================================
  // IMAGE
  // ======================================================

  {
    type: 'image',
    path: '/images/img_01.jpg',
    title: 'PLX DATA MATRIX 01',
    category: 'IMAGE',
    caption: 'Ocean plastic transformed into digital structure.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/images/img_02.jpg',
    title: 'PLX DATA MATRIX 02',
    category: 'IMAGE',
    caption: 'Memory fragments floating in digital space.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/images/img_03.jpg',
    title: 'PLX DATA MATRIX 03',
    category: 'IMAGE',
    caption: 'Plastic as future archaeological data.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/images/img_04.jpg',
    title: 'PLX DATA MATRIX 04',
    category: 'IMAGE',
    caption: 'Image universe generated from collected waste.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/images/img_05.jpg',
    title: 'PLX DATA MATRIX 05',
    category: 'IMAGE',
    caption: 'A contradiction between cleanup and attraction.',
    year: '2026'
  }

]

// ======================================================
// VIDEO TEXTURES
// ======================================================

const videoElements = []

function createVideoTexture(path) {

  const video =
    document.createElement('video')

  video.src = path

  video.loop = true

  video.muted = true

  video.autoplay = true

  video.playsInline = true

  video.preload = 'auto'

  video.play().catch(() => {})

  videoElements.push(video)

  const texture =
    new THREE.VideoTexture(video)

  texture.colorSpace =
    THREE.SRGBColorSpace

  texture.minFilter =
    THREE.LinearFilter

  texture.magFilter =
    THREE.LinearFilter

  return texture
}

function createImageTexture(path) {

  const texture =
    imageLoader.load(path)

  texture.colorSpace =
    THREE.SRGBColorSpace

  return texture
}

function getTexture(item) {

  if (item.type === 'video') {

    return createVideoTexture(item.path)
  }

  return createImageTexture(item.path)
}

// ======================================================
// MESHES
// ======================================================

const meshes = []

const CARD_COUNT = 75

for (let i = 0; i < CARD_COUNT; i++) {

  const item =
    contentItems[
      Math.floor(
        Math.random()
        * contentItems.length
      )
    ]

  const texture =
    getTexture(item)

  const geometry =
    new THREE.PlaneGeometry(4, 4)

  const material =
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    })

  const mesh =
    new THREE.Mesh(
      geometry,
      material
    )

  mesh.position.x =
    (Math.random() - 0.5) * 200

  mesh.position.y =
    (Math.random() - 0.5) * 200

  mesh.position.z =
    (Math.random() - 0.5) * 200

  const scale =
    0.8 + Math.random() * 1.4

  mesh.scale.set(
    scale,
    scale,
    scale
  )

  mesh.userData = item

  scene.add(mesh)

  meshes.push(mesh)
}

// ======================================================
// STARS
// ======================================================

const starsGeometry =
  new THREE.BufferGeometry()

const starsCount = 1500

const positions =
  new Float32Array(starsCount * 3)

for (let i = 0; i < starsCount * 3; i++) {

  positions[i] =
    (Math.random() - 0.5) * 1000
}

starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    positions,
    3
  )
)

const starsMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5
  })

const stars =
  new THREE.Points(
    starsGeometry,
    starsMaterial
  )

scene.add(stars)

// ======================================================
// CLICK
// ======================================================

const raycaster =
  new THREE.Raycaster()

const mouse =
  new THREE.Vector2()

window.addEventListener(
  'pointerdown',
  () => {

    for (const video of videoElements) {

      video.play().catch(() => {})
    }

  },
  { once: true }
)

window.addEventListener(
  'click',
  (event) => {

    mouse.x =
      (event.clientX / window.innerWidth)
      * 2 - 1

    mouse.y =
      -(event.clientY / window.innerHeight)
      * 2 + 1

    raycaster.setFromCamera(
      mouse,
      camera
    )

    const intersects =
      raycaster.intersectObjects(meshes)

    if (intersects.length > 0) {

      const item =
        intersects[0].object.userData

      showOverlay(item)
    }
  }
)

// ======================================================
// OVERLAY
// ======================================================

function showOverlay(item) {

  let overlay =
    document.getElementById('overlay')

  if (!overlay) {

    overlay =
      document.createElement('div')

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

    document.body.appendChild(
      overlay
    )
  }

  const mediaHTML =

    item.type === 'video'

      ? `
        <video
          src="${item.path}"
          autoplay
          loop
          muted
          playsinline
          controls

          style="
            max-width:80%;
            max-height:70%;
            object-fit:contain;
            margin-bottom:30px;
            background:black;
          "
        ></video>
      `

      : `
        <img
          src="${item.path}"

          style="
            max-width:80%;
            max-height:70%;
            object-fit:contain;
            margin-bottom:30px;
          "
        />
      `

  overlay.innerHTML = `

    <div style="
      position:absolute;
      top:30px;
      left:30px;
      color:black;
      font-family:sans-serif;
      font-size:14px;
      letter-spacing:2px;
    ">
      ${item.category}
    </div>

    ${mediaHTML}

    <h1 style="
      color:black;
      font-family:sans-serif;
      margin:0;
      margin-bottom:10px;
    ">
      ${item.title}
    </h1>

    <p style="
      color:black;
      font-family:sans-serif;
      max-width:700px;
      text-align:center;
      line-height:1.7;
      margin-bottom:10px;
    ">
      ${item.caption}
    </p>

    <p style="
      color:gray;
      font-family:sans-serif;
      margin-bottom:30px;
    ">
      ${item.year}
    </p>

    <button
      id="closeButton"

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
    .addEventListener(
      'click',
      () => {

        overlay.remove()

      }
    )
}

// ======================================================
// ANIMATE
// ======================================================

function animate() {

  requestAnimationFrame(animate)

  scene.rotation.y += 0.00015

  controls.update()

  for (const mesh of meshes) {

    mesh.lookAt(camera.position)
  }

  renderer.render(scene, camera)
}

animate()

// ======================================================
// RESIZE
// ======================================================

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      window.innerWidth
      / window.innerHeight

    camera.updateProjectionMatrix()

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
  }
)