# PowerShell script to verify and push changes

Write-Host "=== Git Repository Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Checking for unpushed commits ===" -ForegroundColor Cyan
$unpushed = git log origin/main..HEAD --oneline
if ($unpushed) {
    Write-Host "Found unpushed commits:" -ForegroundColor Yellow
    Write-Host $unpushed
} else {
    Write-Host "No unpushed commits found" -ForegroundColor Green
}

Write-Host "`n=== Verifying deleteClass function exists ===" -ForegroundColor Cyan
$hasDeleteClass = Select-String -Path "classes.html" -Pattern "deleteClass" -Quiet
if ($hasDeleteClass) {
    Write-Host "✓ deleteClass function found in classes.html" -ForegroundColor Green
    Select-String -Path "classes.html" -Pattern "deleteClass" | Select-Object -First 2
} else {
    Write-Host "✗ deleteClass function NOT found!" -ForegroundColor Red
}

Write-Host "`n=== Verifying enrollmentSummary fix exists ===" -ForegroundColor Cyan
$hasEnrollmentFix = Select-String -Path "classes.html" -Pattern "enrollmentSummary" -Quiet
if ($hasEnrollmentFix) {
    Write-Host "✓ enrollmentSummary fix found in classes.html" -ForegroundColor Green
    Select-String -Path "classes.html" -Pattern "enrollmentSummary" | Select-Object -First 2
} else {
    Write-Host "✗ enrollmentSummary fix NOT found!" -ForegroundColor Red
}

Write-Host "`n=== File size check ===" -ForegroundColor Cyan
$fileSize = (Get-Item "classes.html").Length / 1KB
Write-Host "classes.html size: $([math]::Round($fileSize, 1)) KB"

Write-Host "`n=== Last 5 commits ===" -ForegroundColor Cyan
git log --oneline -5

Write-Host "`n=== Ready to push? ===" -ForegroundColor Yellow
Write-Host "If everything looks correct above, run:" -ForegroundColor White
Write-Host "git push origin main" -ForegroundColor Green
Write-Host "`nIf you get an authentication error, you may need to:" -ForegroundColor White
Write-Host "1. Use a Personal Access Token (PAT) from GitHub"
Write-Host "2. Or use: git push https://YOUR_USERNAME:YOUR_PAT@github.com/mhegazy1/intellaclick-instructor-portal.git main"