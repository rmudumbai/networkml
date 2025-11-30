# Network Analysis Dashboard

A modern, enterprise-grade network analysis dashboard built with React, Vite, Tailwind CSS, and GCP Cloud Run backend. Features a dark theme, comprehensive navigation, real-time security alerts, and syslog file processing capabilities.

![Dashboard Preview](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![Vite](https://img.shields.io/badge/Vite-5-646CFF) ![License](https://img.shields.io/badge/license-MIT-green)

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
- **Vite 5**: Next-generation frontend build tool
- **Tailwind CSS 3**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Firebase SDK**: Firestore database and Cloud Storage
- **GCP Cloud Run**: Backend API service

## 📦 Installation & Setup

### Prerequisites

**Node.js is required to run this application.** If you don't have Node.js installed:

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

**Verify installation:**
```bash
node --version  # Should show v18 or higher
npm --version   # Should show v9 or higher
```

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/rmudumbai/networkml.git
cd NetworkML
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your GCP credentials
# See "GCP Configuration" section below
```

4. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## ☁️ GCP Configuration

### Required GCP Resources

1. **Firebase Project**
   - Create a project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Cloud Storage

2. **Cloud Run Service** (Optional for full backend)
   - Deploy your backend API to Cloud Run
   - Note the service URL

3. **Environment Variables**

Edit `.env` file with your credentials:

```bash
# Firebase Configuration (from Firebase Console > Project Settings)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# GCP Configuration
VITE_GCP_PROJECT_ID=your-project-id
VITE_GCS_BUCKET_NAME=your-bucket-name
VITE_CLOUD_RUN_URL=https://your-service-xxxxx-uc.a.run.app

# Firestore Collections (default values shown)
VITE_FIRESTORE_ALERTS_COLLECTION=alerts
VITE_FIRESTORE_SETTINGS_COLLECTION=settings
VITE_FIRESTORE_METRICS_COLLECTION=metrics
```

### Firestore Setup

Create the following collections in Firestore:

1. **alerts** - Security alerts
   ```javascript
   {
     severity: 'high' | 'medium' | 'low',
     title: string,
     description: string,
     timestamp: timestamp,
     color: 'red' | 'yellow' | 'blue',
     icon: string
   }
   ```

2. **settings** - Application settings
   ```javascript
   {
     apiEndpoint: string,
     apiKey: string,
     model: string,
     updatedAt: timestamp
   }
   ```

3. **metrics** - Network metrics
   ```javascript
   {
     trafficLoad: number,
     activeConnections: number,
     timestamp: timestamp
   }
   ```

## 🎨 Design Specifications

### Color Palette
- **Background**: `#0a0a0a` (gray-950)
- **Cards/Sidebar**: `#111827` (gray-900)
- **Primary Accent**: `#2563eb` (blue-600)
- **Text Primary**: `#e5e7eb` (gray-200)
- **Text Secondary**: `#9ca3af` (gray-400)

### Spacing Scale
Consistent Tailwind spacing: `p-4`, `p-6`, `gap-6`, `m-2`

### Icon Sizes
- Navigation: `h-5 w-5`
- Content Cards: `h-6 w-6`
- Large Icons: `h-8 w-8`, `h-16 w-16`

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: Stacked vertical layout
- **Tablet**: 2-column grid
- **Desktop**: Full 3-column grid with sidebar

## 📄 File Structure

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

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests (when configured)

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add navigation item to `navItems` array in `Sidebar.jsx`
3. Add case to `renderPage()` switch statement in `App.jsx`

### Modifying Alert Types

Edit the mock data in `SecurityAlertFeed.jsx` or populate Firestore with real alerts.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon library
- Google Cloud Platform for backend infrastructure

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for enterprise network monitoring**

