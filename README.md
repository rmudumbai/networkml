# Network Analysis Dashboard

A modern, enterprise-grade network analysis dashboard built with React, Vite, Tailwind CSS, and GCP Cloud Run backend. Features a dark theme, comprehensive navigation, real-time security alerts, and syslog file processing capabilities.

![Dashboard Preview](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![Vite](https://img.shields.io/badge/Vite-5-646CFF) ![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents

- [Features](#-features)
- [Technical Stack](#️-technical-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [GCP Configuration](#️-gcp-configuration)
- [Running the Application](#-running-the-application)
- [Usage Guide](#-usage-guide)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🚀 Features

### Enterprise Design System
- **Dark Theme**: Consistent styling with `bg-gray-950` main background and blue accents
- **Responsive Layout**: Grid-based layout that adapts to different screen sizes
- **Lucide Icons**: Modern icon library with uniform sizing
- **Professional Typography**: Clean, readable text with proper contrast
- **Tailwind Spacing Scale**: Strict adherence to spacing scale (`p-4`, `p-6`, `gap-6`)

### Dashboard Components

#### 📊 Dashboard Overview
- Real-time traffic load metrics
- Active connections monitoring
- Security alert feed with color-coded severity levels
- Network health topology visualization

#### 🔒 Security Alerts
- Real-time alerts from Firestore
- 3 severity-based alert types (High, Medium, Low)
- Color-coded indicators (red, yellow, blue)
- Detailed descriptions and timestamps

#### 📤 Syslog Uploader
- Drag-and-drop file upload interface
- File type validation (`.log`, `.txt`)
- Upload to Google Cloud Storage
- Progress tracking and status updates
- Backend notification for processing

#### ⚙️ LLM API Settings
- API endpoint configuration
- Secure API key management with show/hide toggle
- Model selection (GPT-4, Claude 3, etc.)
- Firestore persistence
- Connection testing capabilities

#### 📈 Traffic Insights
- Placeholder for detailed traffic analysis
- Ready for integration with analytics backend

## 🛠️ Technical Stack

- **React 18**: Component-based UI framework
- **Vite 5**: Next-generation frontend build tool with Hot Module Replacement (HMR)
- **Tailwind CSS 3**: Utility-first CSS framework
- **Lucide React**: Modern icon library with 1000+ icons
- **Firebase SDK**: Firestore database and Cloud Storage
- **GCP Cloud Run**: Serverless backend API service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   - **macOS**: 
     ```bash
     # Using Homebrew (recommended)
     brew install node
     
     # Or download from https://nodejs.org/
     ```
   - **Windows**: Download from [nodejs.org](https://nodejs.org/)
   - **Linux**: 
     ```bash
     # Ubuntu/Debian
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     
     # Fedora
     sudo dnf install nodejs
     ```

2. **Git** (for cloning the repository)
   ```bash
   # macOS
   brew install git
   
   # Windows: Download from https://git-scm.com/
   
   # Linux
   sudo apt-get install git  # Ubuntu/Debian
   sudo dnf install git      # Fedora
   ```

3. **Verify Installation**
   ```bash
   node --version  # Should show v18.0.0 or higher
   npm --version   # Should show v9.0.0 or higher
   git --version   # Should show git version 2.x.x
   ```

### Optional (for GCP Integration)

- **Google Cloud Account**: For Firebase, Firestore, and Cloud Storage
- **Firebase CLI**: For managing Firebase projects
  ```bash
  npm install -g firebase-tools
  ```

## 📦 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/rmudumbai/networkml.git
cd networkml
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~269 packages):
- React and React DOM
- Vite and plugins
- Tailwind CSS and PostCSS
- Lucide React icons
- Firebase SDK
- Development tools

**Expected output:**
```
added 269 packages, and audited 270 packages in 2m
```

### Step 3: Configure Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your credentials:**
   ```bash
   # Use your preferred editor
   nano .env
   # or
   code .env
   # or
   vim .env
   ```

3. **Fill in the required values** (see [GCP Configuration](#️-gcp-configuration) section below)

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.4.21  ready in 474 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

The application will automatically open in your default browser at `http://localhost:5173/`

## ☁️ GCP Configuration

### Option 1: Run Without GCP (Development Mode)

The application will work with mock data if GCP is not configured. This is perfect for:
- Local development
- UI/UX testing
- Learning the codebase

Simply leave the `.env` file with empty values and the app will use fallback mock data.

### Option 2: Full GCP Integration (Production Mode)

#### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "network-analysis-dashboard")
4. Follow the setup wizard
5. Once created, click on the project

#### Step 2: Enable Firestore Database

1. In Firebase Console, click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in production mode" or "Test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Enable"

#### Step 3: Enable Cloud Storage

1. In Firebase Console, click "Storage" in the left menu
2. Click "Get started"
3. Review security rules
4. Click "Done"

#### Step 4: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register your app with a nickname (e.g., "Network Dashboard")
6. Copy the configuration values

#### Step 5: Create Cloud Storage Bucket

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to "Cloud Storage" > "Buckets"
4. Create a new bucket or note the existing Firebase bucket name
5. Set appropriate permissions

#### Step 6: Update Environment Variables

Edit your `.env` file with the values from Firebase:

```bash
# Firebase Configuration (from Firebase Console > Project Settings)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# GCP Configuration
VITE_GCP_PROJECT_ID=your-project-id
VITE_GCS_BUCKET_NAME=your-project.appspot.com
VITE_CLOUD_RUN_URL=https://your-service-xxxxx-uc.a.run.app

# Firestore Collections (default values shown)
VITE_FIRESTORE_ALERTS_COLLECTION=alerts
VITE_FIRESTORE_SETTINGS_COLLECTION=settings
VITE_FIRESTORE_METRICS_COLLECTION=metrics
```

#### Step 7: Set Up Firestore Collections

You can create collections manually or they will be created automatically when data is first written.

**Manual Setup via Firebase Console:**

1. Go to Firestore Database
2. Click "Start collection"
3. Create these collections:

**Collection: `alerts`**
```javascript
{
  severity: 'high',
  title: 'Unusual Traffic Pattern Detected',
  description: 'Spike in outbound connections from 192.168.1.45',
  timestamp: Timestamp.now(),
  color: 'red',
  icon: 'alert-triangle',
  time: '2 minutes ago'
}
```

**Collection: `settings`**
```javascript
{
  apiEndpoint: 'https://api.openai.com/v1',
  apiKey: 'sk-...',
  model: 'gpt-4',
  updatedAt: Timestamp.now()
}
```

**Collection: `metrics`**
```javascript
{
  trafficLoad: 1234,
  activeConnections: 2345,
  timestamp: Timestamp.now()
}
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Features:
- Hot Module Replacement (HMR) - changes reflect instantly
- Source maps for debugging
- Fast refresh
- Development error overlay

### Production Build

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist/` folder.

### Production Build Stats

```
dist/index.html                   0.53 kB │ gzip:  0.32 kB
dist/assets/index-abc123.css     12.45 kB │ gzip:  3.21 kB
dist/assets/index-def456.js     156.78 kB │ gzip: 52.34 kB
```

## 📖 Usage Guide

### Navigating the Dashboard

1. **Sidebar Navigation**: Click any menu item to switch pages
   - Dashboard: Overview with metrics and alerts
   - Traffic Insights: Traffic analysis (placeholder)
   - Security Alerts: Full alert feed
   - Syslog Uploader: File upload interface
   - Settings: LLM API configuration

2. **Dashboard Page**:
   - View real-time metrics in the top cards
   - Monitor security alerts in the feed
   - Check network health in the topology map

3. **Uploading Syslog Files**:
   - Navigate to "Syslog Uploader"
   - Drag and drop `.log` or `.txt` files
   - Or click "Browse Files" to select files
   - Click "Process Files" to upload to GCS
   - Files are automatically sent to backend for processing

4. **Configuring LLM Settings**:
   - Navigate to "Settings"
   - Enter your API endpoint
   - Add your API key (click eye icon to show/hide)
   - Select your preferred model
   - Click "Save Configuration"
   - Settings are persisted in Firestore

### Keyboard Shortcuts

- `h` + `Enter`: Show Vite dev server help
- `r` + `Enter`: Restart dev server
- `u` + `Enter`: Show server URL
- `o` + `Enter`: Open in browser
- `q` + `Enter`: Quit dev server

## 🔧 Development

### Project Structure

```
NetworkML/
├── index.html                      # Vite entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── .env                            # Environment variables (gitignored)
├── .env.example                    # Environment template
├── network-dashboard.html          # Legacy standalone version
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Main app component
│   ├── index.css                   # Global styles
│   ├── config/
│   │   └── firebase.js             # Firebase configuration
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   └── Header.jsx          # Page header
│   │   └── ui/
│   │       ├── SummaryCard.jsx     # Metric card component
│   │       ├── SecurityAlertFeed.jsx  # Alert feed component
│   │       └── NetworkTopologyMap.jsx # Network visualization
│   ├── pages/
│   │   ├── Dashboard.jsx           # Dashboard page
│   │   ├── TrafficInsights.jsx     # Traffic analysis page
│   │   ├── SecurityAlerts.jsx      # Security alerts page
│   │   ├── SyslogUploader.jsx      # File upload page
│   │   └── Settings.jsx            # Settings page
│   └── services/
│       ├── api.js                  # Cloud Run API service
│       ├── storage.js              # GCS storage service
│       ├── firestore.js            # Firestore database service
│       └── auth.js                 # Authentication service
└── README.md
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run tests (when configured) |

### Adding New Features

#### Adding a New Page

1. **Create the page component:**
   ```bash
   touch src/pages/NewPage.jsx
   ```

2. **Implement the component:**
   ```jsx
   import Header from '../components/layout/Header'
   
   const NewPage = () => {
     return (
       <div>
         <Header title="New Page" />
         <div className="p-6">
           {/* Your content here */}
         </div>
       </div>
     )
   }
   
   export default NewPage
   ```

3. **Add to navigation in `Sidebar.jsx`:**
   ```jsx
   const navItems = [
     // ... existing items
     { id: 'newpage', icon: YourIcon, label: 'New Page' },
   ]
   ```

4. **Add route in `App.jsx`:**
   ```jsx
   import NewPage from './pages/NewPage'
   
   const renderPage = () => {
     switch (currentPage) {
       // ... existing cases
       case 'newpage':
         return <NewPage />
       // ...
     }
   }
   ```

#### Adding a New UI Component

1. **Create the component file:**
   ```bash
   touch src/components/ui/NewComponent.jsx
   ```

2. **Follow the design system:**
   ```jsx
   const NewComponent = ({ title, data }) => {
     return (
       <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
         <h3 className="text-xl font-bold text-gray-100 mb-4">{title}</h3>
         {/* Component content */}
       </div>
     )
   }
   
   export default NewComponent
   ```

### Design System Guidelines

#### Color Palette
- **Background**: `bg-gray-950` (#0a0a0a)
- **Cards/Sidebar**: `bg-gray-900` (#111827)
- **Borders**: `border-gray-800`
- **Primary Accent**: `bg-blue-600` (#2563eb)
- **Text Primary**: `text-gray-100` (#e5e7eb)
- **Text Secondary**: `text-gray-400` (#9ca3af)

#### Spacing Scale
Always use Tailwind's spacing scale:
- Padding: `p-4`, `p-6`, `px-4`, `py-3`
- Margins: `m-2`, `mb-4`, `mt-6`
- Gaps: `gap-3`, `gap-6`
- Space: `space-y-2`, `space-y-6`

#### Icon Sizes
- Navigation icons: `h-5 w-5`
- Content icons: `h-6 w-6`
- Large icons: `h-8 w-8`
- Extra large: `h-16 w-16`

## 🚢 Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Deploy to Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Build & Deploy > Environment
- Firebase: Use `.env.production` file

## 🐛 Troubleshooting

### Common Issues

#### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

#### Issue: Firebase/Firestore errors

**Solution:**
1. Check your `.env` file has correct credentials
2. Verify Firebase project is active
3. Check Firestore security rules
4. Ensure billing is enabled (for production)

#### Issue: Module not found errors

**Solution:**
```bash
# Restart the dev server
# Press Ctrl+C to stop
npm run dev
```

#### Issue: Tailwind styles not applying

**Solution:**
1. Check `tailwind.config.js` content paths
2. Ensure `@tailwind` directives are in `index.css`
3. Restart dev server

### Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/rmudumbai/networkml/issues)
- **Documentation**: Check this README and code comments
- **Firebase Docs**: [Firebase Documentation](https://firebase.google.com/docs)
- **Vite Docs**: [Vite Documentation](https://vitejs.dev/)

## 🎨 Design Specifications

### Responsive Breakpoints

- **Mobile**: `< 768px` - Stacked vertical layout
- **Tablet**: `768px - 1024px` - 2-column grid
- **Desktop**: `> 1024px` - Full 3-column grid with sidebar

### Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Opera (latest 2 versions)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes and commit:**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to your fork:**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style

- Use functional components with hooks
- Follow existing naming conventions
- Use Tailwind classes (no custom CSS unless necessary)
- Add comments for complex logic
- Keep components small and focused

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the blazing-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Google Cloud Platform** - For backend infrastructure
- **Firebase** - For the excellent backend services

## 📧 Contact

For questions, feedback, or support:
- **GitHub Issues**: [Create an issue](https://github.com/rmudumbai/networkml/issues)
- **Repository**: [https://github.com/rmudumbai/networkml](https://github.com/rmudumbai/networkml)

---

**Built with ❤️ for enterprise network monitoring**

### Quick Links

- [Live Demo](#) (Coming soon)
- [Documentation](#-table-of-contents)
- [Report Bug](https://github.com/rmudumbai/networkml/issues)
- [Request Feature](https://github.com/rmudumbai/networkml/issues)

---

**Version**: 1.0.0  
**Last Updated**: November 2025
