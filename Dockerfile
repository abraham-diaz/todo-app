# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig*.json vite.config.ts index.html ./
COPY src/ src/
RUN npm run build

# Stage 2: Build server
FROM node:20-alpine AS server-build
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/tsconfig.json ./
COPY server/src/ src/

# Stage 3: Production
FROM node:20-alpine
WORKDIR /app

# Install server production dependencies (includes better-sqlite3 native build)
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev

# Copy built frontend
COPY --from=frontend-build /app/dist ./dist

# Copy server source (runs via tsx in production)
COPY --from=server-build /app/server/src ./server/src
COPY --from=server-build /app/server/tsconfig.json ./server/

# Install tsx for running TypeScript directly
RUN cd server && npm install tsx

# Create data directory for SQLite
RUN mkdir -p server/data

ENV NODE_ENV=production
EXPOSE 3001

CMD ["npx", "--prefix", "server", "tsx", "server/src/index.ts"]
