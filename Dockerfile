# Utiliser une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (le conteneur gère son propre node_modules)
RUN npm install

# Copier tout le code source
COPY . .

# Compiler l'application Next.js
RUN npm run build

# Exposer le port de la webapp
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
