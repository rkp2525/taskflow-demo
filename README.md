# TaskFlow Demo App

A simple task management app used for demonstrating Macroscope's AI code review capabilities.

> **Note:** This is a demo app, not for production use. It's designed to showcase how Macroscope catches bugs in pull requests.

---

## For Sales Reps: Quick Setup Guide

Follow these steps to get your own demo environment running. No coding required!

### Step 1: Get the Code on GitHub

1. Go to the [TaskFlow repository](https://github.com/govambam/flowmetrics-demo)
2. Click the **Fork** button in the top right
3. This creates a copy in your GitHub account

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (free) using your GitHub account
2. Click **"Add New Project"**
3. Find and select your forked `flowmetrics-demo` repository
4. Click **Deploy** (leave all settings as default)
5. Wait for the build to complete (about 1 minute)
6. Your app is now live! Vercel will give you a URL like `flowmetrics-demo-abc123.vercel.app`

### Step 3: Add Environment Variables

The demo controls need API access to create pull requests and clean up. Here's how to set that up:

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add the following variables:

| Variable | What It Does | How to Get It |
|----------|--------------|---------------|
| `GITHUB_TOKEN` | Creates PRs and branches | [Create a GitHub token](https://github.com/settings/tokens) → Generate new token (classic) → Select `repo` scope |
| `LINEAR_API_KEY` | Cleans up Linear issues | [Linear Settings](https://linear.app/settings/api) → Personal API keys → Create key |

3. After adding both variables, go to **Deployments** and click **Redeploy** on the latest deployment

### Step 4: You're Ready!

Visit your Vercel URL and you're all set to run demos.

---

## Running a Demo

### Opening Demo Controls

Press **`Cmd+Shift+D`** (Mac) or **`Ctrl+Shift+D`** (Windows) to open the hidden Demo Controls panel.

You'll see two buttons:
- **Create Demo PR** - Creates a pull request with intentional bugs
- **Reset Demo** - Cleans everything up for the next demo

### Demo Flow

1. **Before the demo:** Press `Cmd+Shift+D` and click **"Reset Demo"** to ensure a clean slate
2. **During the demo:** Click **"Create Demo PR"** - this creates a PR with bugs
3. **Show Macroscope:** The PR will appear in GitHub. Show how Macroscope reviews it and catches the bugs
4. **After the demo:** Click **"Reset Demo"** to clean up

### What Bugs Does It Create?

The demo PR introduces two realistic bugs that Macroscope should catch:

| Bug | What Happens | What It Should Do |
|-----|--------------|-------------------|
| **Delete Bug** | Clicking delete removes everything EXCEPT the clicked task | Should only delete the clicked task |
| **Checkbox Bug** | Clicking a checkbox doesn't visually update | Should toggle the checkbox on/off |

These are real coding mistakes that developers make, and they demonstrate Macroscope's ability to catch subtle bugs.

---

## Shared Resources

**Linear Project:** All sales reps share the same "Web-Demo" project in Linear. When you click "Reset Demo", it cleans up issues created by any demo in this shared project.

**GitHub Repository:** Each rep should fork their own copy to avoid conflicts.

---

## Troubleshooting

### "Create Demo PR" fails

- **Check your GitHub token:** Make sure you created a token with `repo` scope and added it to Vercel
- **Redeploy after adding variables:** Environment variables require a redeployment to take effect

### "Reset Demo" fails

- **Check both tokens:** The reset needs both `GITHUB_TOKEN` and `LINEAR_API_KEY`
- **Linear API key:** Make sure you created a Personal API key in Linear settings

### Demo controls don't appear

- **Use the keyboard shortcut:** Press `Cmd+Shift+D` (Mac) or `Ctrl+Shift+D` (Windows)
- **Try refreshing:** If it still doesn't work, try a hard refresh (`Cmd+Shift+R`)

### Need help?

Reach out in the #sales-engineering Slack channel.

---

## How the App Works

TaskFlow is a simple to-do list app where you can:
- Add tasks by typing and pressing Enter
- Mark tasks complete by clicking the checkbox
- Delete tasks by hovering and clicking the trash icon
- Filter between All, Active, and Completed tasks

The app stores tasks in your browser, so they persist between page refreshes.

---

## For Developers

<details>
<summary>Click to expand technical details</summary>

### Tech Stack
- Next.js 14 (App Router)
- React 18 with TypeScript
- Tailwind CSS
- Lucide React icons

### Project Structure
```
taskflow/
├── app/
│   ├── api/demo/          # Demo control API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main app component
├── components/
│   └── DemoControls.tsx   # Hidden admin panel
├── scripts/
│   ├── create-demo.sh     # CLI script for creating demos
│   └── reset-demo.sh      # CLI script for resetting demos
└── types/
    └── task.ts            # TypeScript interfaces
```

### Local Development

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env.local` file:
```
GITHUB_TOKEN=your_token_here
LINEAR_API_KEY=your_key_here
```

</details>
