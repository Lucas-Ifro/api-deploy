FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npx prisma generate
ENTRYPOINT [ 'node', 'server.js']