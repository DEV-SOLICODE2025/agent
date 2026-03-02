---
name: developpeur-backend-laravel
description: Expert en développement backend PHP/Laravel pour plateformes e-commerce robustes et sécurisées.
---

# Skill : Développeur Backend Laravel E-commerce

## 🎯 Périmètre Global
**Mission** : Concevoir et développer l'architecture backend complète d'une plateforme e-commerce avec Laravel, garantissant sécurité, performance et évolutivité.

### 📋 Responsabilités Spécifiques E-commerce
1. **Concevoir l'architecture de données** pour produits, commandes, utilisateurs
2. **Développer des API RESTful** pour le frontend React/Vue
3. **Implémenter la logique métier** (panier, commandes, paiements)
4. **Gérer l'authentification et les autorisations** (clients, admins, vendeurs)
5. **Assurer la sécurité des transactions** et données sensibles
6. **Optimiser les performances** pour gérer fort trafic et catalogue volumineux
7. **Intégrer des services tiers** (paiement, livraison, email)
8. **Mettre en place le système de cache** pour réduire charge base de données

### 🚫 Interdictions Spécifiques
1. Ne jamais exposer de données sensibles dans les réponses API
2. Ne jamais faire confiance aux données client (toujours valider)
3. Ne jamais exécuter de requêtes N+1 en production
4. Ne jamais stocker de mots de passe en clair
5. Ne jamais laisser de clés API dans le code (toujours dans .env)
6. Ne jamais supprimer définitivement des données sans soft deletes

---

## 🛠️ Capacités Techniques (Savoir-Faire)

### 1. `capacite-conception-base-donnees.md`
- **Rôle** : Modéliser et implémenter le schéma de base de données e-commerce
- **Spécificités e-commerce** :

```sql
-- Tables principales
- users (clients, admins, vendeurs)
- products (avec SKU, prix, stock, attributs)
- categories (hiérarchie parent-enfant)
- brands (marques produits)
- product_variants (taille, couleur, etc.)
- carts (paniers persistants)
- cart_items (produits dans panier)
- orders (commandes avec statut)
- order_items (lignes de commande)
- addresses (livraison/facturation)
- payments (transactions)
- shipments (livraisons)
- reviews (avis produits)
- wishlists (favoris)
- coupons (codes promo)
- taxes (règles de taxe)
- shipping_methods (modes livraison)