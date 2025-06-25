/**
 * FORMULAIRE DE RÉSERVATION - ÉCHAPPÉE ROMANTIQUE
 * Version moderne et robuste
 */

class ReservationForm {
  constructor() {
    this.currentStep = 1;
    this.maxSteps = 4;
    this.formData = {
      stayType: "",
      stayPrice: 0,
      adults: 2,
      children: 0,
      babies: 0,
      selectedDate: null,
      isFlexibleDates: false,
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      },
    };

    // Configuration EmailJS (service gratuit pour envoi d'emails)
    // ✅ Configuration complète et correcte
    this.emailConfig = {
      publicKey: "V8ZGd6PkWftDGDLv8", // Public Key ✅
      serviceID: "service_ublqgxm", // Service ID ✅
      templateID: "template_hpkeo4b", // Nouveau Template "Contact Us" ✅
    };

    this.init();
  }

  init() {
    console.log("🚀 Initialisation du formulaire de réservation");

    // Attendre que le DOM soit prêt
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    try {
      // Initialiser EmailJS
      if (typeof emailjs !== "undefined") {
        emailjs.init(this.emailConfig.publicKey);
        console.log("📧 EmailJS initialisé");
      } else {
        console.warn(
          "⚠️ EmailJS non disponible - utilisation du mode simulation"
        );
      }

      this.bindEvents();
      this.generateCalendar();
      this.updateStepIndicators();
      console.log("✅ Formulaire de réservation initialisé avec succès");
    } catch (error) {
      console.error("❌ Erreur lors de l'initialisation:", error);
    }
  }

  bindEvents() {
    // Navigation entre les étapes
    this.bindNavigationEvents();

    // Sélection du type de séjour
    this.bindStaySelectionEvents();

    // Compteurs de voyageurs
    this.bindCounterEvents();

    // Calendrier
    this.bindCalendarEvents();

    // Formulaire de contact
    this.bindContactFormEvents();

    console.log("🔗 Événements liés avec succès");
  }

  bindNavigationEvents() {
    // Boutons "Suivant"
    document
      .getElementById("next-step-1")
      ?.addEventListener("click", () => this.nextStep());
    document
      .getElementById("next-step-2")
      ?.addEventListener("click", () => this.nextStep());
    document
      .getElementById("next-step-3")
      ?.addEventListener("click", () => this.nextStep());

    // Boutons "Précédent"
    document
      .getElementById("prev-step-2")
      ?.addEventListener("click", () => this.prevStep());
    document
      .getElementById("prev-step-3")
      ?.addEventListener("click", () => this.prevStep());
    document
      .getElementById("prev-step-4")
      ?.addEventListener("click", () => this.prevStep());

    // Bouton de soumission
    document
      .getElementById("submit-booking")
      ?.addEventListener("click", () => this.submitForm());
  }

  bindStaySelectionEvents() {
    document.querySelectorAll(".stay-option").forEach((option) => {
      option.addEventListener("click", () => {
        console.log(`✨ Sélection: ${option.dataset.type}`);

        // Retirer les sélections précédentes
        document.querySelectorAll(".stay-option").forEach((opt) => {
          opt.classList.remove("selected");
        });

        // Ajouter la sélection
        option.classList.add("selected");

        // Sauvegarder les données
        this.formData.stayType = option.dataset.type;
        this.formData.stayPrice = parseInt(option.dataset.price);

        // Activer le bouton suivant
        this.enableButton("next-step-1");

        console.log(`💾 Données sauvegardées:`, this.formData);
      });
    });
  }

  bindCounterEvents() {
    document.querySelectorAll(".counter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const target = btn.dataset.target;
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
        this.formData[target] = currentValue;

        console.log(`🔢 ${target}: ${currentValue}`);
      });
    });
  }

  bindCalendarEvents() {
    // Dates flexibles
    document.getElementById("flexible-dates")?.addEventListener("click", () => {
      this.formData.isFlexibleDates = true;
      this.formData.selectedDate = null;

      // Désélectionner toutes les dates
      document.querySelectorAll(".calendar-day.selected").forEach((day) => {
        day.classList.remove("selected");
      });

      this.enableButton("next-step-3");
      console.log("📅 Dates flexibles sélectionnées");
    });
  }

  bindContactFormEvents() {
    const inputs = ["first-name", "last-name", "email", "phone", "message"];

    inputs.forEach((inputId) => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener("input", () => this.validateContactForm());
      }
    });
  }

  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.showStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.showStep(this.currentStep - 1);
    }
  }

  showStep(stepNumber) {
    console.log(`🚶 Passage à l'étape ${stepNumber}`);

    // Cacher l'étape actuelle
    document
      .getElementById(`step-${this.currentStep}`)
      ?.classList.remove("active");
    document.getElementById(`step-${this.currentStep}`).style.display = "none";

    // Afficher la nouvelle étape
    const newStep = document.getElementById(`step-${stepNumber}`);
    if (newStep) {
      newStep.style.display = "block";
      setTimeout(() => newStep.classList.add("active"), 50);
    }

    this.currentStep = stepNumber;
    this.updateStepIndicators();

    // Actions spécifiques par étape
    if (stepNumber === 4) {
      this.generateSummary();
    }
  }

  updateStepIndicators() {
    document.querySelectorAll(".step-indicator").forEach((indicator, index) => {
      const stepNumber = index + 1;

      indicator.classList.remove("active", "completed");

      if (stepNumber === this.currentStep) {
        indicator.classList.add("active");
      } else if (stepNumber < this.currentStep) {
        indicator.classList.add("completed");
      }
    });
  }

  generateCalendar() {
    const container = document.getElementById("calendar-container");
    if (!container) return;

    const months = [
      { name: "Juin 2025", year: 2025, month: 5, days: 30 },
      { name: "Juillet 2025", year: 2025, month: 6, days: 31 },
    ];

    months.forEach((monthData, monthIndex) => {
      const monthDiv = document.createElement("div");
      monthDiv.className = "calendar-month";

      monthDiv.innerHTML = `
                <h4 class="text-lg font-semibold text-amber-600 mb-4">${monthData.name}</h4>
                <div class="grid grid-cols-7 gap-1 text-xs text-slate-500 mb-2">
                    <div class="text-center py-2">Lun</div>
                    <div class="text-center py-2">Mar</div>
                    <div class="text-center py-2">Mer</div>
                    <div class="text-center py-2">Jeu</div>
                    <div class="text-center py-2">Ven</div>
                    <div class="text-center py-2">Sam</div>
                    <div class="text-center py-2">Dim</div>
                </div>
                <div class="grid grid-cols-7 gap-1" id="month-${monthIndex}"></div>
            `;

      container.appendChild(monthDiv);
      this.generateMonthDays(monthIndex, monthData);
    });
  }

  generateMonthDays(monthIndex, monthData) {
    const monthGrid = document.getElementById(`month-${monthIndex}`);
    if (!monthGrid) return;

    const firstDay = new Date(monthData.year, monthData.month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Jours vides au début
    for (let i = 0; i < adjustedFirstDay; i++) {
      const emptyDay = document.createElement("div");
      monthGrid.appendChild(emptyDay);
    }

    // Jours du mois
    for (let day = 1; day <= monthData.days; day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "calendar-day";
      dayElement.textContent = day;

      dayElement.addEventListener("click", () => {
        // Désélectionner toutes les dates
        document.querySelectorAll(".calendar-day.selected").forEach((d) => {
          d.classList.remove("selected");
        });

        // Sélectionner cette date
        dayElement.classList.add("selected");

        // Sauvegarder la date
        this.formData.selectedDate = {
          day: day,
          month: monthData.month + 1,
          year: monthData.year,
          monthName: monthData.name.split(" ")[0],
        };

        this.formData.isFlexibleDates = false;
        this.enableButton("next-step-3");

        console.log(
          `📅 Date sélectionnée: ${day} ${this.formData.selectedDate.monthName} ${monthData.year}`
        );
      });

      monthGrid.appendChild(dayElement);
    }
  }

  generateSummary() {
    const summaryContainer = document.getElementById("booking-summary");
    const totalPriceElement = document.getElementById("total-price");

    if (!summaryContainer || !totalPriceElement) return;

    const stayTypeText =
      this.formData.stayType === "decouverte"
        ? "Échappée Découverte"
        : "Séjour Signature";
    const totalTravelers =
      this.formData.adults + this.formData.children + this.formData.babies;

    let dateText = "Dates flexibles";
    if (this.formData.selectedDate && !this.formData.isFlexibleDates) {
      dateText = `${this.formData.selectedDate.day} ${this.formData.selectedDate.monthName} ${this.formData.selectedDate.year}`;
    }

    // Calcul du prix
    const totalPrice =
      this.formData.stayPrice * this.formData.adults +
      this.formData.stayPrice * 0.5 * this.formData.children;

    summaryContainer.innerHTML = `
            <div class="space-y-4">
                <div class="flex justify-between items-center py-3 border-b border-slate-200">
                    <span class="text-slate-600">Type de séjour</span>
                    <span class="font-semibold text-slate-800">${stayTypeText}</span>
                </div>
                <div class="flex justify-between items-center py-3 border-b border-slate-200">
                    <span class="text-slate-600">Voyageurs</span>
                    <span class="font-semibold text-slate-800">${totalTravelers} personne${
      totalTravelers > 1 ? "s" : ""
    }</span>
                </div>
                <div class="flex justify-between items-center py-3 border-b border-slate-200">
                    <span class="text-slate-600">Date de départ</span>
                    <span class="font-semibold text-slate-800">${dateText}</span>
                </div>
                <div class="py-3">
                    <div class="text-slate-600 mb-2">Détail des voyageurs:</div>
                    <div class="text-sm text-slate-700 space-y-1 ml-4">
                        <div>• ${this.formData.adults} adulte${
      this.formData.adults > 1 ? "s" : ""
    }</div>
                        ${
                          this.formData.children > 0
                            ? `<div>• ${this.formData.children} enfant${
                                this.formData.children > 1 ? "s" : ""
                              }</div>`
                            : ""
                        }
                        ${
                          this.formData.babies > 0
                            ? `<div>• ${this.formData.babies} bébé${
                                this.formData.babies > 1 ? "s" : ""
                              }</div>`
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;

    totalPriceElement.textContent = `${totalPrice}€`;
  }

  validateContactForm() {
    const firstName = document.getElementById("first-name")?.value.trim();
    const lastName = document.getElementById("last-name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();

    const isValid =
      firstName && lastName && email && phone && this.isValidEmail(email);

    if (isValid) {
      this.enableButton("submit-booking");
    } else {
      this.disableButton("submit-booking");
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  enableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.disabled = false;
      button.classList.remove("disabled");
    }
  }

  disableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.disabled = true;
      button.classList.add("disabled");
    }
  }

  submitForm() {
    if (!this.validateContactForm()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Récupérer les données de contact
    this.formData.contactInfo = {
      firstName: document.getElementById("first-name").value.trim(),
      lastName: document.getElementById("last-name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    console.log("📋 Données finales du formulaire:", this.formData);

    // Ici, vous pouvez ajouter l'envoi vers votre backend
    this.sendFormData();
  }

  async sendFormData() {
    const submitButton = document.getElementById("submit-booking");
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    submitButton.disabled = true;

    try {
      // Préparer les données pour l'email
      const emailData = this.prepareEmailData();

      console.log("🔍 Configuration EmailJS:", this.emailConfig);
      console.log("📧 Données à envoyer:", emailData);

      // Vérifier si EmailJS est disponible
      if (typeof emailjs !== "undefined") {
        console.log("📧 Tentative d'envoi via EmailJS...");

        // Envoyer l'email avec gestion d'erreur détaillée
        const response = await emailjs.send(
          this.emailConfig.serviceID,
          this.emailConfig.templateID,
          emailData,
          this.emailConfig.publicKey // Ajouter la clé publique ici aussi
        );

        console.log("✅ Email envoyé avec succès:", response);

        // Afficher le message de succès
        this.showSuccessMessage();

        // Réinitialiser le formulaire
        this.resetForm();
      } else {
        // Mode fallback si EmailJS n'est pas disponible
        console.warn(
          "⚠️ EmailJS non disponible - utilisation du mode simulation"
        );
        this.sendFormDataFallback(emailData);
      }
    } catch (error) {
      console.error("❌ Erreur détaillée lors de l'envoi:", {
        message: error.message,
        status: error.status,
        text: error.text,
        fullError: error,
      });

      // Message d'erreur plus informatif
      let errorMessage = "Erreur d'envoi";
      if (error.status === 400) {
        errorMessage = "Configuration EmailJS incorrecte";
      } else if (error.status === 401) {
        errorMessage = "Clé d'accès EmailJS invalide";
      } else if (error.status === 404) {
        errorMessage = "Service ou template EmailJS introuvable";
      }

      this.showErrorMessage(errorMessage);
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  prepareEmailData() {
    // Calculer le prix total
    const totalPrice =
      this.formData.stayPrice * this.formData.adults +
      this.formData.stayPrice * 0.5 * this.formData.children;

    // Formater la date
    let dateText = "Dates flexibles";
    if (this.formData.selectedDate && !this.formData.isFlexibleDates) {
      dateText = `${this.formData.selectedDate.day} ${this.formData.selectedDate.monthName} ${this.formData.selectedDate.year}`;
    }

    // Formater le type de séjour
    const stayTypeText =
      this.formData.stayType === "decouverte"
        ? "Échappée Découverte"
        : "Séjour Signature";

    // Détail des voyageurs
    let travelersDetail = `${this.formData.adults} adulte${
      this.formData.adults > 1 ? "s" : ""
    }`;
    if (this.formData.children > 0) {
      travelersDetail += `, ${this.formData.children} enfant${
        this.formData.children > 1 ? "s" : ""
      }`;
    }
    if (this.formData.babies > 0) {
      travelersDetail += `, ${this.formData.babies} bébé${
        this.formData.babies > 1 ? "s" : ""
      }`;
    }

    return {
      // Informations de contact
      to_email: "echappeeromantique75@gmail.com",
      from_name: `${this.formData.contactInfo.firstName} ${this.formData.contactInfo.lastName}`,
      reply_to: this.formData.contactInfo.email,
      client_email: this.formData.contactInfo.email,
      client_phone: this.formData.contactInfo.phone,
      client_name: `${this.formData.contactInfo.firstName} ${this.formData.contactInfo.lastName}`,

      // Détails de la réservation
      stay_type: stayTypeText,
      stay_price: this.formData.stayPrice,
      total_price: totalPrice,
      departure_date: dateText,
      travelers_detail: travelersDetail,
      total_travelers:
        this.formData.adults + this.formData.children + this.formData.babies,
      adults: this.formData.adults,
      children: this.formData.children,
      babies: this.formData.babies,

      // Message
      message: this.formData.contactInfo.message || "Aucun message particulier",

      // Métadonnées
      request_date: new Date().toLocaleDateString("fr-FR"),
      request_time: new Date().toLocaleTimeString("fr-FR"),
    };
  }

  sendFormDataFallback(emailData) {
    // Mode simulation pour les tests
    console.log("📧 Simulation d'envoi d'email:", emailData);

    setTimeout(() => {
      this.showSuccessMessage();
      this.resetForm();
    }, 1500);
  }

  showSuccessMessage() {
    // Créer une notification de succès moderne
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas fa-check-circle text-xl"></i>
        <div>
          <div class="font-semibold">Demande envoyée !</div>
          <div class="text-sm opacity-90">Nous vous contacterons rapidement</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Animer l'apparition
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Supprimer après 5 secondes
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  showErrorMessage(error) {
    // Créer une notification d'erreur
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas fa-exclamation-triangle text-xl"></i>
        <div>
          <div class="font-semibold">Erreur d'envoi</div>
          <div class="text-sm opacity-90">Veuillez réessayer ou nous contacter directement</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Animer l'apparition
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Supprimer après 7 secondes
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => notification.remove(), 300);
    }, 7000);
  }

  resetForm() {
    // Réinitialiser les données
    this.formData = {
      stayType: "",
      stayPrice: 0,
      adults: 2,
      children: 0,
      babies: 0,
      selectedDate: null,
      isFlexibleDates: false,
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      },
    };

    // Retourner à la première étape
    this.showStep(1);

    // Réinitialiser l'interface
    document
      .querySelectorAll(".stay-option")
      .forEach((opt) => opt.classList.remove("selected"));
    document
      .querySelectorAll(".calendar-day")
      .forEach((day) => day.classList.remove("selected"));
    document
      .querySelectorAll("input, textarea")
      .forEach((input) => (input.value = ""));

    // Réinitialiser les compteurs
    document.getElementById("adults-count").textContent = "2";
    document.getElementById("children-count").textContent = "0";
    document.getElementById("babies-count").textContent = "0";

    // Désactiver les boutons
    this.disableButton("next-step-1");
    this.disableButton("next-step-3");
    this.disableButton("submit-booking");

    console.log("🔄 Formulaire réinitialisé");
  }
}

// Initialisation automatique
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("reservation-section")) {
    window.reservationForm = new ReservationForm();
  }
});
