#!/bin/bash

# GitHub Pages Deployment Script for NewsHub
# Run this script from the project root directory

echo "🚀 Starting GitHub Pages deployment..."

# Check if we're in the right directory
if [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the project root directory (where client folder is located)"
    exit 1
fi

# Navigate to client directory
cd client

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Deploying to GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "Your app should be available at your GitHub Pages URL in a few minutes."
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

echo "✨ Done!"
