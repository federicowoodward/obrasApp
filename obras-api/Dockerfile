# Etapa 1: Build
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Prod
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.prod .env

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "dist/main.js"]


# docker build -t obras-api .
# docker run -p 3000:3000 -e NODE_ENV=prod obras-api
