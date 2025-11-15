# Frameboard Deployment Guide

## Architecture Overview

Frameboard consists of two separate applications:
1. **Frontend (Next.js)** - Deploy to Vercel
2. **Backend (Express API)** - Deploy to Railway, Render, or similar

---

## Step 1: Deploy Frontend to Vercel

### On Vercel Dashboard:

1. **Project Name**: Change to `frameboard` (lowercase)
2. **Root Directory**: Set to `client`
3. **Framework Preset**: Next.js (auto-detected)
4. **Build Command**: `pnpm build`
5. **Output Directory**: `.next` (auto-detected)
6. **Install Command**: `pnpm install`

### Environment Variables to Add on Vercel:

Click "Environment Variables" and add:

```
NEXT_PUBLIC_API_URL = [Your backend URL from Step 2]
```

**Note**: Leave this blank for now. We'll add it after deploying the backend in Step 2.

### Deploy Frontend:
- Click "Deploy"
- Wait for build to complete
- You'll get a URL like: `https://frameboard.vercel.app`

---

## Step 2: Deploy Backend API

### Option A: Deploy to Railway (Recommended - Easy)

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `Frameboard` repository
4. **Important**: Set Root Directory to `/` (root folder, not client)
5. **Build Command**: `pnpm build`
6. **Start Command**: `node dist/index.js`

### Environment Variables for Railway:

Add these in Railway's "Variables" tab:

```
ANTHROPIC_API_KEY = your_anthropic_api_key_here
PORT = 3001
MONGODB_URI = mongodb://localhost:27017/frameboard
FRONTEND_URL = https://frameboard.vercel.app
NODE_ENV = production
```

**Note**: Get your Anthropic API key from your local `.env` file or from https://console.anthropic.com/

**Important**: After deployment, Railway will give you a URL like:
`https://frameboard-production.up.railway.app`

### Option B: Deploy to Render

1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. **Root Directory**: `/`
5. **Build Command**: `pnpm install && pnpm build`
6. **Start Command**: `node dist/index.js`
7. Add the same environment variables as Railway

---

## Step 3: Connect Frontend to Backend

1. Go back to **Vercel** dashboard
2. Go to your `frameboard` project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` with your backend URL:
   ```
   NEXT_PUBLIC_API_URL = https://frameboard-production.up.railway.app
   ```
4. **Redeploy** the frontend (Deployments tab → click "..." → Redeploy)

---

## Step 4: Update Backend CORS

The backend needs to allow requests from your Vercel frontend URL.

This is already configured in `src/index.ts`:
```typescript
cors: {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST']
}
```

Just make sure `FRONTEND_URL` environment variable is set on Railway/Render to your Vercel URL.

---

## Step 5: Test the Deployment

1. Visit your Vercel URL: `https://frameboard.vercel.app`
2. Go to Portal → Call Sheet
3. Try generating a call sheet
4. Check if Excel file downloads properly

---

## GoDaddy Integration (Optional)

### Custom Domain Setup:

If you want to use your GoDaddy domain (e.g., `frameboard.com`):

1. **On Vercel**:
   - Go to Settings → Domains
   - Add your domain: `frameboard.com` and `www.frameboard.com`
   - Vercel will give you DNS records to add

2. **On GoDaddy**:
   - Go to DNS Management
   - Add the A/CNAME records Vercel provides
   - Wait 24-48 hours for DNS propagation

3. **API Subdomain** (optional):
   - On Railway/Render, you can add custom domain `api.frameboard.com`
   - Add CNAME record on GoDaddy pointing to Railway's URL

---

## Troubleshooting

### Build Fails on Vercel
- Check that Root Directory is set to `client`
- Verify `pnpm-lock.yaml` exists in client folder

### Backend API Not Responding
- Check Railway/Render logs for errors
- Verify environment variables are set correctly
- Ensure PORT is set to 3001 or use Railway's auto-assigned PORT

### CORS Errors
- Make sure FRONTEND_URL on backend matches your Vercel URL exactly
- Check that both HTTP and HTTPS are handled

### Call Sheet Generation Fails
- Verify ANTHROPIC_API_KEY is set on backend
- Check backend logs for API errors

---

## Cost Breakdown

- **Vercel**: Free tier (sufficient for your needs)
- **Railway**: $5/month after free trial (~500 hours/month free)
- **Render**: Free tier available (spins down after inactivity)

**Recommended**: Use Vercel (free) + Railway ($5/month) for best performance.

---

## Next Steps After Deployment

1. Set up MongoDB Atlas (free tier) instead of localhost
2. Configure production error logging
3. Set up analytics
4. Add user authentication
5. Configure email notifications

---

## Files Modified for Deployment

- `client/vercel.json` - Vercel configuration
- `client/.env.local` - Local environment variables
- `client/src/app/portal/callsheet/page.tsx` - Updated to use environment variable for API URL
