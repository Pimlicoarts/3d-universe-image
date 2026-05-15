import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ======================================================
// FONT
// ======================================================

const fontStyle = document.createElement('style')

fontStyle.innerHTML = `
@font-face {
  font-family: 'FrutigerLight';
  src: url('/fonts/FrutigerLTStd-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'FrutigerRoman';
  src: url('/fonts/FrutigerLTStd-Roman.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}
`

document.head.appendChild(fontStyle)

// ======================================================
// BASIC
// ======================================================

const isMobile =
  window.innerWidth < 768 ||
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)

camera.position.z = isMobile ? 70 : 45

const renderer = new THREE.WebGLRenderer({
  antialias: !isMobile,
  alpha: false
})

renderer.setSize(window.innerWidth, window.innerHeight)

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5)
)

document.body.style.margin = '0'
document.body.style.overflow = 'hidden'
document.body.style.background = 'white'

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true
controls.dampingFactor = 0.04

controls.autoRotate = true
controls.autoRotateSpeed = isMobile ? 0.025 : 0.05

const imageLoader = new THREE.TextureLoader()

// ======================================================
// LEFT LOGO
// ======================================================

const leftLogo = document.createElement('img')

leftLogo.id = 'leftLogo'
leftLogo.src = '/PIM_LOGO.png'
leftLogo.alt = 'Pimlico Arts'

document.body.appendChild(leftLogo)

// ======================================================
// SPHERE BUTTON
// ======================================================

const sphereButton = document.createElement('button')

sphereButton.id = 'sphereButton'
sphereButton.setAttribute('aria-label', 'Toggle sphere mode')

sphereButton.innerHTML = `
  <img src="/sphere_button.png" alt="Sphere" />
`

document.body.appendChild(sphereButton)

let isSphereMode = false

sphereButton.addEventListener('click', () => {
  isSphereMode = !isSphereMode

  sphereButton.classList.toggle('active', isSphereMode)

  for (const mesh of meshes) {
    mesh.userData.targetPosition =
      isSphereMode
        ? mesh.userData.spherePosition.clone()
        : mesh.userData.universePosition.clone()
  }
})

// ======================================================
// TOP MENU
// ======================================================

const topMenu = document.createElement('div')

topMenu.id = 'topMenu'

topMenu.innerHTML = `
  <button>ABOUT</button>

  <button>WORKS</button>

  <button onclick="window.open('https://pimlicoartjapan.myshopify.com/', '_blank')">
    SHOP
  </button>

  <button>WORKSHOP</button>

  <button>MUSICANA</button>

  <button>NEWS</button>

  <button>CONTACT</button>

  <button onclick="window.open('https://www.instagram.com/pimlicoarts/', '_blank')">
    IG
  </button>
`

document.body.appendChild(topMenu)

// ======================================================
// CONTENTS
// ======================================================

const contentItems = [
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
// TEXTURE CACHE
// ======================================================

const textureCache = new Map()
const videoElements = []

function createImageTexture(path) {
  const texture = imageLoader.load(path)

  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  return texture
}

function createVideoTexture(path) {
  const video = document.createElement('video')

  video.src = path
  video.loop = true
  video.muted = true
  video.autoplay = true
  video.playsInline = true
  video.preload = 'auto'

  video.play().catch(() => {})

  videoElements.push(video)

  const texture = new THREE.VideoTexture(video)

  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  return texture
}

function getTexture(item) {
  if (textureCache.has(item.path)) {
    return textureCache.get(item.path)
  }

  const texture =
    item.type === 'video'
      ? createVideoTexture(item.path)
      : createImageTexture(item.path)

  textureCache.set(item.path, texture)

  return texture
}

window.addEventListener(
  'pointerdown',
  () => {
    for (const video of videoElements) {
      video.play().catch(() => {})
    }
  },
  { once: true }
)

// ======================================================
// POSITION HELPERS
// ======================================================

function createUniversePosition() {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 190,
    (Math.random() - 0.5) * 190,
    (Math.random() - 0.5) * 190
  )
}

function createSpherePosition(index, total) {
  const radius = isMobile ? 54 : 66

  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  const y =
    1 - (index / Math.max(1, total - 1)) * 2

  const sphereRadius =
    Math.sqrt(1 - y * y)

  const theta = goldenAngle * index

  const x =
    Math.cos(theta) * sphereRadius

  const z =
    Math.sin(theta) * sphereRadius

  return new THREE.Vector3(
    x * radius,
    y * radius,
    z * radius
  )
}

// ======================================================
// MESHES
// ======================================================

const meshes = []

const CARD_COUNT = isMobile ? 30 : 55

for (let i = 0; i < CARD_COUNT; i++) {
  const item =
    contentItems[
      Math.floor(
        Math.random() * contentItems.length
      )
    ]

  const texture = getTexture(item)

  const geometry =
    new THREE.PlaneGeometry(5, 5)

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

  const universePosition =
    createUniversePosition()

  const spherePosition =
    createSpherePosition(i, CARD_COUNT)

  mesh.position.copy(universePosition)

  const scale =
    0.9 + Math.random() * 1.5

  mesh.scale.set(scale, scale, scale)

  mesh.userData = item
  mesh.userData.universePosition = universePosition
  mesh.userData.spherePosition = spherePosition
  mesh.userData.targetPosition = universePosition.clone()

  scene.add(mesh)

  meshes.push(mesh)
}

// ======================================================
// CLICK
// ======================================================

const raycaster =
  new THREE.Raycaster()

const mouse =
  new THREE.Vector2()

window.addEventListener(
  'click',
  (event) => {
    if (
      event.target.closest('#galleryOverlay') ||
      event.target.closest('#topMenu') ||
      event.target.closest('#leftLogo') ||
      event.target.closest('#sphereButton')
    ) {
      return
    }

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

      showGallery(
        item.category,
        item.path
      )
    }
  }
)

// ======================================================
// GALLERY
// ======================================================

function showGallery(
  category,
  selectedPath
) {
  const old =
    document.getElementById(
      'galleryOverlay'
    )

  if (old) {
    old.remove()
  }

  topMenu.style.display = 'none'
  sphereButton.style.display = 'none'

  const overlay =
    document.createElement('div')

  overlay.id = 'galleryOverlay'

  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'

  overlay.style.width = '100%'
  overlay.style.height = '100%'

  overlay.style.zIndex = '20000'

  overlay.style.background = 'white'

  overlay.style.color = 'black'

  overlay.style.overflowY = 'scroll'

  overlay.style.WebkitOverflowScrolling = 'touch'

  document.body.appendChild(overlay)

  injectGalleryCSS()

  const items =
    contentItems.filter(
      (item) =>
        item.category === category
    )

  function createCards(loopIndex) {
    return items
      .map((item) => {
        const isSelected =
          item.path === selectedPath &&
          loopIndex === 1

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
                preload="auto"
              ></video>
            `

            : `
              <img src="${item.path}" />
            `

        return `

          <article
            class="gallery-card"
            ${isSelected ? 'id="selectedCard"' : ''}
          >

            <div class="media-box">
              ${mediaHTML}
            </div>

            <div class="text-box">

              <p class="category-label">
                ${item.category}
              </p>

              <h2>
                ${item.title}
              </h2>

              <p class="caption">
                ${item.caption}
              </p>

              <p class="year">
                ${item.year}
              </p>

            </div>

          </article>

        `
      })
      .join('')
  }

  overlay.innerHTML = `

    <button id="closeOverlay">
      CLOSE
    </button>

    <section class="gallery-wrap">

      <header class="gallery-header">

        <p>
          PIMLICO ARTS JAPAN
        </p>

        <h1>
          ${category}
        </h1>

      </header>

      <div class="gallery-list">

        <div class="gallery-loop">
          ${createCards(0)}
        </div>

        <div class="gallery-loop">
          ${createCards(1)}
        </div>

        <div class="gallery-loop">
          ${createCards(2)}
        </div>

      </div>

    </section>

  `

  document
    .getElementById('closeOverlay')
    .addEventListener(
      'click',
      () => {
        overlay.remove()

        topMenu.style.display = 'flex'
        sphereButton.style.display = 'block'
      }
    )

  requestAnimationFrame(() => {
    const selected =
      document.getElementById(
        'selectedCard'
      )

    if (selected) {
      selected.scrollIntoView({
        behavior: 'instant',
        block: 'center'
      })
    }
  })

  overlay.addEventListener(
    'scroll',
    () => {
      const loop =
        overlay.querySelector('.gallery-loop')

      if (!loop) return

      const loopHeight =
        loop.offsetHeight

      if (
        overlay.scrollTop
        >= loopHeight * 2
      ) {
        overlay.scrollTop -= loopHeight
      }

      if (
        overlay.scrollTop <= 0
      ) {
        overlay.scrollTop += loopHeight
      }
    }
  )
}

// ======================================================
// CSS
// ======================================================

function injectGalleryCSS() {
  if (
    document.getElementById(
      'galleryStyle'
    )
  ) return

  const style =
    document.createElement('style')

  style.id = 'galleryStyle'

  style.innerHTML = `

    #leftLogo {

      position: fixed;

      left: 28px;
      bottom: 28px;

      width: 96px;
      height: auto;

      z-index: 9500;

      opacity: 0.45;

      pointer-events: none;

      user-select: none;
    }

    #sphereButton {

      position: fixed;

      right: 42px;
      bottom: 34px;

      z-index: 9800;

      width: 44px;
      height: 44px;

      padding: 0;

      background: transparent;

      border: none;

      cursor: pointer;

      opacity: 0.62;

      transition:
        opacity 0.2s ease,
        transform 0.25s ease;

      mix-blend-mode: multiply;
    }

    #sphereButton img {

      display: block;

      width: 100%;
      height: 100%;

      object-fit: contain;

      pointer-events: none;
    }

    #sphereButton:hover {

      opacity: 1;

      transform: scale(1.08);
    }

    #sphereButton.active {

      opacity: 1;

      transform: rotate(45deg) scale(1.08);
    }

    #topMenu {

      position: fixed;

      top: 28px;
      right: 42px;

      z-index: 9000;

      display: flex;

      flex-direction: column;

      align-items: flex-end;

      gap: 10px;
    }

    #topMenu button {

      background: transparent;

      border: none;

      color: black;

      cursor: pointer;

      padding: 0;

      font-size: 12px;

      letter-spacing: 1px;

      font-family:
        monospace;

      transition:
        opacity 0.2s ease;
    }

    #topMenu button:hover {

      opacity: 0.4;
    }

    #closeOverlay {

      position: fixed;

      top: 28px;
      right: 42px;

      z-index: 30000;

      border: 1px solid black;

      background: black;

      color: white;

      padding: 12px 20px;

      border-radius: 999px;

      font-size: 11px;

      letter-spacing: 2px;

      cursor: pointer;

      font-family:
        monospace;
    }

    .gallery-wrap {

      width: min(1360px, 94vw);

      margin: 0 auto;

      padding: 90px 0 110px;

      box-sizing: border-box;
    }

    .gallery-header {

      text-align: center;

      margin-bottom: 80px;
    }

    .gallery-header p {

      margin: 0 0 18px;

      font-family:
        monospace;

      font-size: 11px;

      letter-spacing: 4px;

      color: #888;
    }

    .gallery-header h1 {

      margin: 0;

      font-family:
        'FrutigerLight',
        sans-serif;

      font-size:
        clamp(64px, 13vw, 180px);

      line-height: 0.88;

      letter-spacing: -0.08em;

      font-weight: 300;
    }

    .gallery-list {

      display: flex;

      flex-direction: column;

      gap: 90px;
    }

    .gallery-loop {

      display: flex;

      flex-direction: column;

      gap: 90px;
    }

    .gallery-card {

      display: grid;

      grid-template-columns:
        1.45fr 0.55fr;

      gap: 34px;

      align-items: center;

      padding-bottom: 90px;

      border-bottom:
        1px solid rgba(0,0,0,0.08);
    }

    .media-box {

      width: 100%;

      background: transparent;

      border-radius: 0 !important;

      overflow: visible;
    }

    .media-box img,
    .media-box video {

      display: block;

      width: 100%;

      height: auto;

      max-height: 86vh;

      object-fit: contain;

      background: transparent;

      border-radius: 0 !important;
    }

    .category-label {

      margin: 0 0 18px;

      font-family:
        monospace;

      font-size: 11px;

      letter-spacing: 3px;

      color: #888;
    }

    .text-box h2 {

      margin: 0 0 22px;

      font-family:
        'FrutigerLight',
        sans-serif;

      font-size:
        clamp(34px, 5vw, 74px);

      line-height: 0.95;

      letter-spacing: -0.06em;

      font-weight: 300;
    }

    .caption {

      margin: 0 0 24px;

      font-family:
        monospace;

      font-size: 14px;

      line-height: 1.9;

      color: #333;
    }

    .year {

      margin: 0;

      font-family:
        monospace;

      font-size: 12px;

      letter-spacing: 2px;

      color: #999;
    }

    @media (max-width: 768px) {

      #leftLogo {

        left: 18px;
        bottom: 18px;

        width: 52px;

        opacity: 0.45;
      }

      #sphereButton {

        right: 24px;
        bottom: 22px;

        width: 38px;
        height: 38px;
      }

      #topMenu {

        top: 20px;
        right: 24px;

        gap: 8px;
      }

      #topMenu button {

        font-size: 10px;
      }

      #closeOverlay {

        top: 20px;
        right: 24px;

        padding: 10px 15px;

        font-size: 10px;
      }

      .gallery-wrap {

        width: 94vw;

        padding: 82px 0 96px;
      }

      .gallery-header {

        margin-bottom: 50px;
      }

      .gallery-card {

        display: flex;

        flex-direction: column;

        align-items: stretch;

        gap: 22px;

        padding-bottom: 64px;
      }

      .gallery-list {

        gap: 64px;
      }

      .gallery-loop {

        gap: 64px;
      }

      .media-box img,
      .media-box video {

        max-height: 82vh;
      }

      .gallery-header h1 {

        font-size: 72px;
      }

      .text-box h2 {

        font-size: 42px;
      }

      .caption {

        font-size: 13px;

        line-height: 1.8;
      }
    }

  `

  document.head.appendChild(style)
}

injectGalleryCSS()

// ======================================================
// ANIMATE
// ======================================================

function animate() {
  requestAnimationFrame(animate)

  scene.rotation.y +=
    isMobile
      ? 0.00008
      : 0.00015

  controls.update()

  for (const mesh of meshes) {
    mesh.position.lerp(
      mesh.userData.targetPosition,
      0.045
    )

    if (isSphereMode) {
      mesh.lookAt(0, 0, 0)
    } else {
      mesh.lookAt(camera.position)
    }
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

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        isMobile ? 1 : 1.5
      )
    )
  }
)