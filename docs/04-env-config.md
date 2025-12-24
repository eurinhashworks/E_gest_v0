# Configuration de l'Environnement (.env)

La gestion des configurations sensibles et spécifiques à l'environnement se fait via des variables d'environnement.

> **⚠️ Important** : Ne jamais commiter les fichiers `.env.local`, `.env.development`, ou `.env.production` contenant des secrets réels. Ajoutez-les à votre `.gitignore`.

## Fichiers de configuration

*   `.env` : Valeurs par défaut (partagées, non sensibles).
*   `.env.local` : Surcharges locales (secrets, non versionné).
*   `.env.test` : Configuration pour les tests.

## Variables Requises

### 🔐 Authentification (Clerk)
Ces variables sont nécessaires pour que l'authentification fonctionne.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 🗄️ Base de Données (Prisma)

```env
# URL de connexion à la base de données (PostgreSQL, MySQL, SQLite, etc.)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# (Optionnel) URL directe pour les migrations si utilisation de pooling (ex: Supabase, Neon)
DIRECT_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### 🌐 Application

```env
# URL de base de l'application (utile pour les liens absolus, emails, etc.)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Exemple complet (`.env.example`)

Voici un modèle à copier dans votre `.env.local` :

```bash
# Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# DB
DATABASE_URL="file:./dev.db"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
