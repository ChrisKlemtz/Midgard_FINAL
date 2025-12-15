#!/bin/bash

# Dieses Script benötigt ImageMagick oder cwebp
# Installation:
# Ubuntu/Debian: sudo apt install imagemagick webp
# macOS: brew install imagemagick webp

echo "🖼️  Bildoptimierung für Midgard Tattoo"
echo "========================================"

cd frontend/src/assets/images

# Prüfe ob ImageMagick installiert ist
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick gefunden"

    # Optimiere Hero-Bilder (PNG → qualitativ reduziert)
    echo "📦 Optimiere events_hero_bg.png..."
    convert events_hero_bg.png -quality 85 -strip events_hero_bg_optimized.png

    echo "📦 Optimiere faq_hero_bg.png..."
    convert faq_hero_bg.png -quality 85 -strip faq_hero_bg_optimized.png

    echo "✅ Fertig! Ersetze die Originale:"
    echo "   mv events_hero_bg_optimized.png events_hero_bg.png"
    echo "   mv faq_hero_bg_optimized.png faq_hero_bg.png"

elif command -v cwebp &> /dev/null; then
    echo "✅ WebP gefunden"

    # Konvertiere zu WebP (beste Kompression)
    echo "📦 Konvertiere events_hero_bg.png → WebP..."
    cwebp -q 80 events_hero_bg.png -o events_hero_bg.webp

    echo "📦 Konvertiere faq_hero_bg.png → WebP..."
    cwebp -q 80 faq_hero_bg.png -o faq_hero_bg.webp

    echo "✅ WebP-Dateien erstellt!"
    echo "⚠️  Du musst die Imports in den React-Komponenten ändern (.png → .webp)"

else
    echo "❌ Keine Bildoptimierungs-Tools gefunden!"
    echo ""
    echo "📥 Installiere eins dieser Tools:"
    echo "   Ubuntu/Debian: sudo apt install imagemagick"
    echo "   macOS: brew install imagemagick"
    echo ""
    echo "💡 ODER nutze ein Online-Tool:"
    echo "   • https://tinypng.com (einfachste Methode!)"
    echo "   • https://squoosh.app"
fi
