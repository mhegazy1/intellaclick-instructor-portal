#!/bin/bash

# Update APP_VERSION in all HTML files to force cache refresh
# Run this script before deploying updates

# Generate new version based on current date and time
NEW_VERSION=$(date +"%Y.%m.%d.%H%M")

echo "Updating APP_VERSION to: $NEW_VERSION"
echo "----------------------------------------"

# Find all HTML files with APP_VERSION and update them
FILES=$(grep -l "const APP_VERSION = " *.html 2>/dev/null)

if [ -z "$FILES" ]; then
    echo "No files found with APP_VERSION constant"
    exit 1
fi

for file in $FILES; do
    # Update the version using sed
    sed -i.bak "s/const APP_VERSION = '[^']*'/const APP_VERSION = '$NEW_VERSION'/" "$file"
    echo "✓ Updated: $file"
    rm "${file}.bak" 2>/dev/null
done

echo "----------------------------------------"
echo "Version updated successfully!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Commit: git add . && git commit -m 'Update cache-busting version to $NEW_VERSION'"
echo "3. Push: git push"
