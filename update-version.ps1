# Update APP_VERSION in all HTML files to force cache refresh
# Run this script before deploying updates
# Usage: .\update-version.ps1

# Generate new version based on current date and time
$NEW_VERSION = Get-Date -Format "yyyy.MM.dd.HHmm"

Write-Host "Updating APP_VERSION to: $NEW_VERSION" -ForegroundColor Green
Write-Host "----------------------------------------"

# Find all HTML files with APP_VERSION
$files = Get-ChildItem -Path . -Filter *.html | Where-Object {
    (Get-Content $_.FullName -Raw) -match "const APP_VERSION = "
}

if ($files.Count -eq 0) {
    Write-Host "No files found with APP_VERSION constant" -ForegroundColor Red
    exit 1
}

foreach ($file in $files) {
    # Read file content
    $content = Get-Content $file.FullName -Raw

    # Update the version
    $newContent = $content -replace "const APP_VERSION = '[^']*'", "const APP_VERSION = '$NEW_VERSION'"

    # Write back to file
    Set-Content -Path $file.FullName -Value $newContent -NoNewline

    Write-Host "Updated: $($file.Name)" -ForegroundColor Green
}

Write-Host "----------------------------------------" -ForegroundColor Green
Write-Host "Version updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Review changes: git diff"
Write-Host "2. Commit: git add ."
Write-Host "3. Commit message: git commit -m `"Update cache-busting version`""
Write-Host "4. Push: git push"
