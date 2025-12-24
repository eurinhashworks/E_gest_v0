# Installation Locale (Développement)

Ce guide détaille les étapes pour configurer votre environnement de développement local.

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

1.  **Node.js** (Version LTS recommandée, v18+)
    *   [Télécharger Node.js](https://nodejs.org/)
    *   Vérifier : `node -v`
2.  **pnpm** (Gestionnaire de paquets)
    *   Installation : `npm install -g pnpm`
    *   Vérifier : `pnpm -v`
3.  **Git**
    *   [Télécharger Git](https://git-scm.com/)
    *   Vérifier : `git --version`
4.  **VS Code** (Recommandé)
    *   Extensions conseillées : ESLint, Prettier, Tailwind CSS IntelliSense.

## 🚀 Étapes d'installation

### 1. Cloner le dépôt

Récupérez le code source depuis le dépôt Git :

```bash
git clone https://github.com/votre-org/votre-projet.git
cd votre-projet
```

### 2. Installer les dépendances

Utilisez `pnpm` pour installer toutes les bibliothèques nécessaires :

```bash
pnpm install
```

### 3. Configuration de l'environnement

Copiez le fichier d'exemple (si disponible) ou créez un fichier `.env.local` à la racine du projet.
*(Voir [04-env-config.md](04-env-config.md) pour les détails des variables).*

```bash
cp .env.example .env.local
```

### 4. Lancer le serveur de développement

Démarrez le serveur local Next.js :

```bash
pnpm run dev
```

L'application sera accessible sur : [http://localhost:3000](http://localhost:3000)

## 🐛 Résolution de problèmes courants

*   **Erreur "EADDRINUSE"** : Le port 3000 est déjà utilisé.
    *   *Solution* : Tuez le processus utilisant le port ou lancez sur un autre port : `PORT=3001 pnpm run dev`.
*   **Dépendances manquantes** : Si vous avez des erreurs d'import.
    *   *Solution* : Supprimez `node_modules` et réinstallez : `rm -rf node_modules && pnpm install`.
