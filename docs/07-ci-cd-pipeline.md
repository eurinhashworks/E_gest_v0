# Pipeline CI/CD

L'intégration et le déploiement continu (CI/CD) permettent d'automatiser les tests et la mise en production.

## 🔄 Workflow Recommandé (GitHub Actions)

Nous recommandons l'utilisation de GitHub Actions pour orchestrer le pipeline.

### Pipeline de Pull Request (CI)

Ce workflow se déclenche à chaque PR vers la branche `main`.

1.  **Checkout** du code.
2.  **Install** des dépendances (`pnpm install`).
3.  **Lint** : Vérification du style de code (`pnpm run lint`).
4.  **Type Check** : Vérification TypeScript (`tsc --noEmit`).
5.  **Test** : Exécution des tests unitaires (une fois mis en place).
6.  **Build** : Vérification que le projet compile (`pnpm run build`).

### Pipeline de Déploiement (CD)

Ce workflow se déclenche lors d'un push sur `main`.

1.  **CI Steps** : Reprendre les étapes de vérification ci-dessus.
2.  **Deploy** : Déploiement vers l'environnement de production (Vercel ou Docker).

## 📄 Exemple de configuration (.github/workflows/ci.yml)

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm run lint

      - name: Build
        run: pnpm run build
```

## 🔐 Gestion des Secrets

Les secrets (clés API, credentials DB) ne doivent **jamais** être écrits en dur.
Utilisez les **GitHub Secrets** pour les injecter dans le pipeline :

*   `CLERK_SECRET_KEY`
*   `DATABASE_URL`
*   etc.
