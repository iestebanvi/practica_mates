# --- Etapa 1: build del frontend (React + Vite) ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Etapa 2: runtime (backend Express sirviendo el build) ---
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/src ./src
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000
CMD ["node", "src/server.js"]
