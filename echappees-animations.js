// Animations discrètes avec ScrollSmoother pour la page Échappées
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

document.addEventListener("DOMContentLoaded", function () {
  // Initialisation de ScrollSmoother pour un défilement ultra-fluide (si disponible)
  let smoother;
  if (typeof ScrollSmoother !== "undefined") {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5, // Niveau de fluidité (1-2 recommandé)
      effects: true, // Active les effets data-speed et data-lag
      smoothTouch: 0.1, // Défilement tactile plus naturel
      normalizeScroll: true, // Normalise la vitesse entre navigateurs
    });
  } else {
    console.warn("⚠️ ScrollSmoother n'est pas disponible");
  }

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

// ===== FORMULAIRE DE RÉSERVATION =====
// Le formulaire de réservation est maintenant géré par reservation-form.js
// Ce code s'exécute indépendamment des animations GSAP

// Variables globales pour le formulaire
let currentStep = 1;
let formData = {
  stayType: "",
  adults: 2,
  children: 0,
  babies: 0,
  selectedDate: null,
};

// Initialisation du formulaire - Exécution immédiate et séparée
(function initReservationFormNow() {
  console.log("🚀 Démarrage de l'initialisation du formulaire...");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeReservationForm);
  } else {
    // Le DOM est déjà prêt
    setTimeout(initializeReservationForm, 100);
  }
})();

function initializeReservationForm() {
  console.log("🎯 Initialisation du formulaire de réservation");

  // Vérifier que les éléments existent
  const step1Element = document.getElementById("step1");
  if (!step1Element) {
    console.log("❌ Élément step1 non trouvé, formulaire non initialisé");
    return;
  }

  console.log("📋 Initialisation des composants du formulaire...");

  try {
    initializeStepNavigation();
    initializeStaySelection();
    initializeCounters();
    initializeCalendar();
    initializeCloseButton();
    console.log("✅ Formulaire de réservation initialisé avec succès");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation du formulaire:", error);
  }
}

// Navigation entre les étapes
function initializeStepNavigation() {
  const nextStep1 = document.getElementById("nextStep1");
  const nextStep2 = document.getElementById("nextStep2");
  const nextStep3 = document.getElementById("nextStep3");
  const prevStep2 = document.getElementById("prevStep2");
  const prevStep3 = document.getElementById("prevStep3");

  if (nextStep1) nextStep1.addEventListener("click", () => goToStep(2));
  if (nextStep2) nextStep2.addEventListener("click", () => goToStep(3));
  if (nextStep3) nextStep3.addEventListener("click", () => goToStep(4));
  if (prevStep2) prevStep2.addEventListener("click", () => goToStep(1));
  if (prevStep3) prevStep3.addEventListener("click", () => goToStep(2));

  console.log("🔗 Navigation initialisée");
}

function goToStep(step) {
  console.log(`🚶 Passage à l'étape ${step}`);

  // Cacher toutes les étapes
  document
    .querySelectorAll(".step-content")
    .forEach((el) => el.classList.add("hidden"));

  // Afficher l'étape courante
  const currentStepElement = document.getElementById(`step${step}`);
  if (currentStepElement) {
    currentStepElement.classList.remove("hidden");
  }

  // Mettre à jour les indicateurs d'étapes
  updateStepIndicators(step);

  currentStep = step;

  // Actions spécifiques par étape
  if (step === 4) {
    generateSummary();
  }
}

function updateStepIndicators(activeStep) {
  const stepIndicators = document.querySelectorAll(".step-indicator");
  const stepTexts = document.querySelectorAll(".step-text");

  stepIndicators.forEach((indicator, index) => {
    const stepNumber = index + 1;
    if (stepNumber <= activeStep) {
      indicator.className =
        "w-8 h-8 bg-white text-amber-600 rounded-full flex items-center justify-center text-sm font-medium";
      if (stepTexts[index]) {
        stepTexts[index].className = "text-white font-medium";
      }
    } else {
      indicator.className =
        "w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center text-sm font-medium";
      if (stepTexts[index]) {
        stepTexts[index].className = "text-white/80";
      }
    }
  });
}

// Sélection du type de séjour
function initializeStaySelection() {
  const stayOptions = document.querySelectorAll(".stay-option");
  console.log(`🏨 Trouvé ${stayOptions.length} options de séjour`);

  stayOptions.forEach((option, index) => {
    console.log(`🏨 Option ${index + 1}: ${option.dataset.type}`);
    option.addEventListener("click", function () {
      console.log(`✨ Clic sur l'option: ${this.dataset.type}`);

      // Retirer la sélection précédente
      document.querySelectorAll(".stay-option").forEach((opt) => {
        opt.classList.remove(
          "border-amber-500",
          "border-pink-500",
          "bg-amber-50",
          "bg-pink-50"
        );
      });

      // Ajouter la sélection selon le type
      const type = this.dataset.type;
      if (type === "decouverte") {
        this.classList.add("border-amber-500", "bg-amber-50");
      } else if (type === "signature") {
        this.classList.add("border-pink-500", "bg-pink-50");
      }

      // Sauvegarder le choix
      formData.stayType = type;
      console.log(`💾 Type de séjour sauvegardé: ${formData.stayType}`);

      // Activer le bouton suivant
      const nextButton = document.getElementById("nextStep1");
      if (nextButton) {
        nextButton.disabled = false;
        console.log("🔓 Bouton 'Continuer' activé");
      }
    });
  });
}

// Compteurs de voyageurs
function initializeCounters() {
  document.querySelectorAll(".counter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.dataset.action;
      const target = this.dataset.target;
      const countElement = document.getElementById(`${target}-count`);

      if (!countElement) return;

      let currentValue = parseInt(countElement.textContent);

      if (action === "increase") {
        currentValue++;
      } else if (action === "decrease" && currentValue > 0) {
        currentValue--;
        // Minimum 1 adulte
        if (target === "adults" && currentValue < 1) {
          currentValue = 1;
        }
      }

      countElement.textContent = currentValue;
      formData[target] = currentValue;
    });
  });

  console.log("🔢 Compteurs initialisés");
}

// Calendrier
function initializeCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  const months = ["JUIN 2025", "JUILLET 2025"];
  const monthsData = [
    { year: 2025, month: 5, days: 30 }, // Juin (index 5)
    { year: 2025, month: 6, days: 31 }, // Juillet (index 6)
  ];

  months.forEach((monthName, monthIndex) => {
    const monthDiv = document.createElement("div");
    monthDiv.className = "text-center";

    monthDiv.innerHTML = `
            <h3 class="text-amber-600 font-semibold mb-4">${monthName}</h3>
            <div class="grid grid-cols-7 gap-1 text-xs text-slate-500 mb-2">
                <div>lun.</div>
                <div>mar.</div>
                <div>mer.</div>
                <div>jeu.</div>
                <div>ven.</div>
                <div>sam.</div>
                <div>dim.</div>
            </div>
            <div class="grid grid-cols-7 gap-1" id="month-${monthIndex}">
            </div>
        `;

    calendar.appendChild(monthDiv);

    // Générer les jours
    generateMonthDays(monthIndex, monthsData[monthIndex]);
  });

  console.log("📅 Calendrier initialisé");
}

function generateMonthDays(monthIndex, monthData) {
  const monthGrid = document.getElementById(`month-${monthIndex}`);
  if (!monthGrid) return;

  const firstDay = new Date(monthData.year, monthData.month, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Ajuster pour commencer par lundi

  // Jours vides au début
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyDay = document.createElement("div");
    monthGrid.appendChild(emptyDay);
  }

  // Jours du mois
  for (let day = 1; day <= monthData.days; day++) {
    const dayElement = document.createElement("div");
    dayElement.className =
      "w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-amber-500 hover:text-white rounded transition-colors";
    dayElement.textContent = day;

    dayElement.addEventListener("click", function () {
      // Retirer la sélection précédente
      document.querySelectorAll("#calendar .bg-amber-500").forEach((el) => {
        if (!el.classList.contains("hover:bg-amber-500")) {
          el.className =
            "w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-amber-500 hover:text-white rounded transition-colors";
        }
      });

      // Ajouter la sélection
      this.className =
        "w-8 h-8 flex items-center justify-center text-sm cursor-pointer bg-amber-500 text-white rounded";

      // Sauvegarder la date
      formData.selectedDate = {
        day: day,
        month: monthData.month + 1,
        year: monthData.year,
        monthName: monthIndex === 0 ? "Juin" : "Juillet",
      };

      // Activer le bouton suivant
      const nextButton = document.getElementById("nextStep3");
      if (nextButton) {
        nextButton.disabled = false;
      }
    });

    monthGrid.appendChild(dayElement);
  }
}

// Bouton de fermeture
function initializeCloseButton() {
  const closeButton = document.getElementById("closeForm");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      // Réinitialiser le formulaire
      resetForm();
      // Masquer le formulaire (optionnel)
      const formSection = document.querySelector(
        ".bg-gradient-to-br.from-slate-50.to-amber-50\\/30"
      );
      if (formSection) {
        formSection.style.display = "none";
      }
    });
  }

  console.log("❌ Bouton de fermeture initialisé");
}

// Réinitialisation du formulaire
function resetForm() {
  formData = {
    stayType: "",
    adults: 2,
    children: 0,
    babies: 0,
    selectedDate: null,
  };

  currentStep = 1;

  // Réinitialiser l'affichage
  document
    .querySelectorAll(".step-content")
    .forEach((el) => el.classList.add("hidden"));
  const step1 = document.getElementById("step1");
  if (step1) step1.classList.remove("hidden");

  // Réinitialiser les compteurs
  const adultsCount = document.getElementById("adults-count");
  const childrenCount = document.getElementById("children-count");
  const babiesCount = document.getElementById("babies-count");

  if (adultsCount) adultsCount.textContent = "2";
  if (childrenCount) childrenCount.textContent = "0";
  if (babiesCount) babiesCount.textContent = "0";

  // Réinitialiser les sélections
  document.querySelectorAll(".stay-option").forEach((opt) => {
    opt.classList.remove(
      "border-amber-500",
      "border-pink-500",
      "bg-amber-50",
      "bg-pink-50"
    );
  });

  // Désactiver les boutons
  const nextStep1 = document.getElementById("nextStep1");
  const nextStep3 = document.getElementById("nextStep3");
  if (nextStep1) nextStep1.disabled = true;
  if (nextStep3) nextStep3.disabled = true;

  // Mettre à jour les indicateurs
  updateStepIndicators(1);
}

// Génération du récapitulatif
function generateSummary() {
  const summary = document.getElementById("summary");
  const estimatedPrice = document.getElementById("estimated-price");

  if (!summary || !estimatedPrice) return;

  const stayTypeText =
    formData.stayType === "decouverte"
      ? "Échappée Découverte"
      : "Séjour Signature";
  const totalTravelers = formData.adults + formData.children + formData.babies;
  const dateText = formData.selectedDate
    ? `${formData.selectedDate.day} ${formData.selectedDate.monthName} ${formData.selectedDate.year}`
    : "Dates flexibles";

  // Calcul du prix estimé
  const basePrice = formData.stayType === "decouverte" ? 750 : 1200;
  const totalPrice =
    basePrice * formData.adults + basePrice * 0.5 * formData.children;

  summary.innerHTML = `
        <div class="flex justify-between py-3 border-b border-slate-200">
            <span class="text-slate-600">Type de séjour :</span>
            <span class="font-semibold text-slate-800">${stayTypeText}</span>
        </div>
        <div class="flex justify-between py-3 border-b border-slate-200">
            <span class="text-slate-600">Voyageurs :</span>
            <span class="font-semibold text-slate-800">${totalTravelers} personne${
    totalTravelers > 1 ? "s" : ""
  }</span>
        </div>
        <div class="flex justify-between py-3 border-b border-slate-200">
            <span class="text-slate-600">Date de départ :</span>
            <span class="font-semibold text-slate-800">${dateText}</span>
        </div>
        <div class="py-3">
            <div class="text-slate-600 mb-2 font-medium">Détail des voyageurs :</div>
            <div class="text-sm space-y-1 ml-4 text-slate-700">
                <div>${formData.adults} adulte${
    formData.adults > 1 ? "s" : ""
  }</div>
                ${
                  formData.children > 0
                    ? `<div>${formData.children} enfant${
                        formData.children > 1 ? "s" : ""
                      }</div>`
                    : ""
                }
                ${
                  formData.babies > 0
                    ? `<div>${formData.babies} bébé${
                        formData.babies > 1 ? "s" : ""
                      }</div>`
                    : ""
                }
            </div>
        </div>
    `;

  estimatedPrice.textContent = `${totalPrice}€`;
}
