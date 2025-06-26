# ✅ Modifications pour Hostinger - Échappée Romantique

## 🔄 Chemins corrigés dans `echappees.html`

### Fichiers CSS et JavaScript
```html
<!-- AVANT -->
<link href="style.css" rel="stylesheet">
<script src="translations.js"></script>
<script src="language-config.js"></script>
<script src="script.js"></script>
<script src="echappees-animations.js"></script>
<script src="reservation-form.js"></script>

<!-- APRÈS -->
<link href="./style.css" rel="stylesheet">
<script src="./translations.js"></script>
<script src="./language-config.js"></script>
<script src="./script.js"></script>
<script src="./echappees-animations.js"></script>
<script src="./reservation-form.js"></script>
```

### Images
```html
<!-- AVANT -->
<img src="assets/img8.jpeg" alt="...">
<img src="assets/img18.jpeg" alt="...">
<img src="assets/img40.png" alt="...">
<img src="assets/logo.jpeg" alt="...">

<!-- APRÈS -->
<img src="./assets/img8.jpeg" alt="...">
<img src="./assets/img18.jpeg" alt="...">
<img src="./assets/img40.png" alt="...">
<img src="./assets/logo.jpeg" alt="...">
```

## 📂 Structure des fichiers pour upload

```
public_html/                      ← Dossier racine Hostinger
├── echappees.html               ✅ (chemins corrigés)
├── index.html
├── signature.html
├── decouverte.html
├── style.css                    ⚠️ Permissions 644
├── script.js                    ⚠️ Permissions 644
├── reservation-form.js          ⚠️ Permissions 644
├── echappees-animations.js      ⚠️ Permissions 644
├── translations.js              ⚠️ Permissions 644
├── language-config.js           ⚠️ Permissions 644
├── test-formulaire.html         🔍 Diagnostic
├── HOSTINGER_SETUP.md          📋 Instructions
├── check-permissions.sh         🔧 Script
└── assets/                      📁 Dossier 755
    ├── img1.jpeg               📷 Permission 644
    ├── img8.jpeg               📷 Permission 644
    ├── img18.jpeg              📷 Permission 644
    ├── img40.png               📷 Permission 644
    ├── logo.jpeg               📷 Permission 644
    └── ... (toutes les images)
```

## 🔧 Commandes pour Hostinger

### Via SSH (recommandé)
```bash
# Aller au dossier du site
cd public_html/

# Définir les permissions des fichiers
chmod 644 *.html *.css *.js
chmod 755 assets/
chmod 644 assets/*

# Vérifier les permissions
ls -la *.js *.css
```

### Via File Manager
1. Sélectionner tous les fichiers .html, .css, .js
2. Clic droit → Permissions → 644
3. Dossier assets/ → Permissions → 755
4. Images dans assets/ → Permissions → 644

## 🧪 Tests à effectuer

### 1. Test de base
- URL: `https://votre-site.com/test-formulaire.html`
- ✅ Le bouton "Tester JS" doit afficher une alerte

### 2. Test principal
- URL: `https://votre-site.com/echappees.html`
- ✅ Page se charge sans erreur
- ✅ Images visibles
- ✅ Formulaire visible dans la section "Réservez votre échappée"
- ✅ Étapes de navigation fonctionnelles

### 3. Console JavaScript (F12)
```
✅ Messages attendus :
- "🚀 Formulaire de réservation initialisé"
- "📧 EmailJS initialisé"

❌ Erreurs à éviter :
- "404 Not Found" pour les fichiers .js/.css
- "Failed to load resource"
- "Uncaught ReferenceError"
```

## 🚨 En cas de problème

### Le formulaire n'apparaît pas
1. Vérifier que `reservation-form.js` est uploadé
2. Vérifier les permissions (644)
3. Regarder la console (F12) pour les erreurs

### Images ne s'affichent pas
1. Vérifier que le dossier `assets/` est uploadé
2. Vérifier les permissions : dossier 755, images 644
3. Vérifier les noms de fichiers (sensible à la casse)

### JavaScript ne fonctionne pas
1. Tester avec `test-formulaire.html`
2. Vérifier les chemins `./script.js` vs `script.js`
3. Utiliser la version standalone en secours

## 🎯 Version de secours

Si rien ne fonctionne :
1. Renommer `echappees.html` en `echappees-backup.html`
2. Renommer `echappees-standalone.html` en `echappees.html`
3. Cette version fonctionne sans fichiers externes

## 📞 Support

En cas de problème persistant :
1. Capturer la console (F12)
2. Tester `test-formulaire.html`
3. Vérifier la structure des fichiers
4. Contacter avec les détails des erreurs

---

**✅ Tous les chemins ont été corrigés pour Hostinger !** 