const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav_links");
  const navLinks = document.querySelectorAll(".nav_links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 4 + 0.3}s`;
      }
    });
    burger.classList.toggle("toggle");
  });
};

navSlide();

// GSAP Page Load Sequence
const tl = gsap.timeline({ defaults: { ease: "power0.out" } });

tl.fromTo("nav li", { x: "-15%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5 });
tl.fromTo(".logo", { x: "-10%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5 });
tl.fromTo("#about .about_me", { y: "10%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.5 });
tl.fromTo("#about .my_description", { y: "10%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.65 });
tl.fromTo(".profile-image", { y: "10%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.75 });

// --- DYNAMIC PASTEL MESH TIMELINE FOR PHASES ---
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const phaseCards = [
    document.getElementById('phase-0'),
    document.getElementById('phase-1'),
    document.getElementById('phase-2'),
    document.getElementById('phase-3')
  ];
  const navItems = document.querySelectorAll('.phase-nav-item');
  const connectors = document.querySelectorAll('.p-connector .p-line');
  const timelineNav = document.querySelector('.phase-timeline-nav');
  const bgColor = document.querySelector('.phase-bg-color');
  const orb1 = document.querySelector('.phase-orb-1');
  const orb2 = document.querySelector('.phase-orb-2');

  const phaseAccents = [
    '#ea580c', // Phase 1: Warm Apricot / Peach
    '#2563eb', // Phase 2: Sapphire Sky Blue
    '#7c3aed', // Phase 3: Lavender Amethyst
    '#059669'  // Phase 4: Aurora Mint
  ];

  function updateTimelineNav(activeIndex) {
    const activeColor = phaseAccents[activeIndex];

    navItems.forEach((item, idx) => {
      const num = item.querySelector('.p-num');
      const label = item.querySelector('.p-label');
      if (idx === activeIndex) {
        item.classList.add('active');
        if (num) num.style.color = activeColor;
        if (label) label.style.color = '#0f172a';
      } else {
        item.classList.remove('active');
        if (num) num.style.color = '#94a3b8';
        if (label) label.style.color = '#94a3b8';
      }
    });

    connectors.forEach((line, idx) => {
      if (idx < activeIndex) {
        line.style.transform = 'scaleX(1)';
        line.style.backgroundColor = phaseAccents[idx];
      } else {
        line.style.transform = 'scaleX(0)';
      }
    });

    const currentCard = phaseCards[activeIndex];
    if (currentCard) {
      const stageLabel = currentCard.querySelector('.stage');
      if (stageLabel) stageLabel.style.color = activeColor;
    }
  }

  // Tightened pin distance (+=2300) removes sluggish scrolling
  const phaseTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "+=2300",
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        const step = Math.min(3, Math.floor(self.progress * 4));
        updateTimelineNav(step);
      }
    }
  });

  // Initial State: Seamless with About gradient
  gsap.set(phaseCards[0], { opacity: 1, visibility: 'visible', y: 0 });
  gsap.set([phaseCards[1], phaseCards[2], phaseCards[3]], { opacity: 0, visibility: 'hidden', y: 25 });
  gsap.set(bgColor, { opacity: 0, backgroundColor: 'transparent' });
  gsap.set(orb1, { backgroundColor: 'rgba(254, 215, 170, 0.45)', opacity: 0.35 });
  gsap.set(orb2, { backgroundColor: 'rgba(224, 231, 255, 0.35)', opacity: 0.3 });
  
  updateTimelineNav(0);

  // Phase 0 -> Phase 1 (Growth -> Realization: Sky Blue blooms)
  phaseTL.to(phaseCards[0], { opacity: 0, y: -20, duration: 1.0, ease: 'power1.inOut' }, 1.0)
         .set(phaseCards[0], { visibility: 'hidden' })
         .set(phaseCards[1], { visibility: 'visible' })
         .to(phaseCards[1], { opacity: 1, y: 0, duration: 1.0, ease: 'power1.inOut' }, 1.2)
         .to(bgColor, { opacity: 1, backgroundColor: '#f0f7ff', duration: 1.2, ease: 'power1.inOut' }, 1.0)
         .to(orb1, { backgroundColor: 'rgba(186, 230, 253, 0.7)', opacity: 0.65, duration: 1.2, ease: 'power1.inOut' }, 1.0)
         .to(orb2, { backgroundColor: 'rgba(199, 210, 254, 0.6)', opacity: 0.55, duration: 1.2, ease: 'power1.inOut' }, 1.0);

  // Phase 1 -> Phase 2 (Realization -> Longing: Lavender & Rose mist)
  phaseTL.to(phaseCards[1], { opacity: 0, y: -20, duration: 1.0, ease: 'power1.inOut' }, 3.0)
         .set(phaseCards[1], { visibility: 'hidden' })
         .set(phaseCards[2], { visibility: 'visible' })
         .to(phaseCards[2], { opacity: 1, y: 0, duration: 1.0, ease: 'power1.inOut' }, 3.2)
         .to(bgColor, { backgroundColor: '#faf5ff', duration: 1.2, ease: 'power1.inOut' }, 3.0)
         .to(orb1, { backgroundColor: 'rgba(233, 213, 255, 0.7)', opacity: 0.65, duration: 1.2, ease: 'power1.inOut' }, 3.0)
         .to(orb2, { backgroundColor: 'rgba(251, 207, 232, 0.55)', opacity: 0.5, duration: 1.2, ease: 'power1.inOut' }, 3.0);

  // Phase 2 -> Phase 3 (Longing -> New Horizon: Aurora Mint)
  phaseTL.to(phaseCards[2], { opacity: 0, y: -20, duration: 1.0, ease: 'power1.inOut' }, 5.0)
         .set(phaseCards[2], { visibility: 'hidden' })
         .set(phaseCards[3], { visibility: 'visible' })
         .to(phaseCards[3], { opacity: 1, y: 0, duration: 1.0, ease: 'power1.inOut' }, 5.2)
         .to(bgColor, { backgroundColor: '#f0fdf9', duration: 1.2, ease: 'power1.inOut' }, 5.0)
         .to(orb1, { backgroundColor: 'rgba(167, 243, 208, 0.65)', opacity: 0.6, duration: 1.2, ease: 'power1.inOut' }, 5.0)
         .to(orb2, { backgroundColor: 'rgba(186, 230, 253, 0.55)', opacity: 0.5, duration: 1.2, ease: 'power1.inOut' }, 5.0);

  // Phase 4 Exit directly into Featured Works
  phaseTL.to(phaseCards[3], { opacity: 0, y: -20, duration: 0.9, ease: 'power1.inOut' }, 6.4)
         .to(timelineNav, { opacity: 0, y: -15, duration: 0.7, ease: 'power1.inOut' }, 6.4)
         .to(bgColor, { backgroundColor: 'rgb(18, 18, 18)', duration: 0.9, ease: 'power1.inOut' }, 6.4)
         .to([orb1, orb2], { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, 6.4);

  // Clickable Navigation
  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const st = phaseTL.scrollTrigger;
      if (!st) return;
      const targetScroll = st.start + (st.end - st.start) * (index / 3.4);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});

// --- HELPER FUNCTIONS FOR YOUTUBE CONTROL ---
function muteAllYouTubeVideos() {
  const ytIframes = document.querySelectorAll('.yt-short-iframe');
  ytIframes.forEach(iframe => {
    try {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
    } catch (err) {
      console.error('Error controlling iframe:', err);
    }
  });
}

function playYouTubeVideo(iframeElement) {
  if (!iframeElement) return;
  try {
    iframeElement.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    iframeElement.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
  } catch (err) {
    console.error('Error playing iframe:', err);
  }
}

// --- SPACE FALL TIMELINE (8-Prop Dynamic Flow) ---
let fallTL = null;
let yt1Active = false;
let yt2Active = false;
let yt3Active = false;
let tunnelTargetProgress = 0;

function buildSpaceFallTimeline() {
  const yt1Frame = document.querySelector('.prop-youtube iframe');
  const yt2Frame = document.querySelector('.prop-mac iframe');
  const yt3Frame = document.querySelector('.prop-frame iframe');

  fallTL = gsap.timeline({ paused: true, defaults: { ease: "none" } });

  // 1. Atmosphere Shifts (Across 56s total timeline)
  fallTL.fromTo('.tunnel-bg-tint',
    { backgroundColor: 'rgba(0, 0, 0, 0)' },
    { backgroundColor: 'rgba(255, 110, 0, 0.65)', duration: 4.0 },
    0
  );
  fallTL.to('.tunnel-bg-tint', { backgroundColor: 'rgba(0, 149, 255, 0.65)', duration: 5.0 }, 7.0);
  fallTL.to('.tunnel-bg-tint', { backgroundColor: 'rgba(236, 72, 153, 0.65)', duration: 5.0 }, 15.0);
  fallTL.to('.tunnel-bg-tint', { backgroundColor: 'rgba(16, 185, 129, 0.65)', duration: 6.0 }, 24.0);
  fallTL.to('.tunnel-bg-tint', { backgroundColor: 'rgba(147, 51, 234, 0.65)', duration: 6.0 }, 34.0);
  fallTL.to('.tunnel-bg-tint', { backgroundColor: 'rgba(59, 130, 246, 0.65)', duration: 5.0 }, 44.0);
  fallTL.to('.tunnel-bg-tint', { backgroundColor: 'rgba(0, 0, 0, 0)', duration: 4.0 }, 52.0);

  // --- PROPS TIMELINE ---

  // 1. Prop 1: Clock (0s -> 8.0s)
  fallTL.fromTo('.prop-clock',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '40vh', scale: 0.15, opacity: 0, zIndex: 30 },
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, duration: 1.8, ease: 'power2.out' },
    0
  );
  fallTL.to('.prop-clock',
    { xPercent: -50, yPercent: -50, x: '1.5vw', y: '-2vh', scale: 1.03, duration: 4.7, ease: 'sine.inOut' },
    1.8
  );
  fallTL.to('.prop-clock',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in' },
    6.5
  );

  // 2. Prop 2: YouTube Short 1 (3.5s -> 15.0s)
  fallTL.fromTo('.prop-youtube',
    { xPercent: -50, yPercent: -50, x: '16vw', y: '35vh', scale: 0.15, opacity: 0, zIndex: 10, pointerEvents: 'none' },
    { xPercent: -50, yPercent: -50, x: '12vw', y: '20vh', scale: 0.45, opacity: 0.65, duration: 3.0, ease: 'sine.out' },
    3.5
  );
  fallTL.to('.prop-youtube',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, zIndex: 30, duration: 1.5, ease: 'power2.out', pointerEvents: 'auto' },
    6.5
  );
  fallTL.to('.prop-youtube',
    { xPercent: -50, yPercent: -50, x: '-1vw', y: '-2vh', scale: 1.03, duration: 5.5, ease: 'sine.inOut', pointerEvents: 'auto' },
    8.0
  );
  fallTL.to('.prop-youtube',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in', pointerEvents: 'none' },
    13.5
  );

  // 3. Prop 3: Circles (10.0s -> 21.5s)
  fallTL.fromTo('.prop-key',
    { xPercent: -50, yPercent: -50, x: '-16vw', y: '35vh', scale: 0.15, opacity: 0, zIndex: 10 },
    { xPercent: -50, yPercent: -50, x: '-12vw', y: '20vh', scale: 0.45, opacity: 0.65, duration: 3.5, ease: 'sine.out' },
    10.0
  );
  fallTL.to('.prop-key',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, zIndex: 30, duration: 1.5, ease: 'power2.out' },
    13.5
  );
  fallTL.to('.prop-key',
    { xPercent: -50, yPercent: -50, x: '1.5vw', y: '-2vh', scale: 1.03, duration: 5.0, ease: 'sine.inOut' },
    15.0
  );
  fallTL.to('.prop-key',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in' },
    20.0
  );

  // 4. Prop 4: Frame Video (16.5s -> 28.5s)
  fallTL.fromTo('.prop-frame',
    { xPercent: -50, yPercent: -50, x: '16vw', y: '35vh', scale: 0.15, opacity: 0, zIndex: 10, pointerEvents: 'none' },
    { xPercent: -50, yPercent: -50, x: '12vw', y: '20vh', scale: 0.45, opacity: 0.65, duration: 3.5, ease: 'sine.out' },
    16.5
  );
  fallTL.to('.prop-frame',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, zIndex: 30, duration: 1.5, ease: 'power2.out', pointerEvents: 'auto' },
    20.0
  );
  fallTL.to('.prop-frame',
    { xPercent: -50, yPercent: -50, x: '-1vw', y: '-2vh', scale: 1.03, duration: 5.5, ease: 'sine.inOut', pointerEvents: 'auto' },
    21.5
  );
  fallTL.to('.prop-frame',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in', pointerEvents: 'none' },
    27.0
  );

  // 5. Prop 5: Instagram Reel (23.5s -> 35.5s)
  fallTL.fromTo('.prop-insta',
    { xPercent: -50, yPercent: -50, x: '-16vw', y: '35vh', scale: 0.15, opacity: 0, zIndex: 10, pointerEvents: 'none' },
    { xPercent: -50, yPercent: -50, x: '-12vw', y: '20vh', scale: 0.45, opacity: 0.65, duration: 3.5, ease: 'sine.out' },
    23.5
  );
  fallTL.to('.prop-insta',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, zIndex: 30, duration: 1.5, ease: 'power2.out', pointerEvents: 'auto' },
    27.0
  );
  fallTL.to('.prop-insta',
    { xPercent: -50, yPercent: -50, x: '1vw', y: '-2vh', scale: 1.03, duration: 5.5, ease: 'sine.inOut', pointerEvents: 'auto' },
    28.5
  );
  fallTL.to('.prop-insta',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in', pointerEvents: 'none' },
    34.0
  );

  // 6. Prop 6: Okay (30.5s -> 42.0s)
  fallTL.fromTo('.prop-potion',
    { xPercent: -50, yPercent: -50, x: '16vw', y: '35vh', scale: 0.15, opacity: 0, zIndex: 10 },
    { xPercent: -50, yPercent: -50, x: '12vw', y: '20vh', scale: 0.45, opacity: 0.65, duration: 3.5, ease: 'sine.out' },
    30.5
  );
  fallTL.to('.prop-potion',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, zIndex: 30, duration: 1.5, ease: 'power2.out' },
    34.0
  );
  fallTL.to('.prop-potion',
    { xPercent: -50, yPercent: -50, x: '-1.5vw', y: '2vh', scale: 1.03, duration: 5.0, ease: 'sine.inOut' },
    35.5
  );
  fallTL.to('.prop-potion',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in' },
    40.5
  );

  // 7. Prop 7: Luv (37.0s -> 48.5s)
  fallTL.fromTo('.prop-compass',
    { xPercent: -50, yPercent: -50, x: '-16vw', y: '35vh', scale: 0.15, opacity: 0, zIndex: 10 },
    { xPercent: -50, yPercent: -50, x: '-12vw', y: '20vh', scale: 0.45, opacity: 0.65, duration: 3.5, ease: 'sine.out' },
    37.0
  );
  fallTL.to('.prop-compass',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, zIndex: 30, duration: 1.5, ease: 'power2.out' },
    40.5
  );
  fallTL.to('.prop-compass',
    { xPercent: -50, yPercent: -50, x: '1.5vw', y: '-2vh', scale: 1.03, duration: 5.0, ease: 'sine.inOut' },
    42.0
  );
  fallTL.to('.prop-compass',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in' },
    47.0
  );

  // 8. Prop 8: YouTube Short 2 (43.5s -> 56.0s)
  fallTL.fromTo('.prop-mac',
    { xPercent: -50, yPercent: -50, x: '16vw', y: '35vh', scale: 0.15, opacity: 0, zIndex: 10, pointerEvents: 'none' },
    { xPercent: -50, yPercent: -50, x: '12vw', y: '20vh', scale: 0.45, opacity: 0.65, duration: 3.5, ease: 'sine.out' },
    43.5
  );
  fallTL.to('.prop-mac',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '0vh', scale: 1.0, opacity: 1, zIndex: 30, duration: 1.5, ease: 'power2.out', pointerEvents: 'auto' },
    47.0
  );
  fallTL.to('.prop-mac',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-2vh', scale: 1.03, duration: 6.0, ease: 'sine.inOut', pointerEvents: 'auto' },
    48.5
  );
  fallTL.to('.prop-mac',
    { xPercent: -50, yPercent: -50, x: '0vw', y: '-55vh', scale: 1.8, opacity: 0, duration: 1.5, ease: 'power1.in', pointerEvents: 'none' },
    54.5
  );

  // Calibrated Audio Monitor for 56s timeline
  fallTL.eventCallback("onUpdate", () => {
    const progress = fallTL.progress();

    if (progress >= 0.12 && progress <= 0.24) {
      if (!yt1Active) {
        yt1Active = true;
        playYouTubeVideo(yt1Frame);
      }
    } else {
      if (yt1Active) {
        yt1Active = false;
        if (yt1Frame) {
          yt1Frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          yt1Frame.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        }
      }
    }

    if (progress >= 0.36 && progress <= 0.48) {
      if (!yt3Active) {
        yt3Active = true;
        playYouTubeVideo(yt3Frame);
      }
    } else {
      if (yt3Active) {
        yt3Active = false;
        if (yt3Frame) {
          yt3Frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          yt3Frame.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        }
      }
    }

    if (progress >= 0.84 && progress <= 0.97) {
      if (!yt2Active) {
        yt2Active = true;
        playYouTubeVideo(yt2Frame);
      }
    } else {
      if (yt2Active) {
        yt2Active = false;
        if (yt2Frame) {
          yt2Frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          yt2Frame.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        }
      }
    }
  });
}

function resetSpaceFallTimeline() {
  if (!fallTL) {
    buildSpaceFallTimeline();
  }
  tunnelTargetProgress = 0;
  fallTL.progress(0);
  yt1Active = false;
  yt2Active = false;
  yt3Active = false;
  muteAllYouTubeVideos();
}

// --- RESISTANCE & RABBIT HOLE WHEEL CONTROLLER ---
document.addEventListener('DOMContentLoaded', () => {
  const rabbitHoleSection = document.getElementById('rabbit-hole');
  const closeBtn = document.getElementById('closeRabbitHole');
  const contactSection = document.getElementById('contact');
  const aboutSection = document.getElementById('about');
  const rabbitText = document.querySelector('.rabbit-hole-text');

  let isTunnelOpen = false;
  let resistanceState = 'idle';
  let armedResetTimer = null;
  let tunnelWheelActive = false;

  function triggerResistance() {
    resistanceState = 'resisting';

    gsap.killTweensOf('#contact');
    gsap.set('#contact', { x: 0, y: 0 });

    gsap.timeline()
      .to('#contact', { y: -25, duration: 0.1, ease: 'power2.out' })
      .to('#contact', { x: -14, duration: 0.04 }, '<')
      .to('#contact', { x: 14, duration: 0.04 })
      .to('#contact', { x: -10, duration: 0.04 })
      .to('#contact', { x: 10, duration: 0.04 })
      .to('#contact', { x: -5, duration: 0.04 })
      .to('#contact', { x: 0, duration: 0.04 })
      .to('#contact', { y: 0, duration: 0.35, ease: 'bounce.out' });

    window.scrollBy({
      top: -180,
      left: 0,
      behavior: 'smooth'
    });

    if (rabbitText) {
      rabbitText.style.color = '#ef4444';
      rabbitText.innerText = 'Curiosity often leads to trouble... push again!';
      gsap.fromTo(rabbitText, { scale: 1.15 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
    }

    setTimeout(() => {
      resistanceState = 'armed';

      clearTimeout(armedResetTimer);
      armedResetTimer = setTimeout(() => {
        resistanceState = 'idle';
        if (rabbitText) {
          rabbitText.style.color = '#a1a1aa';
          rabbitText.innerText = 'Go down the rabbit hole...';
          gsap.to(rabbitText, { scale: 1, duration: 0.2 });
        }
      }, 3500);
    }, 750);
  }

  function enterRabbitHole() {
    resistanceState = 'idle';
    clearTimeout(armedResetTimer);

    if (rabbitText) {
      rabbitText.style.color = '#a1a1aa';
      rabbitText.innerText = 'Go down the rabbit hole...';
      gsap.to(rabbitText, { scale: 1, duration: 0.2 });
    }

    isTunnelOpen = true;
    tunnelWheelActive = false;
    tunnelTargetProgress = 0;

    rabbitHoleSection.classList.add('visible');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(rabbitHoleSection, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );

    resetSpaceFallTimeline();

    setTimeout(() => {
      tunnelWheelActive = true;
    }, 350);
  }

  function exitTunnelToSection(targetSection) {
    muteAllYouTubeVideos();

    gsap.to(rabbitHoleSection, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        rabbitHoleSection.classList.remove('visible');
        document.body.style.overflow = '';
        isTunnelOpen = false;
        tunnelWheelActive = false;
        resetSpaceFallTimeline();
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // DIRECT CLICK/TAP SUPPORT (Crucial for iOS & Mobile)
  if (rabbitText) {
    rabbitText.style.cursor = 'pointer';
    rabbitText.addEventListener('click', () => {
      if (!isTunnelOpen) {
        enterRabbitHole();
      }
    });
    rabbitText.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (!isTunnelOpen) {
        enterRabbitHole();
      }
    });
  }

  window.addEventListener('wheel', (e) => {
    if (isTunnelOpen) {
      e.preventDefault();
      if (!tunnelWheelActive) return;

      const delta = e.deltaY * 0.00075;

      if (tunnelTargetProgress <= 0 && delta < 0) {
        exitTunnelToSection(contactSection);
        return;
      }

      if (tunnelTargetProgress >= 1.0 && delta > 0) {
        exitTunnelToSection(aboutSection);
        return;
      }

      tunnelTargetProgress += delta;
      tunnelTargetProgress = Math.max(0, Math.min(1.0, tunnelTargetProgress));

      gsap.to(fallTL, {
        progress: tunnelTargetProgress,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      return;
    }

    const scrollPosition = Math.ceil(window.innerHeight + window.scrollY);
    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const isAtBottom = scrollPosition >= pageHeight - 100;

    if (isAtBottom && e.deltaY > 0) {
      e.preventDefault();

      if (resistanceState === 'idle') {
        triggerResistance();
      } else if (resistanceState === 'resisting') {
        return;
      } else if (resistanceState === 'armed') {
        enterRabbitHole();
      }
    }
  }, { passive: false });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      exitTunnelToSection(contactSection);
    });
  }
});

// FEATURED WORKS SLIDER
const scrollContainer = document.querySelector('.project-scroll-container');

if (scrollContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;
  let momentumID;
  let hasMoved = false;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    hasMoved = false;
    scrollContainer.classList.add('active-dragging');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    
    cancelAnimationFrame(momentumID);
    lastX = e.pageX;
    lastTime = Date.now();

    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    scrollContainer.classList.remove('active-dragging');
    applyMomentum();
    
    if (hasMoved) {
      setTimeout(() => {
        hasMoved = false;
      }, 50);
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = x - startX;
    
    if (Math.abs(walk) > 5) {
      hasMoved = true;
      e.preventDefault();
    }

    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      velocity = (e.pageX - lastX) / dt;
    }
    lastX = e.pageX;
    lastTime = now;

    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  function applyMomentum() {
    if (Math.abs(velocity) < 0.05) return;
    scrollContainer.scrollLeft -= velocity * 16;
    velocity *= 0.92;
    momentumID = requestAnimationFrame(applyMomentum);
  }

  const projectCards = document.querySelectorAll('.project-card-item');
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }, true);
  });
}

