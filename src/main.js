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

const controls = new OrbitControls(
  camera,
  renderer.domElement
)

controls.enableDamping = true
controls.dampingFactor = 0.04

controls.autoRotate = true
controls.autoRotateSpeed = isMobile ? 0.025 : 0.05

const imageLoader = new THREE.TextureLoader()

// ======================================================
// CONTENTS
// ======================================================

const contentItems = [

  // VIDEO

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

  // PHYSICAL

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

  // IMAGE

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

  mesh.position.x =
    (Math.random() - 0.5) * 190

  mesh.position.y =
    (Math.random() - 0.5) * 190

  mesh.position.z =
    (Math.random() - 0.5) * 190

  const scale =
    0.9 + Math.random() * 1.5

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
      event.target.closest('#galleryOverlay')
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

      showGallery(item.category)
    }
  }
)

// ======================================================
// GALLERY
// ======================================================

function showGallery(category) {

  const old =
    document.getElementById(
      'galleryOverlay'
    )

  if (old) {
    old.remove()
  }

  const overlay =
    document.createElement('div')

  overlay.id = 'galleryOverlay'

  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'

  overlay.style.width = '100%'
  overlay.style.height = '100%'

  overlay.style.zIndex = '9999'

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

  const cardsHTML =
    items
      .map((item) => {

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

          <article class="gallery-card">

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

        ${cardsHTML}

      </div>

    </section>

  `

  document
    .getElementById('closeOverlay')
    .addEventListener(
      'click',
      () => {

        overlay.remove()

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

    #closeOverlay {

      position: fixed;

      top: 22px;
      right: 22px;

      z-index: 10000;

      border: 1px solid black;

      background: black;

      color: white;

      padding: 12px 20px;

      border-radius: 999px;

      font-size: 11px;

      letter-spacing: 2px;

      cursor: pointer;

      font-family:
        'FrutigerRoman',
        sans-serif;
    }

    .gallery-wrap {

      width: min(1100px, 90vw);

      margin: 0 auto;

      padding: 100px 0 120px;

      box-sizing: border-box;
    }

    .gallery-header {

      text-align: center;

      margin-bottom: 100px;
    }

    .gallery-header p {

      margin: 0 0 18px;

      font-family:
        'FrutigerRoman',
        sans-serif;

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

      gap: 100px;
    }

    .gallery-card {

      display: grid;

      grid-template-columns:
        1.2fr 0.8fr;

      gap: 40px;

      align-items: center;

      padding-bottom: 100px;

      border-bottom:
        1px solid rgba(0,0,0,0.08);
    }

    .media-box {

      width: 100%;

      background: #f3f3f3;

      border-radius: 24px;

      overflow: hidden;
    }

    .media-box img,
    .media-box video {

      display: block;

      width: 100%;

      height: auto;

      max-height: 78vh;

      object-fit: contain;

      background: #eee;
    }

    .category-label {

      margin: 0 0 18px;

      font-family:
        'FrutigerRoman',
        sans-serif;

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
        'FrutigerRoman',
        sans-serif;

      font-size: 15px;

      line-height: 1.9;

      color: #333;
    }

    .year {

      margin: 0;

      font-family:
        'FrutigerRoman',
        sans-serif;

      font-size: 12px;

      letter-spacing: 2px;

      color: #999;
    }

    @media (max-width: 768px) {

      #closeOverlay {

        top: 16px;
        right: 16px;

        padding: 10px 15px;

        font-size: 10px;
      }

      .gallery-wrap {

        width: 88vw;

        padding: 90px 0 100px;
      }

      .gallery-header {

        margin-bottom: 60px;
      }

      .gallery-card {

        display: flex;

        flex-direction: column;

        align-items: stretch;

        gap: 24px;

        padding-bottom: 70px;
      }

      .gallery-list {

        gap: 70px;
      }

      .gallery-header h1 {

        font-size: 72px;
      }

      .text-box h2 {

        font-size: 42px;
      }

      .caption {

        font-size: 14px;

        line-height: 1.8;
      }
    }

  `

  document.head.appendChild(style)
}

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

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        isMobile ? 1 : 1.5
      )
    )
  }
)