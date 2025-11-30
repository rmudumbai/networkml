import {
    LayoutDashboard,
    Activity,
    ShieldAlert,
    Upload,
    Settings as SettingsIcon,
    Globe
} from 'lucide-react'

const Sidebar = ({ currentPage, onNavigate }) => {
    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'traffic', icon: Activity, label: 'Traffic Insights' },
        { id: 'security', icon: ShieldAlert, label: 'Security Alerts' },
        { id: 'uploader', icon: Upload, label: 'Syslog Uploader' },
        { id: 'settings', icon: SettingsIcon, label: 'Settings' },
    ]

    return (
        <div className="w-64 bg-gray-900 h-screen fixed left-0 top-0 border-r border-gray-800">
            {/* Logo/Title */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <Globe className="h-8 w-8 text-blue-500" />
                    <h1 className="text-2xl font-bold text-gray-100">NetAnalyze</h1>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {navItems.map(item => {
                        const Icon = item.icon
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
