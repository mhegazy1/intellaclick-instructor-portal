# Deployment Debugging Checklist

## Issue Summary
GitHub shows updated files, but changes aren't visible on the live site at instructor.intellaclick.com

## Root Cause Analysis

### 1. **Configuration Mismatch Found**
- **nginx.conf** expects files in `/app/dist` (line 20)
- **Dockerfile** copies files to `/usr/share/nginx/html/`
- This mismatch means nginx is looking in the wrong directory!

### 2. **Build Process Issues**
- **nixpacks.toml** copies files to a `dist/` directory
- The build process might be using cached versions
- Need to verify which build system Coolify is using (Dockerfile vs nixpacks)

## Immediate Actions

### Step 1: Deploy Test Files
Push these new test files to GitHub:
- `deployment-test.html` - Contains unique ID: DEPLOY-2025-09-12-TEST-001
- `cache-headers.html` - Tests cache header configuration
- `verify-deployment.html` - Deployment verification dashboard

### Step 2: Test Deployment
After Coolify deploys, check:
1. https://instructor.intellaclick.com/deployment-test.html
2. If you see the unique ID, deployment is working but using cached files
3. If you get 404, there's a path/configuration issue

### Step 3: Fix Configuration Mismatch

**Option A: Update Dockerfile** (Recommended)
```bash
# Use Dockerfile.fixed which properly copies to /app/dist
mv Dockerfile Dockerfile.backup
mv Dockerfile.fixed Dockerfile
git add Dockerfile
git commit -m "Fix nginx path mismatch in Dockerfile"
git push
```

**Option B: Update nginx.conf**
Change line 20 from `root /app/dist;` to `root /usr/share/nginx/html;`

### Step 4: Clear All Caches

1. **Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
   - Or test in incognito/private mode

2. **CloudFlare/CDN Cache (if applicable):**
   - Purge cache from CloudFlare dashboard
   - Or add cache-busting query strings: `?v=20250912`

3. **Docker Cache in Coolify:**
   - Add `--no-cache` to build arguments
   - Or change CACHEBUST arg: `--build-arg CACHEBUST=$(date +%s)`

### Step 5: Verify in Coolify Logs

Look for these specific items:

1. **Build Logs:**
   ```
   Files in current directory:
   Files copied to dist:
   ```
   Ensure classes.html is listed

2. **Container Logs:**
   ```
   nginx: [error] open() "/app/dist/index.html" failed
   ```
   This would confirm the path issue

3. **Access Logs:**
   Check if requests are reaching nginx and what files are being served

## Verification Steps

1. **Direct file check:**
   ```bash
   curl -I https://instructor.intellaclick.com/deployment-test.html
   ```
   Check Last-Modified header

2. **View page source:**
   - Don't rely on browser DevTools elements tab (shows DOM after JS)
   - Use View Page Source to see actual HTML served

3. **Check specific changes:**
   - Search for "Delete" button in classes.html
   - Look for enrollment count implementation

## Long-term Solutions

1. **Add deployment verification to CI/CD:**
   - Include build timestamp in HTML comments
   - Add version endpoint: `/version` or `/build-info.txt`

2. **Implement proper cache headers:**
   - Use nginx-nocache.conf for development
   - Add version hashes to static files in production

3. **Monitor deployments:**
   - Set up health checks that verify file contents
   - Add deployment notifications

## If Nothing Works

1. **SSH into Coolify server:**
   ```bash
   docker exec -it <container-name> sh
   ls -la /app/dist/
   cat /app/dist/classes.html | grep -i delete
   ```

2. **Check for multiple containers:**
   - Old containers might still be running
   - Load balancer might be routing to old instances

3. **Verify domain DNS:**
   - Ensure instructor.intellaclick.com points to correct server
   - Check for multiple A records or CDN configuration

## Summary

The most likely issue is the nginx/Dockerfile path mismatch. The test files will help confirm this. Once confirmed, use Dockerfile.fixed to resolve the issue, then implement proper cache headers to prevent future problems.