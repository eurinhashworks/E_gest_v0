# Guide de Contribution

Merci de vouloir contribuer au projet ! Voici les étapes pour proposer des modifications.

## 📥 Processus de Pull Request (PR)

1.  **Forker** (si externe) ou créer une nouvelle branche (si interne).
    *   Nom de la branche : `feat/nom-fonctionnalite` ou `fix/nom-bug`.
2.  **Développer** en suivant les [Bonnes Pratiques](11-best-practices.md).
3.  **Tester** vos changements localement.
4.  **Commiter** vos changements avec des messages descriptifs.
5.  **Pusher** la branche.
6.  Ouvrir une **Pull Request** vers la branche `main`.

## 📋 Checklist avant soumission

Avant de soumettre votre PR, vérifiez que :

*   [ ] Le code compile sans erreur (`pnpm run build`).
*   [ ] Le linter ne signale aucune erreur (`pnpm run lint`).
*   [ ] Vous n'avez pas laissé de `console.log` de débogage.
*   [ ] Vous avez ajouté/mis à jour la documentation si nécessaire.

## 💬 Code Review

*   Soyez ouvert aux retours et suggestions.
*   Expliquez vos choix techniques si nécessaire.
*   Une fois la PR approuvée, elle sera fusionnée par un mainteneur.
