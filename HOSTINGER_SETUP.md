# 🚀 Configuration Hostinger pour Échappée Romantique

## 📂 Structure des fichiers à uploader

Assurez-vous que tous ces fichiers sont dans le **dossier racine** de votre site (généralement `public_html/`) :

```
public_html/
├── index.html
├── echappees.html                ✅ (chemins modifiés)
├── signature.html
├── decouverte.html
├── style.css                     ⚠️ Permissions 644
├── script.js                     ⚠️ Permissions 644
├── reservation-form.js           ⚠️ Permissions 644
├── echappees-animations.js       ⚠️ Permissions 644
├── translations.js               ⚠️ Permissions 644
├── language-config.js            ⚠️ Permissions 644
├── assets/
│   ├── img1.jpeg
│   ├── img2.jpeg
│   └── ... (toutes les images)
└── test-formulaire.html          🔍 (pour diagnostic)
```

## 🔧 Commandes pour définir les permissions (via SSH/Terminal Hostinger)

```bash
# Se connecter au dossier du site
cd public_html/

# Définir les permissions correctes pour les fichiers JavaScript et CSS
chmod 644 *.js
chmod 644 *.css
chmod 644 *.html

# Vérifier les permissions
ls -la *.js *.css
```

## ✅ Vérifications après upload

### 1. Testez JavaScript de base
Allez sur : `votre-site.com/test-formulaire.html`
- ✅ JavaScript doit fonctionner
- ✅ Cliquez sur "Tester JS" → Une alerte doit apparaître

### 2. Testez la page principale
Allez sur : `votre-site.com/echappees.html`
- ✅ La page doit se charger correctement
- ✅ Descendez à la section "Réservez votre échappée"
- ✅ Le formulaire doit être visible avec les 4 étapes

### 3. Vérifiez la console du navigateur (F12)
```
✅ Messages attendus :
- "🚀 Formulaire de réservation initialisé"
- "📧 EmailJS initialisé"

❌ Erreurs à surveiller :
- "404 Not Found" pour les fichiers .js
- "CORS errors"
- "Uncaught ReferenceError"
```

## 🔍 Diagnostic en cas de problème

### Problème : Le formulaire n'apparaît pas

**Solution 1 - Vérifier les chemins :**
```bash
# Dans le fichier echappees.html, vérifiez que les chemins sont :
<script src="./reservation-form.js"></script>
<script src="./script.js"></script>
<link href="./style.css" rel="stylesheet">
```

**Solution 2 - Vérifier que les fichiers existent :**
```bash
# Via FTP/File Manager Hostinger, vérifiez que ces fichiers existent :
- reservation-form.js
- script.js  
- style.css
- echappees-animations.js
```

**Solution 3 - Permissions :**
```bash
# Via SSH ou File Manager, définir permissions 644 :
chmod 644 reservation-form.js
chmod 644 script.js
chmod 644 style.css
```

### Problème : Erreurs JavaScript

**1. Ouvrez la console (F12)**
**2. Rechargez la page (Ctrl+F5)**
**3. Notez les erreurs affichées**
**4. Solutions courantes :**

```
❌ "Uncaught ReferenceError: ReservationForm is not defined"
✅ Solution : Vérifier que reservation-form.js se charge avant l'initialisation

❌ "Failed to load resource: 404"
✅ Solution : Vérifier les chemins et l'existence des fichiers

❌ "CORS policy error"
✅ Solution : Utiliser HTTPS ou vérifier la configuration CDN
```

## 🌐 URLs à tester après installation

1. **Page principale :** `https://votre-site.com/echappees.html`
2. **Test diagnostic :** `https://votre-site.com/test-formulaire.html`
3. **Vérification fichiers :**
   - `https://votre-site.com/reservation-form.js` (doit afficher le code JS)
   - `https://votre-site.com/style.css` (doit afficher le CSS)

## 📞 Support

Si le problème persiste après ces vérifications :

1. **Prenez une capture d'écran** de la console (F12)
2. **Testez** `test-formulaire.html` et notez les résultats
3. **Vérifiez** que tous les fichiers sont bien uploadés
4. **Contactez le support** avec ces informations

## 🎯 Version de secours

Si rien ne fonctionne, utilisez la version standalone :
- Uploadez `echappees-standalone.html` 
- Renommez-la en `echappees.html`
- Cette version fonctionne sans fichiers externes 