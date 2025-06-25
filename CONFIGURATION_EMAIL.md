# Configuration EmailJS pour l'envoi automatique d'emails

## 📧 Étapes de configuration

### 1. Créer un compte EmailJS (GRATUIT)

1. Rendez-vous sur [EmailJS.com](https://www.emailjs.com/)
2. Cliquez sur "Sign Up" pour créer un compte gratuit
3. Confirmez votre email

### 2. Configurer le service email

1. Dans votre dashboard EmailJS, cliquez sur "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez "Gmail" (recommandé) ou votre provider email
4. Suivez les étapes de connexion avec votre compte Gmail `echappeeromantique75@gmail.com`
5. Notez le **Service ID** généré (ex: `service_xxxxxxx`)

### 3. Créer le template d'email

1. Dans votre dashboard, cliquez sur "Email Templates"
2. Cliquez sur "Create New Template"
3. Copiez-collez ce template HTML :

```html
Nouvelle demande de réservation - {{stay_type}}

Bonjour,

Vous avez reçu une nouvelle demande de réservation :

=== INFORMATIONS CLIENT ===
Nom : {{client_name}}
Email : {{client_email}}
Téléphone : {{client_phone}}

=== DÉTAILS DU SÉJOUR ===
Type de séjour : {{stay_type}}
Prix par personne : {{stay_price}}€
Prix total estimé : {{total_price}}€

Date souhaitée : {{departure_date}}
Nombre de voyageurs : {{total_travelers}}
- Adultes : {{adults}}
- Enfants : {{children}}
- Bébés : {{babies}}

=== MESSAGE CLIENT ===
{{message}}

=== MÉTADONNÉES ===
Date de la demande : {{request_date}} à {{request_time}}

---
Email envoyé automatiquement depuis le site web
```

4. Configurez :
   - **Template Name** : `Demande de réservation`
   - **Subject** : `Nouvelle réservation - {{stay_type}} - {{client_name}}`
   - **To Email** : `echappeeromantique75@gmail.com`
   - **From Name** : `{{from_name}}`
   - **Reply To** : `{{reply_to}}`

5. Sauvegardez et notez le **Template ID** (ex: `template_xxxxxxx`)

### 4. Obtenir la clé publique

1. Dans votre dashboard, allez dans "Account" > "General"
2. Copiez votre **Public Key**

### 5. Mettre à jour le code

Dans le fichier `reservation-form.js`, remplacez ces valeurs dans la configuration :

```javascript
this.emailConfig = {
    serviceID: 'VOTRE_SERVICE_ID',        // Remplacez par votre Service ID
    templateID: 'VOTRE_TEMPLATE_ID',      // Remplacez par votre Template ID
    publicKey: 'VOTRE_PUBLIC_KEY'         // Remplacez par votre Public Key
};
```

## 🎯 Exemple de configuration finale

```javascript
this.emailConfig = {
    serviceID: 'service_abc123',
    templateID: 'template_xyz789', 
    publicKey: 'n8Np9wOX_FJkGQs8f'
};
```

## 🧪 Test du système

1. Remplissez le formulaire sur votre site
2. Soumettez une demande de test
3. Vérifiez que l'email arrive bien sur `echappeeromantique75@gmail.com`

## 🚨 Important

- EmailJS offre **200 emails gratuits par mois**
- Pour plus d'emails, vous pouvez passer au plan payant (très abordable)
- Les emails sont envoyés instantanément
- Tous les champs du formulaire sont automatiquement inclus dans l'email

## 📝 Format de l'email reçu

Vous recevrez un email avec toutes les informations :
- Détails du client (nom, email, téléphone)
- Type de séjour choisi et prix
- Nombre de voyageurs détaillé
- Date souhaitée (ou "dates flexibles")
- Message personnel du client
- Date et heure de la demande

## 🔧 Dépannage

Si les emails ne s'envoient pas :
1. Vérifiez que les IDs sont corrects dans le code
2. Vérifiez la console JavaScript pour les erreurs
3. Assurez-vous que Gmail autorise les applications tierces
4. Contactez le support EmailJS si nécessaire

## 💡 Fonctionnalité bonus

Le système inclut des notifications visuelles modernes :
- ✅ Notification de succès quand l'email est envoyé
- ❌ Notification d'erreur en cas de problème
- 🔄 Indicateur de chargement pendant l'envoi 