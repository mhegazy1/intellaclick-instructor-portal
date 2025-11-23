FROM nginx:alpine

# Copy built files from dist directory
COPY dist/ /usr/share/nginx/html/

# Use default nginx config with minor adjustments
RUN echo 'server { \
    listen 80; \
    listen [::]:80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Serve static files with reasonable caching \
    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # JS and CSS should revalidate to allow updates \
    location ~* \.(js|css)$ { \
        expires 1h; \
        add_header Cache-Control "public, must-revalidate"; \
    } \
    \
    # Only redirect HTML requests to index.html \
    location / { \
        try_files $uri $uri/ $uri.html /index.html; \
    } \
    \
    location /health { \
        access_log off; \
        return 200 "healthy"; \
        add_header Content-Type text/plain; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]