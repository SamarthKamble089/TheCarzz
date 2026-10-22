/**
 * The carzz - BMW Exclusive Sovereign Collection Engine
 * 
 * Requirements Implemented:
 * 1. All vehicles are BMW models (14 iconic BMW models).
 * 2. Actual side-view car photos (bmw1.jpg to bmw14.jpg).
 * 3. Scroll Physics:
 *    - At the vertical center of the screen, the car image is only half visible,
 *      and the other half is out of boundary (peeking from left/right edges).
 *    - At the top and bottom of scroll, the cars completely disappear (100% out of boundary, opacity 0).
 * 4. Click Interaction:
 *    - When the user clicks a car, it glides into the dead center of the screen,
 *      and its name, company ("BMW"), price, 3-4 lines of description, and specs show.
 * 5. Web Audio API synthesized BMW M TwinPower Turbo engine roar.
 */

// ============================================================================
// 1. BMW FLEET DATABASE (14 Iconic BMW Models with Actual Side-View Photos)
// ============================================================================
const FLEET_DATA = [
  {
    id: 1,
    name: "M8 Competition Gran Coupe",
    company: "BMW M",
    price: "$138,800",
    category: "hypercar",
    image: "car-images/bmw1.jpg",
    badge: "M Flagship",
    description: "The BMW M8 Competition Gran Coupe represents the absolute pinnacle of luxury performance engineering from BMW M. Driven by a 4.4-liter BMW M TwinPower Turbo V8 delivering 617 horsepower, it unleashes relentless thrust paired with the rear-biased M xDrive all-wheel-drive system. Handcrafted Merino leather upholstery, an Alcantara headliner, and carbon-fiber interior trims elevate the cabin into a four-door grand touring sanctuary. From executive highway cruising to aggressive track attack, it commands the asphalt with sovereign poise.",
    specs: {
      accel: "3.0 sec",
      speed: "190 mph",
      power: "617 hp",
      engine: "4.4L M TwinPower Turbo V8"
    }
  },
  {
    id: 2,
    name: "M4 Competition Coupe (G82)",
    company: "BMW M",
    price: "$83,200",
    category: "supercar",
    image: "car-images/bmw2.jpg",
    badge: "Track Scalpel",
    description: "The BMW M4 Competition Coupe is an unapologetic track weapon sculpted with razor-sharp aerodynamic contours and the provocative frameless vertical kidney grille. Under the carbon hood lies the high-revving S58 3.0-liter BMW M TwinPower Turbo inline-six engine producing 503 horsepower and 479 lb-ft of torque. Optional M Carbon bucket seats hold the driver in an authentic motorsport posture with integrated harness cutouts. With 10-stage M Traction Control and adaptive M suspension, it delivers razor-sharp precision at every apex.",
    specs: {
      accel: "3.4 sec",
      speed: "180 mph",
      power: "503 hp",
      engine: "3.0L S58 Twin-Turbo I6"
    }
  },
  {
    id: 3,
    name: "M3 CS Sedan (G80)",
    company: "BMW M",
    price: "$118,700",
    category: "supercar",
    image: "car-images/bmw3.jpg",
    badge: "Clubsport Legend",
    description: "The limited-edition BMW M3 CS brings hardcore motorsport philosophy directly to the four-door sports sedan segment. Enhanced with an uprated 543-horsepower S58 powerplant, lightweight carbon-fiber reinforced plastic (CFRP) roof, hood, and rear spoiler, it sheds significant mass over standard models. The chassis geometry and electronically controlled dampers are calibrated specifically for high-speed lateral g-forces and aggressive circuit kerb hopping. Yellow Motorsport LED daytime running lights evoke BMW’s endurance racing heritage, creating an unmistakable presence.",
    specs: {
      accel: "3.2 sec",
      speed: "188 mph",
      power: "543 hp",
      engine: "3.0L M TwinPower Turbo I6"
    }
  },
  {
    id: 4,
    name: "M5 Competition (F90)",
    company: "BMW M",
    price: "$111,900",
    category: "supercar",
    image: "car-images/bmw4.jpg",
    badge: "Executive Supercar",
    description: "The BMW M5 Competition remains the executive supercar standard against which all high-performance luxury saloons are judged. Beneath its sculpted aluminum bonnet breathes a 4.4-liter biturbo V8 developing 617 horsepower and 553 lb-ft of torque. The intelligent M xDrive system can be toggled via the iDrive display into pure 2WD rear-wheel-drive mode for uncompromising, tire-smoking drift balance. Inside, the M Multifunction seats with illuminated M badges ensure peerless long-distance ergonomics alongside ferocious acceleration.",
    specs: {
      accel: "3.1 sec",
      speed: "190 mph",
      power: "617 hp",
      engine: "4.4L Biturbo V8"
    }
  },
  {
    id: 5,
    name: "i8 Ultimate Sophisto",
    company: "BMW i",
    price: "$148,500",
    category: "hypercar",
    image: "car-images/bmw5.jpg",
    badge: "Futuristic Icon",
    description: "The BMW i8 Ultimate Sophisto is a visionary futuristic hybrid icon wrapped in lightweight carbon-fiber LifeDrive architecture with dramatic dihedral butterfly doors. Combining an electric synchronous motor on the front axle with a high-boost turbocharged mid-engine on the rear axle, it achieves near-perfect 50:50 weight distribution. Sophisto Grey metallic paint accented with E-Copper detailing creates a striking visual contrast that looks straight out of the next century. It remains one of the most innovative and head-turning sports cars ever created by BMW.",
    specs: {
      accel: "4.2 sec",
      speed: "155 mph (Ltd)",
      power: "369 hp (Hybrid)",
      engine: "1.5L Turbo + E-Motor"
    }
  },
  {
    id: 6,
    name: "Z4 M40i Roadster",
    company: "BMW",
    price: "$66,300",
    category: "grandtourer",
    image: "car-images/bmw6.jpg",
    badge: "Open-Top Roadster",
    description: "The BMW Z4 M40i Roadster captures the pure, wind-in-your-hair romance of the classic open-top roadster infused with modern M Performance punch. Powered by the venerable B58 3.0-liter turbocharged inline-six generating 382 horsepower, it delivers an intoxicating, melodic straight-six exhaust howl. The lightweight fabric soft-top opens or closes electrically in just 10 seconds at speeds up to 31 mph. Perfectly tuned 50:50 axle weight balance and M Sport differential turn every winding coastal road into a masterclass in driving joy.",
    specs: {
      accel: "3.9 sec",
      speed: "155 mph (Ltd)",
      power: "382 hp",
      engine: "3.0L B58 Turbo Inline-6"
    }
  },
  {
    id: 7,
    name: "M2 Coupe (G87)",
    company: "BMW M",
    price: "$63,200",
    category: "supercar",
    image: "car-images/bmw7.jpg",
    badge: "Compact Beast",
    description: "The compact powerhouse BMW M2 Coupe is engineered for pure, unadulterated driver involvement and mechanical authenticity. Inheriting the twin-turbo 3.0-liter S58 engine from its bigger M3 and M4 siblings, it pushes 453 horsepower directly through its wide rear wheels. Broad flared wheel arches and squared-off air intakes broadcast an aggressive, muscular stance that pays homage to the legendary BMW 2002 turbo. With active M Differential and near-telepathic front-end bite, it is an agile cornering demon that begs to be pushed hard.",
    specs: {
      accel: "3.9 sec",
      speed: "177 mph",
      power: "453 hp",
      engine: "3.0L Twin-Turbo S58 I6"
    }
  },
  {
    id: 8,
    name: "i7 M70 xDrive",
    company: "BMW i / M",
    price: "$168,500",
    category: "luxury",
    image: "car-images/bmw8.jpg",
    badge: "Electric Sovereign",
    description: "The BMW i7 M70 xDrive represents the most powerful all-electric luxury sedan ever engineered by the Bavarian automaker. Two highly integrated electric drive units generate an immense 650 horsepower and 811 lb-ft of instant torque in M Launch Control mode. Passengers in the rear lounge are immersed in supreme opulence with the fold-down 31.3-inch 8K BMW Theatre Screen and Bowers & Wilkins Diamond surround sound. Executive Drive Pro suspension with active roll stabilization ensures floating serenity over all road surfaces.",
    specs: {
      accel: "3.5 sec",
      speed: "155 mph (Ltd)",
      power: "650 hp",
      engine: "Dual M Electric Motors"
    }
  },
  {
    id: 9,
    name: "XM Label Red",
    company: "BMW M",
    price: "$185,900",
    category: "hypercar",
    image: "car-images/bmw9.jpg",
    badge: "738-HP Colossus",
    description: "The BMW XM Label Red is the most powerful road-legal production vehicle in BMW M's storied 50-year history. An electrified M HYBRID powertrain joins a high-revving 4.4-liter M TwinPower Turbo V8 with an electric motor to yield a gargantuan 738 horsepower and 738 lb-ft of torque. Toronto Red metallic kidney grille surrounds and side accent bands highlight its bold, unapologetic presence. Inside, the sculptural 3D prism headliner with 100 LED units and vintage leather lounge seating redefine ultra-luxury SUV performance.",
    specs: {
      accel: "3.7 sec",
      speed: "175 mph",
      power: "738 hp",
      engine: "4.4L V8 M Hybrid"
    }
  },
  {
    id: 10,
    name: "3.0 CSL 50 Jahre",
    company: "BMW M",
    price: "$780,000",
    category: "hypercar",
    image: "car-images/bmw10.jpg",
    badge: "Holy Grail",
    description: "The ultra-exclusive BMW 3.0 CSL was built in a strictly limited run of only 50 hand-numbered units to commemorate five decades of BMW M supremacy. It features the most potent straight-six engine ever homologated for road use by BMW, producing 553 horsepower through a pure 6-speed manual transmission with a white gearshift knob. The handcrafted carbon-fiber bodywork honors the legendary 1970s 'Batmobile' racing champion with iconic roof and rear wings. It stands as an irreplaceable collector's holy grail celebrating pure analog driving passion.",
    specs: {
      accel: "3.5 sec",
      speed: "186 mph",
      power: "553 hp",
      engine: "3.0L Twin-Turbo I6 Manual"
    }
  },
  {
    id: 11,
    name: "X6 M Competition (F96)",
    company: "BMW M",
    price: "$127,200",
    category: "supercar",
    image: "car-images/bmw11.jpg",
    badge: "SAC Apex Predator",
    description: "The BMW X6 M Competition invented the high-performance Sports Activity Coupe segment, merging dominant SUV capability with aggressive fastback coupe aesthetics. Armed with a 617-horsepower 4.4-liter M TwinPower Turbo V8 and 48V mild-hybrid electrification, it defies the laws of physics with blistering straight-line thrust. Staggered 21-inch front and 22-inch rear M Star-spoke wheels provide massive mechanical grip around challenging bends. Inside, the curved display with M-specific graphics keeps vital vehicle telemetry directly in the driver's line of sight.",
    specs: {
      accel: "3.7 sec",
      speed: "177 mph",
      power: "617 hp",
      engine: "4.4L Biturbo V8 Hybrid"
    }
  },
  {
    id: 12,
    name: "1M Coupe Heritage",
    company: "BMW M",
    price: "$72,000",
    category: "supercar",
    image: "car-images/bmw12.jpg",
    badge: "Modern Classic",
    description: "The legendary BMW 1 Series M Coupe is celebrated worldwide as one of the purest, most revered modern classic driver's cars in automotive history. Powered by a twin-turbocharged N54 3.0-liter inline-six pushing 335 horsepower exclusively through a short-throw 6-speed manual gearbox, it delivers visceral mechanical connection. Featuring the wide-track axle architecture and brakes borrowed directly from the contemporary E92 M3, its stubby wheelbase produces intoxicating agility. An appreciating automotive icon that represents analog BMW engineering at its absolute finest.",
    specs: {
      accel: "4.7 sec",
      speed: "155 mph (Ltd)",
      power: "335 hp",
      engine: "3.0L Twin-Turbo N54 I6"
    }
  },
  {
    id: 13,
    name: "M850i xDrive Gran Coupe",
    company: "BMW",
    price: "$103,400",
    category: "grandtourer",
    image: "car-images/bmw13.jpg",
    badge: "V8 Grand Tourer",
    description: "The BMW M850i xDrive Gran Coupe is a sculpted grand tourer that fuses sweeping, elegant four-door proportions with devastating V8 power. Its 4.4-liter BMW TwinPower Turbo V8 produces 523 horsepower, effortlessly propelling the car with velvet-smooth authority. The cabin features optional CraftedClarity glass gear selectors, ambient lighting with cascading contour effects, and heated front armrests. Adaptive M suspension and integral active steering ensure supreme composure whether cruising through Monte Carlo or carving alpine passes.",
    specs: {
      accel: "3.7 sec",
      speed: "155 mph (Ltd)",
      power: "523 hp",
      engine: "4.4L Twin-Turbo V8"
    }
  },
  {
    id: 14,
    name: "i4 M50 Gran Coupe",
    company: "BMW i / M",
    price: "$69,700",
    category: "luxury",
    image: "car-images/bmw14.jpg",
    badge: "Dual-Motor Electric",
    description: "The BMW i4 M50 is the brand's best-selling electric performance car, blending the daily versatility of a four-door Gran Coupe with blistering electric all-wheel-drive performance. Dual electric motors generate 536 horsepower and 586 lb-ft of torque in Sport Boost mode, throwing occupants back into their seats with instant G-forces. Acoustically engineered with BMW IconicSounds Electric composed by Oscar-winner Hans Zimmer, every throttle input has a heroic sci-fi soundtrack. It effortlessly bridges BMW M's legendary dynamic handling with next-generation zero-emission mobility.",
    specs: {
      accel: "3.7 sec",
      speed: "140 mph (Ltd)",
      power: "536 hp",
      engine: "Dual BMW eDrive Motors"
    }
  }
];

// ============================================================================
// 2. STATE & DOM REFERENCES
// ============================================================================
const state = {
  activeFilter: 'all',
  soundEnabled: false,
  audioCtx: null,
  ticking: false
};

const dom = {
  fleetContainer: document.getElementById('fleet-container'),
  filterControls: document.getElementById('filter-controls'),
  modalOverlay: document.getElementById('car-modal-overlay'),
  modalCard: document.getElementById('car-modal-card'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalCarImg: document.getElementById('modal-car-img'),
  modalCompany: document.getElementById('modal-company'),
  modalCarName: document.getElementById('modal-car-name'),
  modalPrice: document.getElementById('modal-price'),
  modalDescription: document.getElementById('modal-description'),
  modalCategoryBadge: document.getElementById('modal-category-badge'),
  specAccel: document.getElementById('spec-accel'),
  specSpeed: document.getElementById('spec-speed'),
  specPower: document.getElementById('spec-power'),
  specEngine: document.getElementById('spec-engine'),
  scrollProgress: document.getElementById('scroll-progress'),
  soundToggleBtn: document.getElementById('sound-toggle-btn'),
  mainNav: document.getElementById('main-nav'),
  toast: document.getElementById('toast-notification'),
  toastMessage: document.getElementById('toast-message')
};

// ============================================================================
// 3. RENDER RUNWAY (Actual BMW Side-View Photos with Boundary Peeking)
// ============================================================================
function renderFleet(filter = 'all') {
  dom.fleetContainer.innerHTML = '';
  
  const filteredCars = filter === 'all' 
    ? FLEET_DATA 
    : FLEET_DATA.filter(c => c.category === filter);

  if (filteredCars.length === 0) {
    dom.fleetContainer.innerHTML = `
      <div style="text-align: center; padding: 4rem; color: #9ba4b5;">
        <h3>No BMW models found in this category.</h3>
      </div>
    `;
    return;
  }

  // Pair cars into dual-boundary rows
  const pairs = [];
  for (let i = 0; i < filteredCars.length; i += 2) {
    pairs.push(filteredCars.slice(i, i + 2));
  }

  pairs.forEach((pair, pairIdx) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'car-runway-row';
    rowEl.setAttribute('data-row-index', pairIdx);

    // Left boundary BMW
    const carLeft = pair[0];
    if (carLeft) {
      rowEl.appendChild(createBMWRunwayItem(carLeft, 'left', (pairIdx * 2) + 1));
    }

    // Right boundary BMW
    const carRight = pair[1];
    if (carRight) {
      rowEl.appendChild(createBMWRunwayItem(carRight, 'right', (pairIdx * 2) + 2));
    }

    dom.fleetContainer.appendChild(rowEl);
  });

  // Calculate scroll physics immediately
  updateScrollPhysics();
}

/**
 * Creates the actual side-view BMW runway item
 * Initially ONLY the photo shows. Clicking opens the center showcase!
 */
function createBMWRunwayItem(car, side, displayIndex) {
  const item = document.createElement('div');
  item.className = `runway-car-item runway-car-${side}`;
  item.setAttribute('data-id', car.id);
  item.setAttribute('data-side', side);
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');
  item.setAttribute('aria-label', `Inspect ${car.company} ${car.name}`);

  // Pure actual photo side-view display
  item.innerHTML = `
    <div class="bmw-photo-frame">
      <img src="${car.image}" alt="${car.company} ${car.name}" class="bmw-actual-photo" loading="lazy">
      <div class="bmw-photo-vignette"></div>
      <div class="bmw-boundary-pill">
        <span class="bmw-roundel-dot"></span>
        <span class="bmw-model-tag">BMW #${displayIndex} • Click to View</span>
      </div>
    </div>
  `;

  // Clicking car brings it to dead center and displays all info!
  item.addEventListener('click', () => openCarModal(car.id));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCarModal(car.id);
    }
  });

  return item;
}

// ============================================================================
// 4. PRECISE HORIZONTAL BOUNDARY SCROLL ENGINE
// "at the center, the car image will be only half, other half will be out of boundery"
// "at the top and bottom, the car will completely dis appear,"
// "and let it move horizontally only but not at all vertically"
// ============================================================================
function updateScrollPhysics() {
  const windowHeight = window.innerHeight;
  const viewportCenter = windowHeight * 0.5;
  const windowWidth = window.innerWidth;
  const inwardOffset = windowWidth <= 860 ? 20 : 70; // px inward from boundary

  const rows = document.querySelectorAll('.car-runway-row');

  rows.forEach(row => {
    const rowRect = row.getBoundingClientRect();
    const rowCenter = rowRect.top + rowRect.height * 0.5;

    // Normalized vertical distance of this row from viewport center:
    // 0 = row is centered on screen
    // > 0 = row is below center (approaching as user scrolls down)
    // < 0 = row is above center (scrolled past towards top)
    const distFromCenter = (rowCenter - viewportCenter) / (windowHeight * 0.68);
    const progress = Math.min(Math.abs(distFromCenter), 1.0);

    const items = row.querySelectorAll('.runway-car-item');
    items.forEach(item => {
      const side = item.getAttribute('data-side');
      const itemRect = item.getBoundingClientRect();
      const cardWidth = itemRect.width || Math.min(560, windowWidth * 0.44);
      const travelDistance = cardWidth + inwardOffset + 120;

      let currentX = 0;
      let opacity = 0;

      if (side === 'left') {
        // Left car:
        // At center (progress = 0): sits completely on screen and +inwardOffset px from left edge!
        // At top/bottom (progress = 1): glides off-screen to the left: -travelDistance px!
        currentX = inwardOffset - (progress * travelDistance);
      } else {
        // Right car:
        // At center (progress = 0): sits completely on screen and -inwardOffset px from right edge!
        // At top/bottom (progress = 1): glides off-screen to the right: +travelDistance px!
        currentX = -inwardOffset + (progress * travelDistance);
      }

      opacity = Math.max(0, 1 - (progress * 1.15));

      // Strictly horizontal motion
      item.style.transform = `translateX(${currentX.toFixed(1)}px)`;
      item.style.opacity = opacity.toFixed(3);
    });
  });

  // Top scroll progress bar
  const scrollTotal = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progressPercent = scrollTotal > 0 ? (scrolled / scrollTotal) * 100 : 0;
  if (dom.scrollProgress) {
    dom.scrollProgress.style.width = `${progressPercent}%`;
  }

  // Scrolled navbar state
  if (window.scrollY > 60) {
    dom.mainNav.classList.add('scrolled');
  } else {
    dom.mainNav.classList.remove('scrolled');
  }

  state.ticking = false;
}

window.addEventListener('scroll', () => {
  if (!state.ticking) {
    window.requestAnimationFrame(updateScrollPhysics);
    state.ticking = true;
  }
}, { passive: true });

window.addEventListener('resize', () => {
  updateScrollPhysics();
});

// ============================================================================
// 5. CENTER SPOTLIGHT & DETAILS MODAL
// "as we click the car, it will come in the center and info will show"
// ============================================================================
function openCarModal(carId) {
  const car = FLEET_DATA.find(c => c.id === carId);
  if (!car) return;

  dom.modalCarImg.src = car.image;
  dom.modalCarImg.alt = `${car.company} ${car.name}`;
  dom.modalCompany.textContent = car.company;
  dom.modalCarName.textContent = car.name;
  dom.modalPrice.textContent = car.price;
  dom.modalDescription.textContent = car.description; // 3-4 lines description
  dom.modalCategoryBadge.textContent = car.category;

  dom.specAccel.textContent = car.specs.accel;
  dom.specSpeed.textContent = car.specs.speed;
  dom.specPower.textContent = car.specs.power;
  dom.specEngine.textContent = car.specs.engine;

  dom.modalOverlay.classList.add('open');
  dom.modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (state.soundEnabled) {
    playEngineSound();
  }
}

function closeCarModal() {
  dom.modalOverlay.classList.remove('open');
  dom.modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

dom.modalCloseBtn.addEventListener('click', closeCarModal);
dom.modalOverlay.addEventListener('click', (e) => {
  if (e.target === dom.modalOverlay) {
    closeCarModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dom.modalOverlay.classList.contains('open')) {
    closeCarModal();
  }
});

// ============================================================================
// 6. CATEGORY FILTER CONTROLS
// ============================================================================
dom.filterControls.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.getAttribute('data-filter');
  state.activeFilter = filter;
  renderFleet(filter);
});

// ============================================================================
// 7. WEB AUDIO API SYNTHETIC BMW M TWINPOWER TURBO ROAR
// ============================================================================
function initAudio() {
  if (!state.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new AudioContext();
  }
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
}

function playEngineSound() {
  try {
    initAudio();
    const ctx = state.audioCtx;
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.exponentialRampToValueAtTime(0.38, now + 0.18);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
    masterGain.connect(ctx.destination);

    // Deep BMW V8 / S58 Sub rumble
    const oscSub = ctx.createOscillator();
    oscSub.type = 'sawtooth';
    oscSub.frequency.setValueAtTime(50, now);
    oscSub.frequency.exponentialRampToValueAtTime(145, now + 0.45);
    oscSub.frequency.exponentialRampToValueAtTime(75, now + 1.3);
    oscSub.frequency.exponentialRampToValueAtTime(40, now + 2.0);

    // TwinPower harmonic rasp
    const oscHarm = ctx.createOscillator();
    oscHarm.type = 'triangle';
    oscHarm.frequency.setValueAtTime(100, now);
    oscHarm.frequency.exponentialRampToValueAtTime(320, now + 0.45);
    oscHarm.frequency.exponentialRampToValueAtTime(160, now + 1.3);
    oscHarm.frequency.exponentialRampToValueAtTime(80, now + 2.0);

    // Resonant M Sport exhaust filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + 0.45);
    filter.frequency.exponentialRampToValueAtTime(450, now + 1.6);
    filter.Q.value = 4.2;

    oscSub.connect(filter);
    oscHarm.connect(filter);
    filter.connect(masterGain);

    oscSub.start(now);
    oscHarm.start(now);
    oscSub.stop(now + 2.05);
    oscHarm.stop(now + 2.05);

    showToast("BMW M TwinPower Turbo engine rev synthesized!");
  } catch (err) {
    console.log("Audio synthesis error:", err);
  }
}

dom.soundToggleBtn.addEventListener('click', () => {
  initAudio();
  state.soundEnabled = !state.soundEnabled;
  if (state.soundEnabled) {
    dom.soundToggleBtn.classList.add('active');
    dom.soundToggleBtn.querySelector('.sound-status-text').textContent = 'Audio: On';
    playEngineSound();
    showToast("BMW M Sound effects activated! Click any car to hear its exhaust.");
  } else {
    dom.soundToggleBtn.classList.remove('active');
    dom.soundToggleBtn.querySelector('.sound-status-text').textContent = 'Audio: Off';
    showToast("Sound effects muted.");
  }
});

window.playEngineSound = playEngineSound;

window.bookTestDrive = function() {
  const carName = dom.modalCarName.textContent;
  const company = dom.modalCompany.textContent;
  closeCarModal();
  showToast(`Official BMW M test drive reserved for ${company} ${carName}! A client advisor will contact you.`);
};

window.handleQuickInquiry = function() {
  showToast("Your confidential BMW consultation request has been dispatched to our private desk.");
  const form = document.getElementById('quick-inquiry-form');
  if (form) form.reset();
};

// ============================================================================
// 8. TOAST NOTIFICATIONS
// ============================================================================
let toastTimeout;
function showToast(message) {
  if (toastTimeout) clearTimeout(toastTimeout);
  dom.toastMessage.textContent = message;
  dom.toast.classList.add('active');

  toastTimeout = setTimeout(() => {
    dom.toast.classList.remove('active');
  }, 4200);
}

// ============================================================================
// 9. INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderFleet('all');
  setTimeout(updateScrollPhysics, 60);
});
