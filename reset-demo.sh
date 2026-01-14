#!/bin/bash

echo "🔄 Resetting demo to initial buggy state..."

# Reset to original buggy state
git checkout demo-bugs
git reset --hard demo-bugs-original
git push -f origin demo-bugs

echo "✅ Branch reset complete!"
echo ""
echo "📝 Closing old PR and creating new one..."

# Close existing PRs on demo-bugs branch (ignore errors)
gh pr close demo-bugs 2>/dev/null || true

# Create fresh PR
gh pr create --base main --head demo-bugs \
  --title "feat: Add team utilization metrics and UI improvements" \
  --body "This PR adds new utilization tracking features and dashboard UI improvements for better team visibility." \
  --web

echo ""
echo "✅ Demo reset complete! New PR created and opened in browser."
