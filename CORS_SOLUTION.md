# CORS Issue Solution for IntellaClick

## Problem
The "Failed to fetch" errors in the polling simulation occur because the instructor portal at `instructor.intellaclick.com` is not in the backend's allowed origins list for CORS.

## Root Cause
The backend CORS configuration (located in `/cloud-backend/server.js`) only includes these default origins:
- `http://localhost:3000`
- `http://localhost:3001` 
- `http://localhost:5173`
- `http://127.0.0.1:5500`
- Netlify domains (`*.netlify.app`, `*.netlify.live`) in production

It does NOT include:
- `https://instructor.intellaclick.com`
- `https://join.intellaclick.com`

## Solution

### Option 1: Environment Variable (Recommended)
Add this to the backend's environment variables in Coolify:
```
ALLOWED_ORIGINS=https://instructor.intellaclick.com,https://join.intellaclick.com
```

### Option 2: Update Backend Code
Modify the backend's `server.js` file to include these domains in the default origins:

```javascript
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:5173',
  'http://127.0.0.1:5500',
  'https://instructor.intellaclick.com',  // Add this
  'https://join.intellaclick.com'         // Add this
];
```

## Testing
1. Use the `/cors-test.html` page to verify CORS configuration
2. The enhanced debug tool (`/session-debug.html`) now provides detailed CORS error information
3. The main session page now shows helpful CORS error messages when the issue occurs

## What This Fixes
- "Failed to send question" errors
- Polling errors in the debug tool
- Student interface not receiving questions
- Any cross-origin requests from the instructor portal to the API

## Deploy To
**intellaclick-cloud-backend** - This is a backend configuration change only