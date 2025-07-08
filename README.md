# 📰 NewsHub - Ultimate News Aggregator

A stunning, modern news aggregation platform built with the MERN stack featuring beautiful UI/UX, real-time news updates, and user authentication.

![NewsHub](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=NewsHub+-+Ultimate+News+Experience)

## ✨ Features

### 🎨 **Beautiful UI/UX**
- Modern glassmorphism design with gradient backgrounds
- Dark/Light mode support
- Smooth animations and transitions
- Responsive design for all devices
- Custom loading animations

### 📰 **News Features**
- Real-time news from GNews API
- Multiple categories (Technology, Business, Sports, Health, Science, Entertainment)
- Advanced search functionality
- Save favorite articles
- Read later functionality

### 🔐 **Authentication**
- Secure user registration and login
- JWT token-based authentication
- Protected routes
- User session management

### 🎯 **Dashboard**
- Personalized news dashboard
- Reading statistics
- Quick actions panel
- Recent news overview
- Activity tracking

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### APIs
- **GNews API** - Real-time news data
- **MongoDB Atlas** - Cloud database

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- GNews API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd news
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GNEWS_API_KEY=your_gnews_api_key
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create `.env` file in client directory:
```env
VITE_API_BASE=http://localhost:5000/api
```

### 4. Start the Application
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### News
- `GET /api/news` - Fetch news articles
  - Query params: `q` (search), `category`, `max` (limit)

### Articles (Protected)
- `GET /api/articles` - Get user articles
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

## 🎨 UI Components

### Core Components
- **Layout** - Main application layout with sidebar
- **Dashboard** - User dashboard with stats
- **NewsHeadlines** - News listing with filters
- **ArticleList** - User articles management
- **ArticleForm** - Create/edit articles
- **LoadingSpinner** - Beautiful loading animations

### Design Features
- **Glassmorphism cards** with backdrop blur
- **Gradient backgrounds** and buttons
- **Smooth animations** and transitions
- **Custom scrollbar** styling
- **Responsive grid layouts**
- **Interactive hover effects**

## 📱 Screenshots

### Login Page
Beautiful gradient background with glassmorphism login form

### Dashboard
Comprehensive dashboard with statistics, recent news, and quick actions

### News Headlines
Grid layout with category filters, search, and beautiful news cards

### Responsive Design
Fully responsive across all devices

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/newsdb
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
GNEWS_API_KEY=your_gnews_api_key_from_gnews.io
```

#### Client (.env)
```env
VITE_API_BASE=http://localhost:5000/api
```

### MongoDB Setup
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string

### GNews API Setup
1. Sign up at [GNews.io](https://gnews.io)
2. Get free API key
3. Add to environment variables

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Heroku/Railway)
```bash
# Add environment variables
# Deploy using Git or CLI
```

### Environment Variables for Production
Update API base URL in client `.env`:
```env
VITE_API_BASE=https://your-backend-url.com/api
```

## 🎯 Features in Detail

### Authentication System
- Secure password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Automatic token refresh

### News Aggregation
- Real-time news from multiple sources
- Category-based filtering
- Advanced search functionality
- Article caching for performance

### User Experience
- Intuitive navigation
- Beautiful loading states
- Error handling with toast notifications
- Responsive design patterns

## 🚀 Deployment

### Frontend Deployment (GitHub Pages)

The frontend is configured for easy deployment to GitHub Pages:

1. **Quick Deploy**:
   ```powershell
   # Run the deployment script
   .\deploy.ps1
   ```

2. **Manual Deploy**:
   ```powershell
   cd client
   npm run deploy
   ```

3. **Configure for your repository**:
   - Update `homepage` in `client/package.json`
   - Update `base` in `client/vite.config.js`
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions

### Backend Deployment

The backend needs to be deployed separately to services like:
- **Render** (Free tier available)
- **Railway** (Free tier available) 
- **Vercel** (Free tier available)
- **Heroku** (Paid)

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GNews API](https://gnews.io) for news data
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for beautiful icons
- [MongoDB Atlas](https://cloud.mongodb.com) for database hosting

---

**Built with ❤️ using the MERN Stack**

*NewsHub - Your Ultimate News Experience* 🚀
