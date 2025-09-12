# PowerShell script to fix deployment issue

Write-Host "=== Fixing Instructor Portal Deployment ===" -ForegroundColor Cyan

Write-Host "`n1. Adding deployment test file..." -ForegroundColor Yellow
git add deployment-test.html

Write-Host "`n2. Backing up current Dockerfile..." -ForegroundColor Yellow
Copy-Item Dockerfile Dockerfile.backup -Force

Write-Host "`n3. Applying fixed Dockerfile..." -ForegroundColor Yellow
Copy-Item Dockerfile.fixed Dockerfile -Force

Write-Host "`n4. Showing what will be committed..." -ForegroundColor Yellow
git status

Write-Host "`n5. Committing fixes..." -ForegroundColor Green
git add Dockerfile deployment-test.html
git commit -m "Fix nginx path mismatch - copy files to /app/dist instead of /usr/share/nginx/html"

Write-Host "`n6. Ready to push!" -ForegroundColor Green
Write-Host "Run: git push origin main" -ForegroundColor White

Write-Host "`n=== After Deployment ===" -ForegroundColor Cyan
Write-Host "1. Visit: https://instructor.intellaclick.com/deployment-test.html" -ForegroundColor White
Write-Host "   - If you see 'DEPLOY-2025-09-12-TEST-001', deployment is working" -ForegroundColor Gray
Write-Host "   - If you get 404, check Coolify logs" -ForegroundColor Gray

Write-Host "`n2. Check your delete button at: https://instructor.intellaclick.com/classes.html" -ForegroundColor White
Write-Host "   - Force refresh with Ctrl+F5" -ForegroundColor Gray
Write-Host "   - Try incognito mode" -ForegroundColor Gray