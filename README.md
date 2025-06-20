# Unity Yoga Studio - Site Web Moderne

Une reproduction fidèle et moderne du site Unity Yoga Studio, créée avec HTML, Tailwind CSS et JavaScript avec animations GSAP.

## ✨ Fonctionnalités

### 🎨 Design & UI/UX
- **Design moderne et responsive** - Optimisé pour tous les appareils
- **Animations fluides** - Utilisation avancée de GSAP pour des transitions élégantes
- **Interface intuitive** - Navigation claire et expérience utilisateur optimisée
- **Accessibilité** - Respect des standards d'accessibilité web

### 🚀 Technologies Utilisées

- **HTML5** - Structure sémantique moderne
- **Tailwind CSS** - Framework CSS utilitaire pour un design rapide et cohérent
- **JavaScript ES6+** - Logique interactive moderne
- **GSAP (GreenSock)** - Animations haute performance
- **Font Awesome** - Icônes vectorielles
- **CSS3** - Animations et styles personnalisés

### 📱 Fonctionnalités Techniques

- **Responsive Design** - Adaptation parfaite sur mobile, tablette et desktop
- **Smooth Scrolling** - Navigation fluide entre les sections
- **Menu Mobile** - Interface tactile optimisée
- **Animations au Scroll** - Révélation progressive du contenu
- **Curseur Personnalisé** - Expérience interactive améliorée
- **Performance Optimisée** - Chargement rapide et animations fluides

## 🏗️ Structure du Projet

```
sejour/
├── index.html          # Page principale
├── script.js           # Logique JavaScript et animations GSAP
├── style.css           # Styles CSS personnalisés
└── README.md          # Documentation
```

## 🎯 Sections du Site

### 1. **Navigation**
- Logo Unity
- Menu responsive avec liens vers les sections
- Bouton menu hamburger pour mobile

### 2. **Section Hero**
- Titre principal avec typographie impactante
- Sous-titre descriptif
- Bouton d'appel à l'action animé
- Éléments flottants décoratifs

### 3. **Section À Propos**
- Message de bienvenue
- Texte défilant animé
- Présentation de la philosophie du studio

### 4. **Section Avantages**
- 5 points forts du studio avec icônes :
  - Instructeurs expérimentés
  - Atmosphère cosy
  - Cours sur le toit
  - Diversité des cours
  - Approche individuelle

### 5. **Section Cours**
- 5 types de yoga proposés :
  - Hatha Yoga
  - Vinyasa Yoga
  - Bikram Yoga (1 cours gratuit)
  - Yoga pour femmes enceintes
  - Kundalini Yoga

### 6. **Section Studios**
- 6 emplacements à Boston :
  - Museum of Fine Arts
  - Fenway Park
  - Boston Common
  - Faneuil Hall Marketplace
  - Massachusetts State House
  - Boston Public Library

### 7. **Section Contact**
- Informations de contact
- Numéro de téléphone
- Bouton d'inscription

### 8. **Footer**
- Logo et description
- Liens réseaux sociaux

## 🎨 Animations GSAP

### Animations d'Entrée
- Titre hero avec effet de montée
- Révélation progressive des éléments
- Animations décalées (stagger)

### Animations au Scroll
- Cartes qui apparaissent avec effet de zoom
- Révélation des titres et paragraphes
- Effets de parallaxe subtils

### Interactions
- Hover effects sur les cartes
- Boutons avec effets de scale
- Menu mobile animé
- Curseur personnalisé interactif

### Éléments Dynamiques
- Particules flottantes dans le hero
- Éléments décoratifs animés
- Texte défilant continu
- Indicateur de scroll

## 🚀 Installation et Utilisation

### Prérequis
- Navigateur web moderne
- Serveur web local (optionnel pour le développement)

### Lancement
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Ou utilisez un serveur local :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js (http-server)
   npx http-server
   
   # Avec PHP
   php -S localhost:8000
   ```

## 📱 Responsive Design

### Points de Rupture
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

### Adaptations Mobile
- Menu hamburger
- Grille adaptative
- Typographie responsive
- Espacements optimisés
- Interactions tactiles

## 🎨 Palette de Couleurs

```css
/* Couleurs Principales */
Primary: #6366f1 (Indigo)
Secondary: #8b5cf6 (Violet)
Accent: #06b6d4 (Cyan)
Neutral: #374151 (Gris)

/* Dégradés */
Hero: Purple-100 → Pink-50 → Indigo-100
Cards: Diverses couleurs pastel
```

## ⚡ Performance

### Optimisations
- **Lazy Loading** des animations
- **Will-change** pour les éléments animés
- **Backface-visibility** pour les performances 3D
- **Pause des animations** quand la page n'est pas visible
- **Debounce** des événements de scroll

### Métriques Cibles
- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **Cumulative Layout Shift** < 0.1

## 🎯 Accessibilité

### Standards Respectés
- **ARIA Labels** pour les boutons interactifs
- **Focus Indicators** personnalisés
- **Contrast Ratio** conforme WCAG 2.1
- **Navigation Clavier** supportée
- **Semantic HTML** avec balises appropriées

## 🔧 Personnalisation

### Couleurs
Modifiez les couleurs dans la configuration Tailwind :
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#votre-couleur',
                // ...
            }
        }
    }
}
```

### Animations
Ajustez les animations GSAP dans `script.js` :
```javascript
gsap.from('.element', {
    duration: 1,
    y: 50,
    opacity: 0
});
```

## 📞 Support

Pour toute question ou suggestion d'amélioration, n'hésitez pas à ouvrir une issue ou à contribuer au projet.

## 📄 Licence

Ce projet est à des fins éducatives et de démonstration. Inspiré du design original Unity Yoga Studio.

---

**Développé avec ❤️ en utilisant les meilleures pratiques du développement web moderne** 