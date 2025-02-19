# Usa una imagen oficial de Node.js
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-alpine

# Define directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias y permite cacheo
COPY package*.json ./
RUN npm ci --omit=dev

# Copia el código restante
COPY . .

# Cambia permisos antes de cambiar de usuario
RUN chown -R node:node /usr/src/app
USER node

# Expone el puerto de la app
EXPOSE 5500

# Usa un comando de producción en lugar de "npm run dev"
CMD ["npm", "start"]