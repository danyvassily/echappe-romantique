// Configuration pour appliquer les traductions sur toutes les pages
// Ce fichier doit être inclus sur chaque page pour assurer la traduction

document.addEventListener("DOMContentLoaded", function () {
  // Vérifier si le fichier translations.js est chargé
  if (typeof translations === "undefined") {
    console.warn("Le fichier translations.js n'est pas chargé");
    return;
  }

  // Initialiser la détection automatique de langue si disponible
  if (typeof initializeAutoLanguageDetection === "function") {
    initializeAutoLanguageDetection();
  } else {
    // Fallback si la fonction n'est pas disponible
    setTimeout(() => {
      if (typeof translatePage === "function") {
        translatePage();
      }
    }, 50);
  }

  // Ajouter les sélecteurs de langue à toutes les pages
  addLanguageSelectorsToAllPages();
});

// Fonction pour ajouter les sélecteurs de langue sur toutes les pages
function addLanguageSelectorsToAllPages() {
  const navbar = document.querySelector("nav");
  if (!navbar) return;

  // Vérifier si les sélecteurs existent déjà
  if (navbar.querySelector(".language-selector-global")) return;

  // Ajouter les sélecteurs de langue pour mobile et desktop
  const navigationDesktop = navbar.querySelector(".hidden.md\\:flex");
  const navigationMobile = navbar.querySelector("#mobile-menu");

  // Sélecteur pour desktop
  if (
    navigationDesktop &&
    !navigationDesktop.querySelector(".language-selector-global")
  ) {
    const languageSelectorDesktop = createLanguageSelector("desktop");
    // Insérer avant le dernier élément (bouton réserver)
    const lastChild = navigationDesktop.lastElementChild;
    navigationDesktop.insertBefore(languageSelectorDesktop, lastChild);
  }

  // Sélecteur pour mobile
  if (
    navigationMobile &&
    !navigationMobile.querySelector(".language-selector-global")
  ) {
    const languageSelectorMobile = createLanguageSelector("mobile");
    const mobileContent = navigationMobile.querySelector("div");
    if (mobileContent) {
      // Insérer avant le dernier élément (bouton réserver)
      const lastChild = mobileContent.lastElementChild;
      mobileContent.insertBefore(languageSelectorMobile, lastChild);
    }
  }
}

// Fonction pour créer un sélecteur de langue
function createLanguageSelector(type) {
  const container = document.createElement("div");
  container.className = `language-selector-global ${
    type === "mobile"
      ? "flex items-center justify-center space-x-4 py-4 border-t border-gray-200"
      : "flex items-center space-x-2 mx-4"
  }`;

  // Label pour mobile
  if (type === "mobile") {
    const label = document.createElement("span");
    label.className = "text-sm text-gray-600";
    label.setAttribute("data-translate", "language-selector");
    label.textContent = "Langue:";
    container.appendChild(label);
  }

  // Boutons de langue
  const languages = [
    { code: "fr", flag: "🇫🇷", title: "Français" },
    { code: "en", flag: "🇬🇧", title: "English" },
    { code: "ru", flag: "🇷🇺", title: "Русский" },
  ];

  languages.forEach((lang) => {
    const button = document.createElement("button");
    button.className =
      "language-btn w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-110";
    button.title = lang.title;
    button.onclick = () => changeLanguage(lang.code);

    const flagSpan = document.createElement("span");
    flagSpan.className = "text-lg";
    flagSpan.textContent = lang.flag;

    button.appendChild(flagSpan);
    container.appendChild(button);
  });

  return container;
}

// Fonction globale pour changer la langue (accessible depuis tous les fichiers)
window.changeLanguage = function (language) {
  localStorage.setItem("selectedLanguage", language);

  if (typeof translatePage === "function") {
    translatePage();
  }

  // Mettre à jour les boutons actifs
  updateActiveLanguageButtons();

  // Animation de transition
  if (typeof gsap !== "undefined") {
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
  }
};

// Fonction pour mettre à jour les boutons de langue actifs
function updateActiveLanguageButtons() {
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

    // Pour les nouveaux boutons créés dynamiquement
    if (btn.onclick) {
      const btnText = btn.onclick.toString();
      if (
        btnText.includes(`"${currentLang}"`) ||
        btnText.includes(`'${currentLang}'`)
      ) {
        btn.classList.add("active");
      }
    }
  });
}

// Styles CSS pour les sélecteurs de langue
const styleSheet = document.createElement("style");
styleSheet.textContent = `
.language-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.language-btn.active {
    border-color: #9DB17C !important;
    background: rgba(157, 177, 124, 0.1);
}

.language-btn:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}
`;
document.head.appendChild(styleSheet);

// Export pour utilisation globale
window.addLanguageSelectorsToAllPages = addLanguageSelectorsToAllPages;
window.updateActiveLanguageButtons = updateActiveLanguageButtons;
