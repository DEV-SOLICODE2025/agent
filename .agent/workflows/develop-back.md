---
description: 
---

# Workflow : Développeur Front (`/develope-back`)

**Objectif** : Exécuter les actions du skill `developpeur-front` pour transformer les mockups en code de production.
**Protocole** : Suivre le standard [`.agent/resources/protocoles-workflow.md`](.agent/resources/protocoles-workflow.md).

## Exécution

### 1. Détection & Menu
- **Analyser** la demande via `.agent/skills/developpeur-back/SKILL.md`.
- **Afficher** le *Template A* (Confirmation) ou *Template B* (Menu) selon le protocole.
- **STOP** : Attendre validation du développeur.

### 2. Exécution Déléguée
- **Source** : Exécuter strictement l'Action choisie depuis le fichier Skill.
- **Trace** : Ajouter `Action exécutée : [Nom de l'action] (Skill: developpeur-backend)` en fin de réponse.