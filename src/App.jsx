import { useState, useEffect } from 'react'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import TrafficInsights from './pages/TrafficInsights'
import SecurityAlerts from './pages/SecurityAlerts'
import SyslogUploader from './pages/SyslogUploader'
import Settings from './pages/Settings'

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard')

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />
            case 'traffic':
                return <TrafficInsights />
            case 'security':
                return <SecurityAlerts />
            case 'uploader':
                return <SyslogUploader />
            case 'settings':
                return <Settings />
            default:
                return <Dashboard />
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-950">
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
            <div className="ml-64 flex-1">
                {renderPage()}
            </div>
        </div>
    )
}

export default App
