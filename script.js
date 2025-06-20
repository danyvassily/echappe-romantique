// Initialisation GSAP
gsap.registerPlugin(ScrollTrigger);

// Animation du loader/entrée de page
document.addEventListener("DOMContentLoaded", function () {
  // Animation d'entrée de la page
  const tl = gsap.timeline();

  tl.from(".hero-title", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: "power3.out",
  })
    .from(
      ".hero-subtitle",
      {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.8"
    )
    .from(
      ".hero-btn",
      {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.6"
    )
    // Animation de l'avion Cessna qui arrive depuis la droite
    .fromTo(
      "#cessna-plane",
      {
        x: "100vw", // Commence à l'extérieur de l'écran à droite
        y: -50, // Légèrement plus haut
        opacity: 0,
        rotation: -5, // Légère inclinaison
      },
      {
        duration: 2,
        x: 0, // Position finale normale
        y: 0,
        opacity: 1,
        rotation: 0,
        ease: "power2.out",
      },
      "-=0.4" // Commence un peu avant la fin de l'animation du bouton
    );

  // Animation de flottement continu pour l'avion Cessna
  gsap.to("#cessna-plane", {
    duration: 3,
    y: "+=15", // Mouvement vertical léger
    rotation: "+=2", // Légère rotation
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
    delay: 2, // Commence après l'animation d'entrée
  });

  // Les avions sont maintenant créés dynamiquement par la fonction createParticles()

  // Menu mobile toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");

    if (!mobileMenu.classList.contains("hidden")) {
      gsap.from(mobileMenu.children[0].children, {
        duration: 0.3,
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  });

  // Animation du texte défilant
  const scrollingText = document.querySelector(".scrolling-text");
  gsap.to(scrollingText, {
    x: "-100%",
    duration: 30,
    repeat: -1,
    ease: "none",
  });

  // Animations des cartes au scroll
  gsap.utils.toArray(".feature-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      y: 60,
      opacity: 0,
      ease: "power3.out",
      delay: index * 0.1,
    });
  });

  // Animation des cartes de cours
  gsap.utils.toArray(".class-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      scale: 0.9,
      opacity: 0,
      ease: "power3.out",
      delay: index * 0.15,
    });
  });

  // Animation des studios
  gsap.utils.toArray(".studio-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      y: 80,
      rotationY: 15,
      opacity: 0,
      ease: "power3.out",
      delay: index * 0.1,
    });
  });

  // Parallaxe pour les sections
  gsap.utils.toArray("section").forEach((section) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: (i, el) => -50 * Math.random(),
    });
  });

  // Animation hover pour les cartes
  document
    .querySelectorAll(".feature-card, .class-card, .studio-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        gsap.to(this, {
          duration: 0.3,
          y: -10,
          scale: 1.03,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", function () {
        gsap.to(this, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: "power2.out",
        });
      });
    });

  // Animation des boutons
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      gsap.to(this, {
        duration: 0.2,
        scale: 1.05,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", function () {
      gsap.to(this, {
        duration: 0.2,
        scale: 1,
        ease: "power2.out",
      });
    });
  });

  // Smooth scroll pour les liens de navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80,
          },
          ease: "power3.out",
        });

        // Fermer le menu mobile si ouvert
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Animation de révélation des titres
  gsap.utils.toArray("h2").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });
  });

  // Animation de révélation des paragraphes
  gsap.utils.toArray("p").forEach((paragraph) => {
    gsap.from(paragraph, {
      scrollTrigger: {
        trigger: paragraph,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power2.out",
    });
  });

  // Cursor personalised (optionnel)
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      duration: 0.2,
      x: e.clientX - 10,
      y: e.clientY - 10,
    });
  });

  // Agrandir le curseur sur les éléments interactifs
  document
    .querySelectorAll("button, a, .feature-card, .class-card, .studio-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          duration: 0.2,
          scale: 2,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          duration: 0.2,
          scale: 1,
        });
      });
    });

  // Animation de chargement de la navbar au scroll
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: {
      className: "scrolled",
      targets: "nav",
    },
  });

  // Effet de particules sur le hero (optionnel)
  createParticles();
});

// Fonction pour créer des avions flottants
function createParticles() {
  const hero = document.querySelector("section");
  const aircraftCount = 25;
  const aircraftIcons = ["fa-plane"];

  for (let i = 0; i < aircraftCount; i++) {
    const aircraft = document.createElement("div");
    const iconClass =
      aircraftIcons[Math.floor(Math.random() * aircraftIcons.length)];
    const size = (Math.random() * 12 + 8) * 1.3; // Taille entre 10.4px et 26px (+30%)

    aircraft.innerHTML = `<i class="fas ${iconClass}"></i>`;
    aircraft.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            color: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            transform: rotate(${Math.random() * 360}deg);
        `;
    hero.appendChild(aircraft);

    // Animation des avions - trajectoire de vol réaliste sur toute la hero section
    const duration = Math.random() * 10 + 6; // Entre 6 et 16 secondes
    const direction = Math.random() > 0.5 ? 1 : -1; // Direction aléatoire
    const startY = Math.random() * hero.offsetHeight; // Utilise la hauteur de la section hero
    const endY = Math.random() * hero.offsetHeight;

    gsap.fromTo(
      aircraft,
      {
        x: direction > 0 ? -150 : window.innerWidth + 150,
        y: startY,
        rotation:
          direction > 0
            ? Math.random() * 15 - 7.5
            : 180 + Math.random() * 15 - 7.5,
        opacity: 0.2,
      },
      {
        x: direction > 0 ? window.innerWidth + 150 : -150,
        y: endY,
        rotation:
          direction > 0
            ? Math.random() * 20 - 10
            : 180 + Math.random() * 20 - 10,
        opacity: 0.8,
        duration: duration,
        repeat: -1,
        repeatDelay: Math.random() * 6 + 1,
        ease: "power1.inOut",
      }
    );
  }
}

// Observer pour les animations d'apparition
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observer tous les éléments avec classe 'observe'
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".feature-card, .class-card, .studio-card")
    .forEach((el) => {
      observer.observe(el);
    });
});

// Préloader simple
window.addEventListener("load", () => {
  gsap.to(".preloader", {
    duration: 0.8,
    opacity: 0,
    display: "none",
    ease: "power2.out",
  });
});

// Performance: Pause les animations quand la page n'est pas visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

// Fonctions pour le popup d'images
function openImagePopup(imageSrc) {
  const popup = document.getElementById("imagePopup");
  const popupImage = document.getElementById("popupImage");

  popupImage.src = imageSrc;
  popup.classList.add("active");

  // Prevent body scroll when popup is open
  document.body.style.overflow = "hidden";
}

function closeImagePopup() {
  const popup = document.getElementById("imagePopup");
  popup.classList.remove("active");

  // Restore body scroll
  document.body.style.overflow = "auto";
}

// Gestionnaire d'événements pour les cartes hero
document.addEventListener("DOMContentLoaded", function () {
  const heroCards = document.querySelectorAll(".hero-card");

  heroCards.forEach((card) => {
    let hoverTimeout;

    card.addEventListener("mouseenter", function () {
      const imageSrc = this.getAttribute("data-image");

      // Délai de 300ms avant d'ouvrir le popup pour éviter les ouvertures accidentelles
      hoverTimeout = setTimeout(() => {
        openImagePopup(imageSrc);
      }, 300);
    });

    card.addEventListener("mouseleave", function () {
      // Annuler le timeout si on quitte la carte rapidement
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    });
  });

  // Fermer le popup en cliquant en dehors de l'image
  document.getElementById("imagePopup").addEventListener("click", function (e) {
    if (e.target === this) {
      closeImagePopup();
    }
  });

  // Fermer le popup avec la touche Echap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeImagePopup();
    }
  });
});
