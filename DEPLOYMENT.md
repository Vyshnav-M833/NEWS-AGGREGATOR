# 🚀 GitHub Pages Deployment Guide

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git Installed**: Ensure Git is installed on your machine
3. **Node.js**: Make sure Node.js is installed

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `news-aggregator` or `newshub`
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README, .gitignore, or license (we already have these)

### 2. Configure Your Repository

1. **Update package.json homepage**:
   - Open `client/package.json`
   - Replace `YOUR_USERNAME` with your GitHub username
   - Replace `YOUR_REPOSITORY_NAME` with your repository name
   ```json
   "homepage": "https://yourusername.github.io/news-aggregator"
   ```

2. **Update vite.config.js base**:
   - Open `client/vite.config.js`
   - Replace `YOUR_REPOSITORY_NAME` with your repository name
   ```javascript
   base: '/news-aggregator/'
   ```

### 3. Connect Local Repository to GitHub

```powershell
# Navigate to your project root
cd "d:\MERN-FINAL\news"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - News Aggregator App"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/yourusername/news-aggregator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Deploy to GitHub Pages

```powershell
# Navigate to client directory
cd "d:\MERN-FINAL\news\client"

# Build and deploy
npm run deploy
```

### 5. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Click **Save**

### 6. Backend Deployment (Separate)

⚠️ **Important**: GitHub Pages only hosts static files. You'll need a separate service for your backend:

**Recommended Backend Hosting Options:**
- **Render** (Free tier available)
- **Railway** (Free tier available)
- **Vercel** (Free tier available)
- **Heroku** (Paid)
- **DigitalOcean** (Paid)

**Steps for Backend Deployment:**
1. Choose a hosting service
2. Deploy your `server` folder
3. Update `client/.env.production` with your backend URL
4. Redeploy frontend with `npm run deploy`

### 7. Update Environment Variables

Once your backend is deployed:

1. **Update Production Environment**:
   ```env
   # client/.env.production
   VITE_API_BASE=https://your-backend-url.com/api
   ```

2. **Redeploy Frontend**:
   ```powershell
   cd "d:\MERN-FINAL\news\client"
   npm run deploy
   ```

## 🔧 Available Scripts

In the client directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Build and deploy to GitHub Pages

## 🌐 Access Your App

After deployment, your app will be available at:
`https://yourusername.github.io/repositoryname`

## 🐛 Troubleshooting

### Common Issues:

1. **404 on Refresh**: This is normal for SPAs on GitHub Pages. The 404.html handles routing.

2. **Assets Not Loading**: Make sure the `base` in vite.config.js matches your repository name.

3. **API Errors**: Your backend needs to be deployed separately. Update .env.production with the correct backend URL.

4. **Build Fails**: Check that all dependencies are installed:
   ```powershell
   npm install
   ```

### Update Deployment:

To update your deployed app:
```powershell
cd "d:\MERN-FINAL\news\client"
npm run deploy
```

## 📝 Notes

- The frontend will work without the backend, but login/authentication features won't function
- News headlines from the GNews API will work if you configure the API properly
- For full functionality, deploy the backend to a service like Render or Railway
- Remember to update CORS settings in your backend for your new frontend URL
