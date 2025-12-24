# Directives de Sécurité

La sécurité est primordiale pour protéger les données des clients et de l'entreprise.

## 🔐 Authentification & Autorisation

*   **Clerk** est la solution mandatée pour l'authentification.
    *   N'implémentez jamais votre propre système de login/mot de passe.
    *   Activez le MFA (Multi-Factor Authentication) pour les comptes administrateurs.
*   **RBAC (Role-Based Access Control)** :
    *   Vérifiez toujours le rôle de l'utilisateur (`admin`, `manager`, `sales`, `viewer`) côté serveur (Server Actions) avant d'autoriser une action sensible.
    *   Ne vous fiez pas uniquement aux masquages d'interface (UI) pour la sécurité.

## 🛡️ Protection des Données

*   **Variables d'environnement** : Ne jamais commiter de secrets. Utilisez `.env.local`.
*   **Validation des entrées** : Utilisez **Zod** pour valider toutes les données entrantes dans les Server Actions et API Routes.
*   **Sanitization** : React protège par défaut contre les attaques XSS, mais soyez vigilants avec `dangerouslySetInnerHTML`.

## 🔒 Base de Données

*   Utilisez des connexions sécurisées (SSL/TLS) vers la base de données.
*   Ne stockez pas de données sensibles (comme les numéros de carte bancaire) directement. Utilisez des processeurs de paiement certifiés (Stripe, etc.).

## 📦 Dépendances

*   Mettez régulièrement à jour les dépendances pour corriger les failles connues.
*   Utilisez `pnpm audit` pour scanner les vulnérabilités.

```bash
pnpm audit
```
