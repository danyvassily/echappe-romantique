// Initialisation GSAP
gsap.registerPlugin(ScrollTrigger);

// Configuration globale
const CONFIG = {
  animations: {
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
  },
  scroll: {
    trigger: {
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  },
};

// Animation du loader/entrée de page
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeNavigation();
  initializeScrollEffects();
  initializeInteractions();
  initializePerformance();
});

// Initialisation des animations principales
function initializeAnimations() {
  const mainTl = gsap.timeline();

  mainTl
    .from("#nav-logo", {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out",
    })
    .from(
      "nav .nav-link",
      {
        duration: 0.6,
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.5"
    );

  const heroTl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power3.out",
      opacity: 0,
    },
  });

  heroTl
    .from("#hero-logo", {
      y: -50,
      scale: 0.9,
    })
    .from(
      "#hero-content h1",
      {
        y: 80,
      },
      "-=0.7"
    )
    .from(
      "#hero-content p",
      {
        y: 50,
      },
      "-=0.8"
    )
    .from(
      "#hero-content .flex.gap-4",
      {
        y: 30,
      },
      "-=0.8"
    )
    .fromTo(
      "#cessna-plane",
      {
        x: "100vw",
        y: -50,
        rotation: -5,
        opacity: 0,
      },
      {
        duration: 2,
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        ease: "power2.out",
      },
      "-=0.5"
    );

  // Animation de flottement de l'avion améliorée
  gsap.to("#cessna-plane", {
    y: "+=25",
    rotation: "+=2.5",
    duration: 3.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 2,
  });

  // Création et animation des nuages
  const skyEffectsContainer = document.getElementById("sky-effects");
  if (skyEffectsContainer) {
    const cloudCount = 7;
    for (let i = 0; i < cloudCount; i++) {
      const cloud = document.createElement("div");
      cloud.classList.add("cloud");
      const cloudMain = document.createElement("div");
      cloudMain.classList.add("cloud-main");
      cloud.appendChild(cloudMain);
      skyEffectsContainer.appendChild(cloud);

      const animateCloud = () => {
        const duration = gsap.utils.random(25, 40);
        const startY = gsap.utils.random(5, 70); // %
        const startX = 110; // start off-screen
        const endX = -30; // end off-screen
        const scale = gsap.utils.random(0.4, 1.3);
        const rotation = gsap.utils.random(-4, 4);

        gsap.set(cloud, {
          top: `${startY}%`,
          xPercent: startX * 10,
          scale: scale,
        });

        gsap.to(cloud, {
          xPercent: endX * 10,
          rotation: rotation,
          duration: duration,
          ease: "none",
          onStart: () => {
            gsap.to(cloud, { opacity: 1, duration: 2 });
          },
          onComplete: () => {
            gsap.to(cloud, {
              opacity: 0,
              duration: 2,
              onComplete: animateCloud,
            });
          },
        });
      };

      setTimeout(animateCloud, gsap.utils.random(0, 15) * 1000);
    }
  }
}

// Initialisation de la navigation
function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  mobileMenuBtn?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("active");

    if (!isOpen) {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("active");

      gsap.from(mobileMenu.querySelectorAll("a"), {
        duration: 0.3,
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      });
    } else {
      gsap.to(mobileMenu.querySelectorAll("a"), {
        duration: 0.2,
        y: -10,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("active");
        },
      });
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power2.inOut",
        });
      }
    });
  });
}

// Initialisation des effets de scroll
function initializeScrollEffects() {
  gsap.utils.toArray("section:not(#hero)").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
      y: (i, el) => -15 * Math.random(),
      ease: "none",
    });
  });
}

// Initialisation des interactions
function initializeInteractions() {
  document.querySelectorAll(".lift-on-hover").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        duration: 0.3,
        y: -8,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        ease: "power2.out",
      });
    });
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    const span = link.querySelector("span");
    if (!span) return;

    link.addEventListener("mouseenter", () => {
      gsap.to(span, {
        duration: 0.3,
        width: "100%",
        ease: "power2.out",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(span, {
        duration: 0.3,
        width: "0%",
        ease: "power2.out",
      });
    });
  });
}

// Optimisations de performance
function initializePerformance() {
  gsap.set(".will-change-transform", { willChange: "transform" });
  gsap.set(".will-change-opacity", { willChange: "opacity" });

  if (window.innerWidth <= 768) {
    gsap.globalTimeline.timeScale(0.9);

    gsap.utils.toArray("section").forEach((section) => {
      const st = ScrollTrigger.getByTrigger(section);
      if (st && st.vars.scrub) {
        st.kill();
        gsap.set(section, { y: 0 });
      }
    });
  }
}

// Gestion des erreurs et fallbacks
window.addEventListener("error", (e) => {
  console.warn("Animation error:", e);
  document.querySelectorAll(".opacity-0").forEach((el) => {
    el.style.opacity = "1";
  });
});

// Gestion du thème sombre
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark-mode");
}

// Écouteur pour les changements de thème
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (e.matches) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  });
