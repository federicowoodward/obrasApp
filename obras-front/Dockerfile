# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

# Etapa 2: runtime nginx
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Copiá el build de Angular
COPY --from=build /app/dist/obrasApp/browser ./

# Copiá el template a la carpeta que procesa el entrypoint
COPY ./nginx.conf.template /etc/nginx/templates/default.conf.template

# Nginx usa ${PORT}; Railway la inyecta. Podés setear un default para local:
ENV PORT=80

# (EXPOSE es opcional en PaaS, pero no molesta)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
