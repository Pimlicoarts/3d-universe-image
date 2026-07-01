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

@font-face {
  font-family: 'FrutigerBoldItalic';
  src: url('/fonts/FrutigerLTStd-BoldItalic.otf') format('opentype');
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: 'Matisse';
  src: url('/fonts/MatisseITC-Regular.woff2') format('woff2'),
       url('/fonts/MatisseITC-Regular.woff') format('woff'),
       url('/fonts/MatisseITC-Regular.otf') format('opentype');
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
// UNDER CONSTRUCTION TEXT
// ======================================================

const underConstructionText = document.createElement('div')

underConstructionText.id = 'underConstructionText'
underConstructionText.textContent = 'UNDERCONSTRUCTION'

document.body.appendChild(underConstructionText)

// ======================================================
// TOP MENU
// ======================================================

const topMenu = document.createElement('div')

topMenu.id = 'topMenu'

topMenu.innerHTML = `
  <button onclick="window.__showAbout && window.__showAbout()">ABOUT</button>

  <button onclick="window.__showWorks && window.__showWorks()">WORKS</button>

  <button onclick="window.open('https://pimlicoartjapan.myshopify.com/', '_blank')">
    SHOP
  </button>

  <button>WORKSHOP</button>

  <button>MUSICANA</button>

  <button>NEWS</button>

  <button onclick="window.__showContact && window.__showContact()">
    CONTACT
  </button>

  <button onclick="window.open('https://www.instagram.com/pimlicoartsjapan', '_blank')">
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
    path: '/physical/phy_06.jpg',
    title: '小さな抵抗',
    category: 'PHYSICAL',
    caption: `大きな大きな波にのまれ、大きな大きな力に巻き込まれ、繰り返される大きな歴史の流れには逆らえないのか、そんな思いから、ピムリコオリジナルの基盤を使って、古いテレビなどから取った抵抗を使った、マグネット式のブローチ「小さな抵抗」。　昔から戦争反対と言いつつ、兵器や軍服などの装備品の持つ強さやデザインに惹かれ、ピムリコの芸術も軍産複合体に組み込みたい、戦争特需を受けたいと、皮肉たっぷりにおもいながら、イスラエルのインテリジェンスが使ったページャーをソースに作りました。マグネットとしてもブローチとしても、各基盤にはボタンがついていて、芸術を爆発させる事も、多動症の方にはハンドスピナーのように手持ち無沙汰を紛らわせれるように設計されています。

Overwhelmed by enormous waves, caught up in immense forces, and confronted by the repeated currents of history, I began wondering whether it is possible to resist them at all. From that thought came Small Resistance, a magnetic brooch made using Pimlico's original circuit boards and tiny resistors salvaged from old televisions and other electronic devices.

For a long time, while opposing war, I have also been fascinated by the power and design of military equipment and uniforms. With a heavy dose of irony, I sometimes imagine Pimlico's art being absorbed into the military-industrial complex and benefiting from wartime demand. This work takes inspiration from the pagers reportedly used by Israeli intelligence.

Functioning both as a magnet and as a brooch, each circuit board is equipped with a button. It is designed so that one can metaphorically "detonate" art, while also serving as a tactile object—something that can be fidgeted with, like a hand spinner, to help occupy restless hands and minds.
During the exhibition, I had conversations with people from the United States, China, Israel, and Lebanon. Despite their different backgrounds, they all hoped for peace.`,
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
  },

  {
    type: 'image',
    path: '/images/img_06.jpg',
    title: 'PLX DATA MATRIX 06',
    category: 'IMAGE',
    caption: 'Digital memory fragments reconstructed from ocean plastic.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/images/img_07.jpg',
    title: 'PLX DATA MATRIX 07',
    category: 'IMAGE',
    caption: 'Plastic texture transformed into visual data structure.',
    year: '2026'
  },

  {
    type: 'image',
    path: '/images/img_08.jpg',
    title: 'PLX DATA MATRIX 08',
    category: 'IMAGE',
    caption: 'Future archaeological imagery generated from collected waste.',
    year: '2026'
  },

  {
    type: 'video',
    path: '/videos/vid_06.MP4',
    title: 'PLX DATA ARC MATRIX VIDEO',
    category: 'VIDEO',
    caption: 'Moving image archive.',
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
  if (textureCache.has(item.path)) return textureCache.get(item.path)
  const texture = item.type === 'video' ? createVideoTexture(item.path) : createImageTexture(item.path)
  textureCache.set(item.path, texture)
  return texture
}

window.addEventListener('pointerdown', () => {
  for (const video of videoElements) video.play().catch(() => {})
}, { once: true })

// ======================================================
// MESHES
// ======================================================

const meshes = []
const CARD_COUNT = isMobile ? 30 : 55

for (let i = 0; i < CARD_COUNT; i++) {
  const item = contentItems[Math.floor(Math.random() * contentItems.length)]
  const texture = getTexture(item)
  const geometry = new THREE.PlaneGeometry(5, 5)
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = (Math.random() - 0.5) * 190
  mesh.position.y = (Math.random() - 0.5) * 190
  mesh.position.z = (Math.random() - 0.5) * 190
  const scale = 0.9 + Math.random() * 1.5
  mesh.scale.set(scale, scale, scale)
  mesh.userData = item
  scene.add(mesh)
  meshes.push(mesh)
}

// ======================================================
// CLICK
// ======================================================

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('click', (event) => {
  if (
    event.target.closest('#galleryOverlay') ||
    event.target.closest('#topMenu') ||
    event.target.closest('#leftLogo') ||
    event.target.closest('#underConstructionText') ||
    event.target.closest('#aboutOverlay') ||
    event.target.closest('#contactOverlay') ||
    event.target.closest('#worksOverlay')
  ) return

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(meshes)
  if (intersects.length > 0) {
    const item = intersects[0].object.userData
    showGallery(item.category, item.path)
  }
})

// ======================================================
// MEDIA LOAD HELPERS
// ======================================================

function waitForMediaLoaded(container) {
  const media = Array.from(container.querySelectorAll('img, video'))
  const promises = media.map((el) => {
    if (el.tagName === 'IMG') {
      if (el.complete && el.naturalWidth > 0) return Promise.resolve()
      return new Promise((resolve) => {
        el.addEventListener('load', resolve, { once: true })
        el.addEventListener('error', resolve, { once: true })
      })
    }
    if (el.readyState >= 1) return Promise.resolve()
    return new Promise((resolve) => {
      el.addEventListener('loadedmetadata', resolve, { once: true })
      el.addEventListener('error', resolve, { once: true })
    })
  })
  const timeout = new Promise((resolve) => setTimeout(resolve, 3000))
  return Promise.race([Promise.all(promises), timeout])
}

// ======================================================
// CLOSE ALL
// ======================================================

function closeOverlay() {
  const ids = ['galleryOverlay', 'contactOverlay', 'worksOverlay', 'aboutOverlay']
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })
  topMenu.style.display = 'flex'
  underConstructionText.style.display = 'block'
}

function renderState(state) {
  if (!state) { closeOverlay(); return }
  if (state.about)   { showAbout({ pushHistory: false }); return }
  if (state.gallery) { showGallery(state.category, state.selectedPath, { pushHistory: false }); return }
  if (state.works)   { showWorks({ pushHistory: false }); return }
  if (state.contact) { showContact({ pushHistory: false }); return }
  closeOverlay()
}

window.addEventListener('popstate', (event) => { renderState(event.state) })

// ======================================================
// ABOUT
// ======================================================

function showAbout(options = {}) {
  const { pushHistory = true } = options

  ;['aboutOverlay','galleryOverlay','worksOverlay','contactOverlay'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })

  if (pushHistory) history.pushState({ about: true }, '', '')

  topMenu.style.display = 'none'
  underConstructionText.style.display = 'none'

  injectGalleryCSS()
  injectAboutCSS()

  const overlay = document.createElement('div')
  overlay.id = 'aboutOverlay'
  document.body.appendChild(overlay)

  overlay.innerHTML = `
    <button id="closeAboutOverlay">Top</button>

    <div class="about-inner">
      <p class="about-label">ABOUT</p>

      <p class="about-body">
        ２年間過ごしたロンドン ピムリコで出会った、<br>
        エジプト人 アリとの生活と、<br>
        ドイツ人デザイナー ヨーガン レールさんの展示<br>
        「 ここは誰のもの？ 」にインスパイアされ。。。
      </p>
    </div>
  `

  document.getElementById('closeAboutOverlay').addEventListener('click', () => { closeOverlay() })
}

function injectAboutCSS() {
  if (document.getElementById('aboutStyle')) return

  const style = document.createElement('style')
  style.id = 'aboutStyle'

  style.innerHTML = `
    #aboutOverlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 20000;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* closeAboutOverlay: 共通CSSに統合済み */

    .about-inner {
      width: min(860px, 88vw);
      text-align: left;
    }

    .about-label {
      margin: 0 0 32px;
      font-family: monospace;
      font-size: 11px;
      letter-spacing: 4px;
      color: #aaa;
    }

    .about-body {
      margin: 0;
      font-family: 'Matisse', 'FrutigerLight', serif;
      font-size: clamp(28px, 4.5vw, 64px);
      line-height: 1.6;
      letter-spacing: 0.01em;
      color: #000;
      white-space: pre-line;
    }

    @media (max-width: 768px) {
      #closeAboutOverlay {
        top: 0px;
        right: 24px;
        padding: 10px 15px;
        font-size: 10px;
      }

      .about-inner {
        width: 88vw;
      }

      .about-body {
        font-size: clamp(22px, 6vw, 38px);
        line-height: 1.7;
      }
    }
  `

  document.head.appendChild(style)
}

// ======================================================
// CONTACT
// ======================================================

function showContact(options = {}) {
  const { pushHistory = true } = options

  ;['contactOverlay','galleryOverlay','worksOverlay','aboutOverlay'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })

  if (pushHistory) history.pushState({ contact: true }, '', '')

  topMenu.style.display = 'none'
  underConstructionText.style.display = 'none'

  injectGalleryCSS()
  injectContactCSS()

  const overlay = document.createElement('div')
  overlay.id = 'contactOverlay'
  document.body.appendChild(overlay)

  overlay.innerHTML = `
    <button id="closeContactOverlay">Top</button>
    <div class="contact-wrap">
      <p class="contact-label">CONTACT</p>
      <button id="contactEmailLogo" class="contact-email">pimlicoarts@gmail.com</button>
    </div>
  `

  document.getElementById('closeContactOverlay').addEventListener('click', () => { closeOverlay() })
  document.getElementById('contactEmailLogo').addEventListener('click', () => {
    window.location.href = 'mailto:pimlicoarts@gmail.com'
  })
}

function injectContactCSS() {
  if (document.getElementById('contactStyle')) return
  const style = document.createElement('style')
  style.id = 'contactStyle'
  style.innerHTML = `
    #contactOverlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      z-index: 20000; background: white; color: black;
      display: flex; align-items: center; justify-content: center;
    }
    /* closeContactOverlay: 共通CSSに統合済み */
    .contact-wrap { text-align: center; padding: 0 24px; }
    .contact-label { margin: 0 0 28px; font-family: monospace; font-size: 12px; letter-spacing: 4px; color: #888; }
    .contact-email {
      background: transparent; border: none; cursor: pointer; padding: 0;
      font-family: 'FrutigerBoldItalic', sans-serif; font-weight: 700; font-style: italic;
      font-size: clamp(22px, 5vw, 56px); letter-spacing: -0.02em; color: black; transition: opacity 0.2s ease;
    }
    .contact-email:hover { opacity: 0.5; }
    @media (max-width: 768px) { .contact-email { font-size: 28px; word-break: break-all; } }
  `
  document.head.appendChild(style)
}

// ======================================================
// WORKS
// ======================================================

function showWorks(options = {}) {
  const { pushHistory = true } = options

  ;['worksOverlay','galleryOverlay','contactOverlay','aboutOverlay'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })

  if (pushHistory) history.pushState({ works: true }, '', '')

  topMenu.style.display = 'none'
  underConstructionText.style.display = 'none'

  injectWorksCSS()

  const overlay = document.createElement('div')
  overlay.id = 'worksOverlay'
  document.body.appendChild(overlay)

  overlay.innerHTML = `
    <button id="closeWorksOverlay">Top</button>
    <div class="works-wrap">
      <p class="works-brand">PIMLICO ARTS JAPAN</p>
      <p class="works-label">WORKS</p>
      <nav class="works-list">
        <button class="works-link" data-category="PHYSICAL">Physical</button>
        <button class="works-link" data-category="VIDEO">Videos</button>
        <button class="works-link" data-category="IMAGE">Images</button>
      </nav>
    </div>
  `

  document.getElementById('closeWorksOverlay').addEventListener('click', () => { closeOverlay() })
  overlay.querySelectorAll('.works-link').forEach((button) => {
    button.addEventListener('click', () => {
      showGallery(button.dataset.category, null, { pushHistory: true })
    })
  })
}

function injectWorksCSS() {
  if (document.getElementById('worksStyle')) return
  const style = document.createElement('style')
  style.id = 'worksStyle'
  style.innerHTML = `
    #worksOverlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      z-index: 20000; background: white; color: black;
      display: flex; align-items: center; justify-content: center;
    }
    /* closeWorksOverlay: 共通CSSに統合済み */
    .works-wrap { text-align: center; padding: 0 24px; }
    .works-brand { margin: 0 0 18px; font-family: monospace; font-size: 11px; letter-spacing: 4px; color: #888; }
    .works-label { margin: 0 0 36px; font-family: monospace; font-size: 12px; letter-spacing: 4px; color: #888; }
    .works-list { display: flex; flex-direction: column; align-items: center; gap: 18px; }
    .works-link {
      background: transparent; border: none; cursor: pointer; padding: 0;
      font-family: 'FrutigerLight', sans-serif; font-weight: 300;
      font-size: clamp(34px, 7vw, 90px); line-height: 0.95; letter-spacing: -0.04em;
      color: black; transition: opacity 0.2s ease;
    }
    .works-link:hover { opacity: 0.5; }
    @media (max-width: 768px) { .works-link { font-size: 48px; } .works-list { gap: 14px; } }
  `
  document.head.appendChild(style)
}

// ======================================================
// GALLERY
// ======================================================

function showGallery(category, selectedPath, options = {}) {
  const { pushHistory = true } = options

  ;['galleryOverlay','worksOverlay','contactOverlay','aboutOverlay'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })

  if (pushHistory) history.pushState({ gallery: true, category, selectedPath }, '', '')

  topMenu.style.display = 'none'
  underConstructionText.style.display = 'none'

  const overlay = document.createElement('div')
  overlay.id = 'galleryOverlay'
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:20000;background:white;color:black;overflow-y:scroll;-webkit-overflow-scrolling:touch;visibility:hidden;'
  document.body.appendChild(overlay)

  injectGalleryCSS()

  const items = contentItems.filter((item) => item.category === category)

  const categoryDisplayNames = { PHYSICAL: 'PHYSICAL WORK', VIDEO: 'VIDEO WORK', IMAGE: 'IMAGE WORK' }

  function createCards(loopIndex) {
    return items.map((item) => {
      const isSelected = item.path === selectedPath && loopIndex === 1
      const mediaHTML = item.type === 'video'
        ? `<video src="${item.path}" autoplay loop muted playsinline controls preload="auto"></video>`
        : `<img src="${item.path}" />`
      return `
        <article class="gallery-card" ${isSelected ? 'id="selectedCard"' : ''}>
          <div class="media-box">${mediaHTML}</div>
          <div class="text-box">
            <p class="category-label">${categoryDisplayNames[item.category] || item.category}</p>
            <h2>${item.title}</h2>
            <p class="caption">${item.caption}</p>
            <p class="year">${item.year}</p>
          </div>
        </article>
      `
    }).join('')
  }

  overlay.innerHTML = `
    <button id="closeOverlay">Top</button>
    <section class="gallery-wrap">
      <header class="gallery-header">
        <p>PIMLICO ARTS JAPAN</p>
        <h1>${category}</h1>
      </header>
      <div class="gallery-list">
        <div class="gallery-loop">${createCards(0)}</div>
        <div class="gallery-loop">${createCards(1)}</div>
        <div class="gallery-loop">${createCards(2)}</div>
      </div>
    </section>
  `

  document.getElementById('closeOverlay').addEventListener('click', () => { closeOverlay() })

  const firstLoop = overlay.querySelector('.gallery-loop')
  const secondLoop = firstLoop ? firstLoop.nextElementSibling : null
  const mediaToWaitFor = []
  if (firstLoop) mediaToWaitFor.push(firstLoop)
  if (secondLoop) mediaToWaitFor.push(secondLoop)

  Promise.all(mediaToWaitFor.map((loopEl) => waitForMediaLoaded(loopEl))).then(() => {
    requestAnimationFrame(() => {
      const selected = document.getElementById('selectedCard')
      if (selected) selected.scrollIntoView({ behavior: 'instant', block: 'center' })
      overlay.style.visibility = 'visible'
    })
  })

  let loopHeight = 0
  const loopForHeight = overlay.querySelector('.gallery-loop')
  if (loopForHeight) {
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) loopHeight = entry.contentRect.height
    })
    ro.observe(loopForHeight)
  }

  const margin = 2
  overlay.addEventListener('scroll', () => {
    if (!loopHeight) return
    if (overlay.scrollTop >= loopHeight * 2 - margin) overlay.scrollTop -= loopHeight
    if (overlay.scrollTop <= margin) overlay.scrollTop += loopHeight
  })
}

// ======================================================
// CSS
// ======================================================

function injectGalleryCSS() {
  if (document.getElementById('galleryStyle')) return
  const style = document.createElement('style')
  style.id = 'galleryStyle'
  style.innerHTML = `
    #leftLogo {
      position: fixed; left: 28px; bottom: 28px; width: 96px; height: auto;
      z-index: 9500; opacity: 0.45; pointer-events: none; user-select: none;
    }
    #underConstructionText {
      position: fixed; left: 50%; top: 50%; transform: translate(-50%,-50%);
      z-index: 18000; font-family: 'FrutigerLight','FrutigerRoman',sans-serif;
      font-size: clamp(54px,11vw,190px); font-weight: 300; line-height: 0.82;
      letter-spacing: -0.08em; color: rgba(0,0,0,0.16); text-align: center;
      white-space: nowrap; pointer-events: none; user-select: none;
    }
    #topMenu {
      position: fixed; top: 10px; right: 42px; z-index: 19000;
      display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
    }
    #topMenu button {
      background: transparent; border: none; color: black; cursor: pointer; padding: 0;
      font-size: 12px; letter-spacing: 1px; font-family: monospace; transition: opacity 0.2s ease;
    }
    #topMenu button:hover { opacity: 0.4; }
    #closeOverlay,
    #closeAboutOverlay,
    #closeContactOverlay,
    #closeWorksOverlay {
      position: fixed;
      top: 0px;
      right: 0px;
      z-index: 30000;
      width: 240px;
      height: 240px;
      border: none;
      outline: none;
      background: url('/images/Dot_10.PNG') center center / contain no-repeat;
      background-color: transparent;
      color: black;
      font-family: monospace;
      font-size: 12px;
      letter-spacing: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #closeOverlay:hover,
    #closeAboutOverlay:hover,
    #closeContactOverlay:hover,
    #closeWorksOverlay:hover {
      opacity: .7;
    }
    @media (max-width: 768px) {
      #closeOverlay,
      #closeAboutOverlay,
      #closeContactOverlay,
      #closeWorksOverlay {
        top: 0px;
        right: 24px;
        width: 240px;
        height: 240px;
        font-size: 10px;
      }
    }
    .gallery-wrap { width: min(1360px,94vw); margin: 0 auto; padding: 90px 0 110px; box-sizing: border-box; }
    .gallery-header { text-align: center; margin-bottom: 80px; }
    .gallery-header p { margin: 0 0 18px; font-family: monospace; font-size: 11px; letter-spacing: 4px; color: #888; }
    .gallery-header h1 { margin: 0; font-family: 'FrutigerLight',sans-serif; font-size: clamp(64px,13vw,180px); line-height: 0.88; letter-spacing: -0.08em; font-weight: 300; }
    .gallery-list { display: flex; flex-direction: column; gap: 90px; }
    .gallery-loop { display: flex; flex-direction: column; gap: 90px; }
    .gallery-card { display: grid; grid-template-columns: 1.45fr 0.55fr; gap: 34px; align-items: center; padding-bottom: 90px; border-bottom: 1px solid rgba(0,0,0,0.08); }
    .media-box { width: 100%; background: transparent; overflow: visible; }
    .media-box img, .media-box video { display: block; width: 100%; height: auto; max-height: 86vh; object-fit: contain; background: transparent; }
    .category-label { margin: 0 0 18px; font-family: monospace; font-size: 11px; letter-spacing: 3px; color: #888; }
    .text-box h2 { margin: 0 0 22px; font-family: 'FrutigerLight',sans-serif; font-size: clamp(34px,5vw,74px); line-height: 0.95; letter-spacing: -0.06em; font-weight: 300; }
    .caption { margin: 0 0 24px; font-family: monospace; font-size: 14px; line-height: 1.9; color: #333; white-space: pre-line; }
    .year { margin: 0; font-family: monospace; font-size: 12px; letter-spacing: 2px; color: #999; }
    @media (max-width: 768px) {
      #leftLogo { left: 18px; bottom: 18px; width: 52px; }
      #underConstructionText { font-size: 16vw; white-space: normal; width: 92vw; color: rgba(0,0,0,0.15); }
      #topMenu { top: 0px; right: 42px; gap: 8px; }
      #topMenu button { font-size: 10px; }
      .gallery-wrap { width: 94vw; padding: 82px 0 96px; }
      .gallery-header { margin-bottom: 50px; }
      .gallery-card { display: flex; flex-direction: column; align-items: stretch; gap: 22px; padding-bottom: 64px; }
      .gallery-list { gap: 64px; }
      .gallery-loop { gap: 64px; }
      .media-box img, .media-box video { max-height: 82vh; }
      .gallery-header h1 { font-size: 72px; }
      .text-box h2 { font-size: 42px; }
      .caption { font-size: 13px; line-height: 1.8; }
    }
  `
  document.head.appendChild(style)
}

injectGalleryCSS()

window.__showAbout   = showAbout
window.__showContact = showContact
window.__showWorks   = showWorks

// ABOUTボタンは onclick="window.__showAbout()" で呼び出し済み

// ======================================================
// ANIMATE
// ======================================================

function animate() {
  requestAnimationFrame(animate)
  scene.rotation.y += isMobile ? 0.00008 : 0.00015
  controls.update()
  for (const mesh of meshes) mesh.lookAt(camera.position)
  renderer.render(scene, camera)
}

animate()

// ======================================================
// RESIZE
// ======================================================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
})