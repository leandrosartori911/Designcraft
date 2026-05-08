FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --production
RUN npm install tsx typescript

COPY --from=builder /app/dist ./dist
COPY server.ts ./
COPY tsconfig.json ./

EXPOSE 3000
CMD ["npx", "tsx", "server.ts"]