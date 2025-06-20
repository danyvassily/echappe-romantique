// Animations discrètes avec ScrollSmoother pour la page Échappées
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

document.addEventListener("DOMContentLoaded", function () {
  // Initialisation de ScrollSmoother pour un défilement ultra-fluide
  let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5, // Niveau de fluidité (1-2 recommandé)
    effects: true, // Active les effets data-speed et data-lag
    smoothTouch: 0.1, // Défilement tactile plus naturel
    normalizeScroll: true, // Normalise la vitesse entre navigateurs
  });

  // Animation d'entrée très subtile
  gsap.set([".hero-title", ".hero-subtitle", "nav"], { opacity: 0, y: 20 });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.to("nav", { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" })
    .to(
      ".hero-title",
      { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" },
      "-=0.4"
    )
    .to(
      ".hero-subtitle",
      { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" },
      "-=0.4"
    );

  // Navbar avec changement très subtil au scroll
  ScrollTrigger.create({
    start: "80px top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const progress = Math.min(self.progress * 2, 1);
      gsap.to("nav", {
        duration: 0.3,
        backgroundColor: `rgba(255, 255, 255, ${0.9 + progress * 0.08})`,
        backdropFilter: `blur(${16 + progress * 8}px)`,
        ease: "none",
      });
    },
  });

  // Révélation douce des cartes au scroll
  gsap.utils.toArray(".hero-card").forEach((card, index) => {
    gsap.set(card, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        gsap.to(card, {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          delay: index * 0.1,
        });
      },
    });

    // Hover très discret
    card.addEventListener("mouseenter", function () {
      gsap.to(this, {
        duration: 0.5,
        y: -8,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this, {
        duration: 0.5,
        y: 0,
        ease: "power2.out",
      });
    });
  });

  // Animation subtile de la section contact
  gsap.set("#contact-section > div > *", { opacity: 0, y: 20 });

  ScrollTrigger.create({
    trigger: "#contact-section",
    start: "top 80%",
    onEnter: () => {
      gsap.to("#contact-section > div > *", {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
  });

  // Hover discret pour les boutons
  document.querySelectorAll("a[class*='bg-'], button").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      gsap.to(this, {
        duration: 0.3,
        y: -2,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", function () {
      gsap.to(this, {
        duration: 0.3,
        y: 0,
        ease: "power2.out",
      });
    });
  });

  // Menu mobile avec animation fluide
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        gsap.fromTo(
          mobileMenu,
          { opacity: 0, y: -10 },
          { duration: 0.3, opacity: 1, y: 0, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenu, {
          duration: 0.2,
          opacity: 0,
          y: -10,
          ease: "power2.in",
          onComplete: () => mobileMenu.classList.add("hidden"),
        });
      }
    });
  }

  // Révélation douce du footer
  gsap.set("footer", { opacity: 0, y: 20 });

  ScrollTrigger.create({
    trigger: "footer",
    start: "top 90%",
    onEnter: () => {
      gsap.to("footer", {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });
    },
  });

  console.log("✨ ScrollSmoother et animations discrètes initialisés");
});
