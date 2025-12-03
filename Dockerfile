# Multi-stage build for optimized production image

# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration for SPA routing
RUN echo 'server {  \n\
  listen 80;  \n\
  server_name localhost;  \n\
  \n\
  # Gzip compression  \n\
  gzip on;  \n\
  gzip_vary on;  \n\
  gzip_min_length 1024;  \n\
  gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;  \n\
  \n\
  # Security headers  \n\
  add_header X-Frame-Options "SAMEORIGIN" always;  \n\
  add_header X-Content-Type-Options "nosniff" always;  \n\
  add_header X-XSS-Protection "1; mode=block" always;  \n\
  \n\
  location / {  \n\
    root /usr/share/nginx/html;  \n\
    try_files $uri $uri/ /index.html;  \n\
    \n\
    # Cache static assets  \n\
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {  \n\
      expires 1y;  \n\
      add_header Cache-Control "public, immutable";  \n\
    }  \n\
  }  \n\
  \n\
  # Disable access to hidden files  \n\
  location ~ /\. {  \n\
    deny all;  \n\
  }  \n\
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
