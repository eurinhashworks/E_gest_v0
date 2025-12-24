# Déploiement en Production

## Option 1 : Déploiement Vercel (Recommandé)

Next.js étant développé par Vercel, c'est la plateforme la plus optimisée pour ce framework.

1.  Créer un compte sur [Vercel](https://vercel.com).
2.  Importer le dépôt Git du projet.
3.  Configurer les variables d'environnement dans l'interface Vercel (voir [04-env-config.md](04-env-config.md)).
4.  Cliquer sur **Deploy**.

Vercel gère automatiquement le build, le CDN, et les Serverless Functions.

## Option 2 : Déploiement Docker (Conteneurisation)

Pour un hébergement sur AWS, Azure, ou un VPS classique, Docker est la solution standard.

### Dockerfile

Voici un exemple de `Dockerfile` optimisé pour la production (Multi-stage build) :

```dockerfile
# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

> **Note** : Pour utiliser le mode `standalone`, ajoutez `output: 'standalone'` dans `next.config.mjs`.

### Commandes Docker

**Construire l'image :**
```bash
docker build -t e-commerce-dashboard .
```

**Lancer le conteneur :**
```bash
docker run -p 3000:3000 -e DATABASE_URL="votre_url" e-commerce-dashboard
```

## 📈 Monitoring

Une fois en production, surveillez :
*   **Logs** : Utilisez Vercel Logs ou un outil comme Datadog/Sentry.
*   **Performance** : Vercel Speed Insights ou Google Analytics.
*   **Erreurs** : Sentry est fortement recommandé pour tracker les crashs JS.
