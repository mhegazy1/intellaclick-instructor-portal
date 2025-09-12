# Build stage to prepare files
FROM alpine:latest AS builder
WORKDIR /build
COPY . .
# Create dist directory and copy files
RUN mkdir -p dist && \
    cp *.html dist/ 2>/dev/null || true && \
    cp *.css dist/ 2>/dev/null || true && \
    cp *.js dist/ 2>/dev/null || true && \
    ls -la dist/

# Final stage
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Create app directory to match nginx.conf
RUN mkdir -p /app/dist

# Copy files to the correct location that nginx.conf expects
COPY --from=builder /build/dist/ /app/dist/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add build arguments to bust cache
ARG CACHEBUST=1
ARG BUILD_DATE
ENV BUILD_DATE=${BUILD_DATE:-unknown}

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]