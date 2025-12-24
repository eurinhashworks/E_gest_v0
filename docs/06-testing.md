# Tests et Qualité

> **Note** : Actuellement, le projet ne dispose pas encore d'une suite de tests automatisée complète. Ce document décrit la stratégie cible et les étapes pour la mettre en place.

## 🎯 Stratégie de Test

Pour garantir la stabilité et la maintenabilité, nous visons la pyramide de tests suivante :

1.  **Tests Unitaires (Unit Tests)** : Tester les fonctions utilitaires et les composants isolés.
2.  **Tests d'Intégration** : Tester les interactions entre composants et hooks.
3.  **Tests End-to-End (E2E)** : Tester les parcours utilisateurs critiques complets.

## 🛠 Outils Recommandés

*   **Unit & Integration** : [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
*   **E2E** : [Playwright](https://playwright.dev/) (ou Cypress).

## 📝 Guide d'Implantation (TODO)

### 1. Installer les dépendances

```bash
pnpm add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
```

### 2. Tests Unitaires (Exemple)

Créer un fichier `__tests__/utils.test.ts` pour tester `lib/utils.ts`.

```typescript
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });
});
```

### 3. Tests E2E (Exemple avec Playwright)

Créer un test pour vérifier le chargement du dashboard.

```typescript
import { test, expect } from '@playwright/test';

test('dashboard loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Dashboard/);
  await expect(page.getByText('Revenus totaux')).toBeVisible();
});
```

## 🔍 Linting

Le projet utilise ESLint pour l'analyse statique.

*   Lancer l'analyse : `pnpm run lint`
*   Configuration : `.eslintrc.json` (ou config Next.js par défaut).
