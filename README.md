# Final Bounce

Site officiel de Final Bounce, publié sur [finalbounce.studio](https://finalbounce.studio/).

## Source de vérité

Ce dépôt GitHub est la source de référence du site. Les futurs exports Webflow ne doivent pas remplacer directement les fichiers de ce dépôt.

## Architecture

- `index.html` : accueil et présentation de l’ensemble des activités
- `enregistrement.html` : service d’enregistrement
- `mixage.html` : service de mixage
- `assets/css/final-bounce.css` : système graphique et responsive partagé
- `assets/js/final-bounce.js` : menu mobile, révélations progressives et année du pied de page
- `assets/brand/` : logo optimisé, favicon et icône pour écran d’accueil
- `assets/fonts/` : polices variables auto-hébergées et leurs licences OFL

Les pages publiques sont en HTML, CSS et JavaScript natifs. Elles ne dépendent plus de Webflow, jQuery, GSAP ou Lenis. Les anciens dossiers d’export sont conservés temporairement comme archive locale, mais ne sont plus chargés par le site.

## Typographies

- **Bricolage Grotesque** : interface, texte et titres principaux
- **Syne** : accents typographiques expressifs

Les deux familles sont distribuées sous licence SIL Open Font License. Les textes de licence sont inclus dans `assets/fonts/`.

## Publication

La branche `main` correspond à la version publique. Toute évolution doit être préparée et validée sur une branche dédiée avant d’être fusionnée.
