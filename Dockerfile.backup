# Simple nginx static file server
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy all HTML, CSS, JS files directly
COPY *.html /usr/share/nginx/html/
COPY *.css /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add a build argument to bust cache
ARG CACHEBUST=1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]