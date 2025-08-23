# ---------- Build Angular ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i --f
COPY . .
# Asegura build prod
RUN npm run build -- --configuration=production

# (OPCIONAL) debug del path de salida
RUN echo ">>> dist tree" && ls -lah dist && ls -lah dist/obrasApp && ls -lah dist/obrasApp/browser

# ---------- Runtime Nginx ----------
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Copia el build (OJO: 'obrasApp' debe coincidir con tu angular.json)
COPY --from=build /app/dist/obrasApp/browser ./

# Plantilla para que Nginx escuche en $PORT que define Railway
COPY ./nginx.conf /etc/nginx/templates/default.conf.template

# MUY IMPORTANTE: solo sustituir la variable PORT (que existe en el entorno de Railway)
ENV NGINX_ENVSUBST_FILTER=PORT

# Opcional: salud y logs más limpios
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
