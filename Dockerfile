# Build stage — bakes in public env vars (client_id, redirect_uri)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage — Node serves SPA + holds the client_secret
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY server.js package.json ./

EXPOSE 3000

# Pass secrets at runtime via docker run -e or docker-compose environment:
#   KID_CLIENT_ID, KID_CLIENT_SECRET, KID_REDIRECT_URI
CMD ["node", "server.js"]
