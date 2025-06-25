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

  // Création et animation des nuages améliorés
  const skyEffectsContainer = document.getElementById("sky-effects");
  if (skyEffectsContainer) {
    const cloudConfigs = [
      // Grands nuages principaux
      {
        count: 4,
        type: "cloud-main",
        variants: ["cloud-variant-1", "cloud-variant-2", "cloud-variant-3"],
      },
      // Nuages moyens
      {
        count: 6,
        type: "cloud-medium",
        variants: ["cloud-variant-1", "cloud-variant-2"],
      },
      // Petits nuages
      {
        count: 8,
        type: "cloud-small",
        variants: ["cloud-variant-1", "cloud-variant-3"],
      },
    ];

    cloudConfigs.forEach((config) => {
      for (let i = 0; i < config.count; i++) {
        const cloud = document.createElement("div");
        cloud.classList.add("cloud");

        const cloudElement = document.createElement("div");
        cloudElement.classList.add(config.type);

        // Ajouter une variation de couleur aléatoire
        if (config.variants && Math.random() > 0.4) {
          const randomVariant =
            config.variants[Math.floor(Math.random() * config.variants.length)];
          cloudElement.classList.add(randomVariant);
        }

        cloud.appendChild(cloudElement);
        skyEffectsContainer.appendChild(cloud);

        const animateCloud = () => {
          // Durées différentes selon le type de nuage
          let duration;
          switch (config.type) {
            case "cloud-main":
              duration = gsap.utils.random(20, 35);
              break;
            case "cloud-medium":
              duration = gsap.utils.random(25, 40);
              break;
            case "cloud-small":
              duration = gsap.utils.random(30, 45);
              break;
            default:
              duration = gsap.utils.random(25, 40);
          }

          const startY = gsap.utils.random(5, 75); // %
          const startX = Math.random() > 0.5 ? 110 : -30; // Direction aléatoire
          const endX = startX > 0 ? -30 : 110;
          const scale = gsap.utils.random(0.5, 1.4);
          const rotation = gsap.utils.random(-6, 6);
          const yMovement = gsap.utils.random(-15, 15);

          gsap.set(cloud, {
            top: `${startY}%`,
            xPercent: startX * 10,
            scale: scale,
          });

          gsap.to(cloud, {
            xPercent: endX * 10,
            y: yMovement,
            rotation: rotation,
            duration: duration,
            ease: "none",
            onStart: () => {
              gsap.to(cloud, {
                opacity: gsap.utils.random(0.6, 0.9),
                duration: 2.5,
                ease: "power2.out",
              });
            },
            onComplete: () => {
              gsap.to(cloud, {
                opacity: 0,
                duration: 2,
                ease: "power2.in",
                onComplete: animateCloud,
              });
            },
          });
        };

        // Délai de démarrage aléatoire étalé sur 20 secondes
        setTimeout(animateCloud, gsap.utils.random(0, 20) * 1000);
      }
    });

    // Ajouter quelques nuages statiques en arrière-plan pour plus de profondeur
    const staticClouds = 3;
    for (let i = 0; i < staticClouds; i++) {
      const staticCloud = document.createElement("div");
      staticCloud.classList.add("cloud");

      const staticCloudElement = document.createElement("div");
      staticCloudElement.classList.add("cloud-medium");
      staticCloudElement.style.opacity = "0.3";
      staticCloudElement.style.filter = "blur(15px)";

      staticCloud.appendChild(staticCloudElement);
      skyEffectsContainer.appendChild(staticCloud);

      gsap.set(staticCloud, {
        top: `${gsap.utils.random(10, 60)}%`,
        left: `${gsap.utils.random(10, 80)}%`,
        scale: gsap.utils.random(0.8, 1.5),
        opacity: gsap.utils.random(0.2, 0.4),
      });

      // Léger mouvement de balancement
      gsap.to(staticCloud, {
        x: "+=20",
        y: "+=10",
        rotation: "+=3",
        duration: gsap.utils.random(15, 25),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Création du soleil animé
    createAnimatedSun(skyEffectsContainer);
  }
}

// Fonction pour créer le soleil animé
function createAnimatedSun(container) {
  const sun = document.createElement("div");
  sun.classList.add("sun");

  // Conteneur pour les rayons qui tournent
  const raysContainer = document.createElement("div");
  raysContainer.classList.add("sun-rays-container");

  // Créer les rayons principaux (8 rayons)
  for (let i = 0; i < 8; i++) {
    const ray = document.createElement("div");
    ray.classList.add("sun-ray");
    raysContainer.appendChild(ray);
  }

  // Créer les rayons secondaires plus petits (8 rayons)
  for (let i = 0; i < 8; i++) {
    const raySmall = document.createElement("div");
    raySmall.classList.add("sun-ray", "sun-ray-small");
    raysContainer.appendChild(raySmall);
  }

  // Créer le cœur du soleil
  const sunCore = document.createElement("div");
  sunCore.classList.add("sun-core");

  // Assembler le soleil
  sun.appendChild(raysContainer);
  sun.appendChild(sunCore);
  container.appendChild(sun);

  // Animation d'apparition du soleil
  gsap.fromTo(
    sun,
    {
      opacity: 0,
      scale: 0.5,
      y: -30,
    },
    {
      opacity: 0.9,
      scale: 1,
      y: 0,
      duration: 3,
      ease: "power2.out",
      delay: 1.5,
    }
  );

  // Animation de léger balancement du soleil entier
  gsap.to(sun, {
    y: "+=15",
    x: "+=8",
    duration: 8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 4,
  });

  // Animation de scintillement des rayons
  const rays = sun.querySelectorAll(".sun-ray");
  rays.forEach((ray, index) => {
    gsap.to(ray, {
      opacity: gsap.utils.random(0.6, 1),
      scaleY: gsap.utils.random(0.8, 1.2),
      duration: gsap.utils.random(2, 4),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: gsap.utils.random(0, 2),
    });
  });
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

// Gestion des langues
function updateActiveLanguageButton() {
  if (typeof getCurrentLanguage !== "function") return;

  const currentLang = getCurrentLanguage();
  const languageButtons = document.querySelectorAll(".language-btn");

  languageButtons.forEach((btn) => {
    btn.classList.remove("active");
    const btnOnclick = btn.getAttribute("onclick");
    if (btnOnclick) {
      const match = btnOnclick.match(/'(\w+)'/);
      if (match && match[1] === currentLang) {
        btn.classList.add("active");
      }
    }
  });
}

// Redéfinir la fonction changeLanguage globale
window.changeLanguage = function (language) {
  localStorage.setItem("selectedLanguage", language);
  if (typeof translatePage === "function") {
    translatePage();
  }
  updateActiveLanguageButton();

  // Animation lors du changement de langue
  const elements = document.querySelectorAll("[data-translate]");
  gsap.fromTo(
    elements,
    { opacity: 0.7 },
    {
      opacity: 1,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.out",
    }
  );
};

// Initialiser les langues au chargement
document.addEventListener("DOMContentLoaded", function () {
  // Attendre que le fichier translations.js soit chargé
  setTimeout(() => {
    if (typeof translatePage === "function") {
      translatePage();
      updateActiveLanguageButton();
    }
  }, 100);
});
