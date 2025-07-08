# GitHub Pages Deployment Script for NewsHub
# Run this script from the project root directory

Write-Host "🚀 Starting GitHub Pages deployment..." -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "client")) {
    Write-Host "❌ Error: Please run this script from the project root directory (where client folder is located)" -ForegroundColor Red
    exit 1
}

# Navigate to client directory
Set-Location client

Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

Write-Host "🔨 Building the application..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "🚀 Deploying to GitHub Pages..." -ForegroundColor Blue
    npm run deploy
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Deployment successful!" -ForegroundColor Green
        Write-Host "Your app should be available at your GitHub Pages URL in a few minutes." -ForegroundColor Yellow
    } else {
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✨ Done!" -ForegroundColor Green
