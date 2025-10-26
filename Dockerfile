FROM nginx:alpine

# Copy all files to nginx default location
COPY *.html /usr/share/nginx/html/
COPY styles /usr/share/nginx/html/styles
COPY utils /usr/share/nginx/html/utils
COPY components /usr/share/nginx/html/components

# Use default nginx config with minor adjustments
RUN echo 'server { \
    listen 80; \
    listen [::]:80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Serve static files directly \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
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