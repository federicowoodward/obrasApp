# Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i --f
COPY . .
RUN npm run build -- --configuration=production

# 🔎 DEBUG: mostrar dónde quedó el build
RUN echo ">>> DIST TREE" && ls -lah dist && \
    ls -lah dist/obrasApp || true && \
    ls -lah dist/obrasApp/browser || true

# Runtime Nginx
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Copia el build (OJO: nombre debe coincidir con tu proyecto)
COPY --from=build /app/dist/obrasApp/browser ./

# Nginx conf simple para SPA
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
