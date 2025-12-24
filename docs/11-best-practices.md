# Bonnes Pratiques de Développement

## 📝 Conventions de Code

*   **Langue** : Le code (variables, fonctions, commentaires techniques) est en **Anglais**. Le contenu visible utilisateur est en **Français**.
*   **Nommage** :
    *   Fichiers : `kebab-case` (ex: `user-profile.tsx`).
    *   Composants : `PascalCase` (ex: `UserProfile`).
    *   Fonctions/Variables : `camelCase` (ex: `getUserProfile`).
    *   Constantes : `UPPER_SNAKE_CASE` (ex: `MAX_RETRY_COUNT`).
*   **Imports** : Utilisez les alias de chemin (`@/components/...`) plutôt que les chemins relatifs profonds (`../../../`).

## 🏗 Structure des Composants

*   **Petits et Composables** : Découpez les gros composants en sous-composants plus petits.
*   **Server vs Client** : Par défaut, utilisez des Server Components. N'ajoutez `'use client'` que si nécessaire (interactivité, state, hooks).
*   **Typage** : Utilisez TypeScript strictement. Évitez `any` autant que possible.

## 🎨 UI/UX

*   Utilisez les composants **Shadcn/ui** existants pour la cohérence.
*   Respectez le système de design (couleurs, espacements) défini dans `tailwind.config.ts`.
*   Gérez les états de chargement (`loading.tsx`) et d'erreur (`error.tsx`).

## ⚡ Performance

*   Optimisez les images avec le composant `<Image />` de Next.js.
*   Utilisez `React.memo` ou `useMemo` avec parcimonie, uniquement si des problèmes de performance sont avérés.
*   Surveillez la taille du bundle client.

## 🤝 Git Workflow

*   Faites des **commits atomiques** (une tâche = un commit).
*   Message de commit clair : `type(scope): description`
    *   Ex: `feat(auth): add login form validation`
    *   Ex: `fix(nav): correct mobile menu alignment`
