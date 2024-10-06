## utilisation

pour créer votre projet nextjs, utilisez cette commande

```bash
npx create-next-app@latest --example https://github.com/NapoTwiixe306/napoplate
```

# pour Prisma

créez un fichier .env

```bash
touch .env
```

dans le .env, mettez cette ligne (modifier vos acces a votre database ainsi que le port)

```bash
DATABASE_URL="mysql://utilisateur:mot_de_passe@localhost:3306/nom_de_la_base_de_donnees?schema=public"
```

faites les commandes dans cet ordre

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db pull
```
