#!/bin/bash

# 🔧 Script de vérification et correction des permissions pour Hostinger
# Usage: chmod +x check-permissions.sh && ./check-permissions.sh

echo "🚀 Vérification des permissions pour Échappée Romantique"
echo "=================================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour vérifier les permissions d'un fichier
check_file() {
    local file=$1
    local expected_perm=$2
    
    if [ -f "$file" ]; then
        actual_perm=$(stat -c "%a" "$file" 2>/dev/null || stat -f "%A" "$file" 2>/dev/null)
        if [ "$actual_perm" = "$expected_perm" ]; then
            echo -e "✅ ${GREEN}$file${NC} : $actual_perm (OK)"
        else
            echo -e "⚠️  ${YELLOW}$file${NC} : $actual_perm → correction en $expected_perm"
            chmod $expected_perm "$file"
            echo -e "   ${GREEN}✓ Corrigé${NC}"
        fi
    else
        echo -e "❌ ${RED}$file${NC} : FICHIER MANQUANT"
    fi
}

echo "📂 Vérification des fichiers HTML..."
check_file "index.html" "644"
check_file "echappees.html" "644"
check_file "signature.html" "644"
check_file "decouverte.html" "644"
check_file "test-formulaire.html" "644"

echo ""
echo "📄 Vérification des fichiers CSS..."
check_file "style.css" "644"

echo ""
echo "⚙️ Vérification des fichiers JavaScript..."
check_file "script.js" "644"
check_file "reservation-form.js" "644"
check_file "echappees-animations.js" "644"
check_file "translations.js" "644"
check_file "language-config.js" "644"

echo ""
echo "🖼️ Vérification du dossier assets..."
if [ -d "assets" ]; then
    echo -e "✅ ${GREEN}assets/${NC} : dossier présent"
    chmod 755 assets
    chmod 644 assets/*
    echo -e "   ${GREEN}✓ Permissions mises à jour${NC}"
else
    echo -e "❌ ${RED}assets/${NC} : DOSSIER MANQUANT"
fi

echo ""
echo "🌐 Test d'accessibilité des fichiers clés..."

# Test si les fichiers sont accessibles
key_files=("reservation-form.js" "style.css" "echappees.html")
for file in "${key_files[@]}"; do
    if [ -r "$file" ]; then
        echo -e "✅ ${GREEN}$file${NC} : accessible en lecture"
    else
        echo -e "❌ ${RED}$file${NC} : problème d'accès"
    fi
done

echo ""
echo "=================================================="
echo "🎯 Récapitulatif :"
echo "- Tous les fichiers .html, .css, .js doivent être en 644"
echo "- Le dossier assets/ doit être en 755"
echo "- Les images dans assets/ doivent être en 644"
echo ""
echo "📱 URLs à tester après upload :"
echo "- https://votre-site.com/echappees.html"
echo "- https://votre-site.com/test-formulaire.html"
echo ""
echo "🔍 En cas de problème, vérifiez la console (F12)"
echo "==================================================" 