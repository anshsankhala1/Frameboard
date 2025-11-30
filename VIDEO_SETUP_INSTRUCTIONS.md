# Video Hero Setup Instructions

## ✅ What I've Built

I've created a full-screen cinematic video hero for your homepage with:

- **Full-screen video background** (like Anduril's website)
- **Smooth scroll transition** to your content below
- **Transparent header** that becomes solid when scrolling
- **Dark overlay** for text readability
- **Animated bouncing scroll indicator**
- **Mobile responsive** with fallback poster image
- **Auto-play, looping, muted** video

## 📁 How to Add Your Video

### Step 1: Prepare Your Video Files

1. **Optimal video specs:**
   - Resolution: 1920x1080 (Full HD) or 2560x1440 (2K)
   - Duration: 10-30 seconds (loops seamlessly)
   - File size: Under 10MB recommended (or use a CDN)
   - Format: MP4 (H.264 codec)

2. **Optional: Create a WebM version** for better compression:
   - Use a tool like [CloudConvert](https://cloudconvert.com/mp4-to-webm)
   - This is optional but recommended for faster loading

3. **Create a poster image** (thumbnail shown before video loads):
   - Take a screenshot from your video
   - Save as JPG
   - Same resolution as your video

### Step 2: Add Files to Your Project

Place your video files in the `public` folder:

```
/Users/anshsankhala/Frameboard/client/public/
├── hero-video.mp4     ← Your main video file
├── hero-video.webm    ← Optional: WebM version for better compression
└── hero-poster.jpg    ← Poster image (thumbnail)
```

**Example commands:**
```bash
# Navigate to public folder
cd /Users/anshsankhala/Frameboard/client/public

# Copy your video file here
# (Replace /path/to/your/video.mp4 with your actual video path)
cp /path/to/your/video.mp4 ./hero-video.mp4

# Optional: Copy WebM version
cp /path/to/your/video.webm ./hero-video.webm

# Copy poster image
cp /path/to/your/poster.jpg ./hero-poster.jpg
```

### Step 3: Test Locally

```bash
# Start your development server
cd /Users/anshsankhala/Frameboard
pnpm dev
```

Visit http://localhost:3000 and you should see:
- Video playing in the background
- White text overlay with your branding
- Smooth animations
- Bouncing scroll indicator

### Step 4: Optimize for Production

**If your video is larger than 10MB:**

Consider using a video hosting service:
1. Upload to [Cloudinary](https://cloudinary.com/) or [Bunny CDN](https://bunny.net/)
2. Get the video URL
3. Update the video source in `/Users/anshsankhala/Frameboard/client/src/app/components/hero.tsx`:

```tsx
<source src="https://your-cdn-url.com/hero-video.mp4" type="video/mp4" />
```

## 🎨 Customization Options

You can easily customize the video hero by editing `client/src/app/components/hero.tsx`:

### Change overlay darkness:
```tsx
// Line 45: Adjust the opacity (0.5 = 50% dark)
<div className="absolute inset-0 bg-black/50"></div>

// Examples:
// bg-black/30  = Lighter overlay
// bg-black/70  = Darker overlay
```

### Change text colors:
```tsx
// Line 57: Main heading color
<h1 className="... text-white ...">

// Line 62: Subtitle color
<p className="... text-white ...">
```

### Disable autoplay:
```tsx
// Line 33-34: Remove or set to false
autoPlay={false}
```

### Change video loop behavior:
```tsx
// Line 35: Set to false to play once
loop={false}
```

## 📱 Mobile Optimization

The video hero is already mobile-optimized:
- Uses `playsInline` for iOS support
- Shows poster image while loading
- Responsive text sizes
- Stacked buttons on mobile

## 🚀 Deploy to Vercel

Your video files will automatically be deployed with Vercel. Just make sure:
1. Video files are in `client/public/`
2. File names match what's in the code
3. Redeploy after adding the files

## ❓ Troubleshooting

**Video not playing?**
- Check browser console for errors
- Ensure video files are in `public/` folder
- Try a different video format
- Check file names match exactly

**Video too large?**
- Compress using [HandBrake](https://handbrake.fr/)
- Or use a CDN (Cloudinary, Bunny)
- Target under 10MB for best performance

**Poster image not showing?**
- Ensure `hero-poster.jpg` exists in `public/`
- Check file extension matches (jpg vs jpeg)

## 📋 Current File Structure

```
hero.tsx: Line 40 → <source src="/hero-video.mp4" type="video/mp4" />
hero.tsx: Line 41 → <source src="/hero-video.webm" type="video/webm" />
hero.tsx: Line 38 → poster="/hero-poster.jpg"
```

These paths look for files in the `public/` folder.

---

**Need help?** All the code is ready - just add your video files and it will work immediately!
