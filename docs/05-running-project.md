# Lancer et Utiliser le Projet

Ce document décrit les commandes disponibles et comment utiliser les différentes fonctionnalités du projet.

## 📜 Scripts disponibles

Ces commandes sont définies dans `package.json` et peuvent être lancées avec `pnpm run <script>`.

| Commande | Description | Usage |
| :--- | :--- | :--- |
| `dev` | Lance le serveur de développement avec Hot Reloading. | Développement quotidien. |
| `build` | Compile l'application pour la production. | Avant le déploiement. |
| `start` | Lance le serveur de production (nécessite `build` avant). | Tester le build localement. |
| `lint` | Analyse le code avec ESLint pour trouver les problèmes. | Vérification qualité. |

## 🖥️ Flux de Développement Standard

1.  **Démarrer** : `pnpm run dev`
2.  **Coder** : Vos modifications dans `app/` ou `components/` sont reflétées instantanément.
3.  **Vérifier** : Avant de commiter, lancez `pnpm run lint` pour vous assurer qu'il n'y a pas d'erreurs évidentes.

## 🛠️ Utilisation de l'Interface (Mock Mode)

Actuellement, l'application fonctionne avec des données simulées. Voici comment interagir avec les modules :

### Dashboard
*   Affiche les KPIs globaux. Les données sont statiques et se rafraîchissent au rechargement de la page.

### Produits
*   **Visualisation** : Liste paginée des produits.
*   **Filtrage** : Utilisez la barre de recherche ou les filtres de catégorie.
*   **Actions** : Les boutons "Ajouter", "Modifier", "Supprimer" ouvrent les interfaces correspondantes, mais les changements **ne persistent pas** après rechargement (mode Mock).

### Ventes & Clients
*   Similaire aux produits. Vous pouvez naviguer dans les détails, mais les créations sont temporaires.

## 🔄 Transition vers le mode Réel (Futur)

Une fois la base de données connectée :
1.  Les formulaires enverront des requêtes réelles (Server Actions).
2.  Les données seront persistées.
3.  La gestion des erreurs (réseau, validation) sera active.
