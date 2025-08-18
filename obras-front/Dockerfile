# Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

# Runtime Nginx
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Copia el build
COPY --from=build /app/dist/obrasApp/browser ./

# Copia la plantilla (no conf directo)
COPY ./nginx.conf.template /etc/nginx/templates/default.conf.template

# Default local; en Railway inyectan PORT automáticamente
ENV PORT=80

# Opcional
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
