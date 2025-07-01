FROM node:22-slim AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
FROM node:22-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /usr/src/app ./

EXPOSE 3001

CMD ["npm", "run", "start:dev"]

#PROD
# Etapa 1: Build (instala todas las dependencias y prepara el código)
#FROM node:22-slim AS build
#
#WORKDIR /app
#
#COPY package*.json ./
#RUN npm install
#
#COPY . .
#
## Si usas un proceso de build (por ejemplo, TypeScript, Babel, etc.), agrégalo aquí:
## RUN npm run build
#
## Etapa 2: Producción (solo dependencias de producción y código necesario)
#FROM node:22-slim
#
#WORKDIR /app
#
#COPY package*.json ./
#RUN npm install --omit=dev
#
## Copia el código fuente (o la carpeta dist si compilas)
#COPY --from=build /app ./
#
#EXPOSE 3001
#
#CMD ["node", "index.js"]