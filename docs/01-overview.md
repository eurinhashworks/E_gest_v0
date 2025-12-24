# Vue d'ensemble du Projet (Overview)

## 🎯 Objectif du Projet

Ce projet est un tableau de bord complet de gestion pour le commerce électronique (E-commerce Management Dashboard). Il fournit une interface centralisée pour piloter l'ensemble des activités d'une entreprise e-commerce, de la gestion des stocks à la relation client, en passant par le suivi financier.

L'objectif est de transformer une application initialement basée sur des données simulées (mock data) en une plateforme robuste, scalable et multi-tenant, connectée à une base de données réelle et sécurisée.

## 🛠 Stack Technique

### Frontend
- **Framework** : [Next.js](https://nextjs.org/) (App Router)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Composants UI** : [Shadcn/ui](https://ui.shadcn.com/) (basé sur Radix UI)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Graphiques** : Recharts

### Backend (Architecture Cible)
- **Runtime** : Node.js (via Next.js API Routes / Server Actions)
- **Base de données** : [PostgreSQL](https://www.postgresql.org/) (Recommandé) ou SQLite (Dev)
- **ORM** : [Prisma](https://www.prisma.io/)
- **Authentification** : [Clerk](https://clerk.com/)

### Outils de Développement
- **Gestionnaire de paquets** : [pnpm](https://pnpm.io/)
- **Linting/Formatting** : ESLint, Prettier

## 👥 Utilisateurs Cibles (Personas)

1.  **Administrateur (Admin)**
    *   A accès à toutes les fonctionnalités.
    *   Gère les utilisateurs, les permissions globales et les paramètres système.
    *   Supervise les performances globales de l'entreprise.

2.  **Manager**
    *   Gère les opérations quotidiennes.
    *   Peut modifier les produits, gérer les stocks, et superviser les ventes.
    *   A accès aux rapports financiers mais ne peut pas modifier les paramètres système critiques.

3.  **Commercial (Sales)**
    *   Se concentre sur la gestion des clients et des commandes.
    *   Peut créer des devis, valider des commandes et mettre à jour les fiches clients.
    *   N'a pas accès aux paramètres fournisseurs ou financiers sensibles.

4.  **Observateur (Viewer)**
    *   Accès en lecture seule pour l'audit ou la consultation.
    *   Peut voir les rapports et les états de stock, mais ne peut rien modifier.

## 📦 Modules Principaux

*   **Dashboard** : Vue synthétique des KPIs (Revenus, Commandes, Clients actifs).
*   **Produits** : Catalogue, variantes, stock, prix.
*   **Ventes** : Commandes clients, facturation, suivi de livraison.
*   **Clients** : CRM, historique d'achats, segmentation.
*   **Fournisseurs** : Gestion des fournisseurs et commandes d'approvisionnement.
*   **Finances** : Suivi des revenus, dépenses, et trésorerie.
*   **Rapports** : Analyses détaillées et exports.
*   **Utilisateurs** : Gestion des accès et rôles.
