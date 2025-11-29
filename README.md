# Network Analysis Dashboard

A modern, enterprise-grade network analysis dashboard built with React and Tailwind CSS. Features a dark theme, comprehensive navigation, and multiple functional pages for network monitoring and management.

![Dashboard Preview](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

### Enterprise Design System
- **Dark Theme**: Consistent styling with `bg-gray-950` main background and blue accents
- **Responsive Layout**: Grid-based layout that adapts to different screen sizes
- **Modern Icons**: Lucide icon library with uniform sizing
- **Professional Typography**: Clean, readable text with proper contrast

### Dashboard Components

#### 📊 Dashboard Overview
- Real-time traffic load metrics
- Active connections monitoring
- Security alert feed with color-coded severity levels
- Network health topology visualization

#### 🔒 Security Alerts
- 5 severity-based alert types (High, Medium, Low)
- Real-time alert feed with timestamps
- Detailed descriptions and actionable insights

#### 📤 Syslog Uploader
- Drag-and-drop file upload interface
- File type validation (`.log`, `.txt`)
- Upload progress tracking
- File management (add/remove files)

#### ⚙️ LLM API Settings
- API endpoint configuration
- Secure API key management with show/hide toggle
- Model selection (GPT-4, Claude 3, etc.)
- Connection testing capabilities

#### 📈 Traffic Insights
- Placeholder for detailed traffic analysis
- Ready for integration with analytics backend

## 🛠️ Technical Stack

- **React 18**: Component-based UI framework (loaded via CDN)
- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN)
- **Lucide Icons**: Modern icon library
- **Babel Standalone**: JSX transformation in browser

## 📦 Installation & Usage

### Quick Start

No installation required! Simply open the HTML file in your browser:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/NetworkML.git

# Navigate to the directory
cd NetworkML

# Open in browser
open network-dashboard.html
```

Or double-click `network-dashboard.html` in your file explorer.

### Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

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

## 🔧 Customization

### Changing Colors

Edit the Tailwind config in the `<head>` section:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Add your custom colors here
            }
        }
    }
}
```

### Adding New Pages

1. Create a new page component function
2. Add navigation item to `navItems` array in `Sidebar`
3. Add case to `renderPage()` switch statement in `App`

### Modifying Alert Types

Edit the `alerts` array in `SecurityAlertFeed` component:

```javascript
const alerts = [
    {
        severity: 'high',
        icon: 'alert-triangle',
        title: 'Your Alert Title',
        description: 'Alert description',
        time: 'timestamp',
        color: 'red'
    },
    // Add more alerts...
];
```

## 🚦 Navigation

- **Dashboard**: Main overview with metrics and alerts
- **Traffic Insights**: Detailed traffic analysis (placeholder)
- **Security Alerts**: Full security alert feed
- **Syslog Uploader**: File upload interface
- **Settings**: LLM API configuration

## 📄 File Structure

```
NetworkML/
└── network-dashboard.html    # Complete standalone dashboard
```

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
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon library

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for enterprise network monitoring**
