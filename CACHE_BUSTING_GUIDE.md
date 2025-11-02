# Cache Busting Strategy for Commercial Deployment

## The Problem

When you deploy updates to JavaScript files, users' browsers may continue to use old cached versions instead of downloading the new code. This causes users to see outdated features or bugs that have been fixed, even after refreshing the page.

**Symptoms:**
- Changes work in incognito mode but not in regular browser
- Users need to do "hard refresh" (Ctrl+Shift+R) to see updates
- New features don't appear for users even after deployment

## The Solution

We use **version-based cache busting** - appending a version parameter to JavaScript imports that changes with each deployment.

### How It Works

Each HTML file imports JavaScript modules with a version parameter:

```javascript
const APP_VERSION = '2025.01.11.001';

import { gamification } from `./utils/api.js?v=${APP_VERSION}`;
import toast from `./utils/toast.js?v=${APP_VERSION}`;
```

When you update `APP_VERSION`, browsers see it as a different URL and fetch the new files.

## Deployment Workflow

### Option 1: Automated Script (Recommended)

**On Linux/Mac/WSL:**
```bash
./update-version.sh
git add .
git commit -m "Deploy updates with cache-busting version"
git push
```

**On Windows PowerShell:**
```powershell
.\update-version.ps1
git add .
git commit -m "Deploy updates with cache-busting version"
git push
```

### Option 2: Manual Update

1. Open each HTML file that has `const APP_VERSION`
2. Change the version to a new value (e.g., increment the last number)
3. Commit and push

### Version Format

Use date-based versioning for simplicity:
- Format: `YYYY.MM.DD.###`
- Example: `2025.01.11.001`

The automated script uses: `YYYY.MM.DD.HHMM` (includes hour and minute)

## Files with Cache Busting

Currently configured:
- `gamification-dashboard.html`
- `classes.html` (already had v=2)
- Additional files can be added as needed

## Important Notes

### ✅ Do This:
- Update version before **every** deployment that changes JavaScript
- Use the automated script to avoid missing files
- Test in incognito mode after deployment

### ❌ Don't Do This:
- Don't forget to update version when changing JavaScript
- Don't use the same version number twice
- Don't import version from a .js file (that file would also be cached!)

## Alternative Approaches

For more advanced deployments, consider:

1. **Build-time hashing**: Use a build tool to add content hashes to filenames
   - Example: `api.abc123.js` instead of `api.js?v=1`
   - Requires build pipeline (Webpack, Vite, etc.)

2. **HTTP Cache-Control headers**: Configure server to send proper cache headers
   - `Cache-Control: no-cache` for HTML files
   - `Cache-Control: max-age=31536000` for versioned assets
   - Requires server configuration access

3. **Service Workers**: For Progressive Web Apps
   - More complex but gives fine-grained control
   - Good for offline-first applications

## Testing

After deployment:
1. Open site in regular browser (should see updates)
2. If not, check:
   - Was version updated in the HTML file?
   - Did deployment complete successfully?
   - Check browser DevTools Network tab - are requests showing the new version parameter?

## For Commercial Use

This cache-busting strategy ensures:
- ✅ Users always get latest updates
- ✅ No manual cache clearing required
- ✅ Works across all browsers
- ✅ Simple to maintain

**Just remember:** Update version before every JavaScript change!
