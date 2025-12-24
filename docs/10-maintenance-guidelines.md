# Guide de Maintenance

Ce document décrit les tâches récurrentes pour maintenir l'application en bonne santé.

## 🔄 Mises à jour

1.  **Dépendances** :
    *   Vérifier les mises à jour : `pnpm outdated`
    *   Mettre à jour : `pnpm update` (attention aux changements majeurs).
    *   Testez toujours l'application après une mise à jour de dépendances.

2.  **Next.js** :
    *   Suivez les guides de migration officiels lors du passage à une nouvelle version majeure.

## 💾 Sauvegardes (Backups)

*   **Base de Données** :
    *   Configurez des backups quotidiens automatisés chez votre fournisseur de base de données (ex: Vercel Postgres, Supabase, AWS RDS).
    *   Testez la procédure de restauration (Restore) au moins une fois par trimestre.

## 📊 Logs et Surveillance

*   **Logs Applicatifs** : Surveillez les erreurs 500 et les exceptions non gérées.
*   **Logs d'Activité** : L'application possède un module "Activity Log" interne. Vérifiez-le pour détecter des comportements suspects d'utilisateurs.

## 🧹 Nettoyage

*   Supprimez les branches Git fusionnées et obsolètes.
*   Auditez les comptes utilisateurs inactifs régulièrement.
*   Nettoyez les assets (images) non utilisés si stockés sur un CDN.
