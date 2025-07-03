# criar o builder

FROM node:22.16.0-slim AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm ci

COPY src ./src

RUN npm run build

# jogar para produção

FROM node:22.16.0-slim

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm prune --production && npm cache clean --force

ENV PORT=8080
ENV DB_HOST=host.docker.internal
ENV DB_USER=root
ENV DB_PASSWORD=britecsrv

EXPOSE 8080

CMD [ "npm", "start" ]