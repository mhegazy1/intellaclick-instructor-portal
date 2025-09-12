#!/bin/bash
# Force Coolify to rebuild by adding a timestamp to Dockerfile

# Add a timestamp comment to force rebuild
echo "" >> Dockerfile
echo "# Force rebuild: $(date +%Y%m%d-%H%M%S)" >> Dockerfile

# Commit and push
git add Dockerfile
git commit -m "Force rebuild - $(date +%Y%m%d-%H%M%S)"
git push origin main

echo "Pushed force rebuild commit. Coolify should now rebuild from scratch."