import Header from '../components/layout/Header'
import SummaryCard from '../components/ui/SummaryCard'
import SecurityAlertFeed from '../components/ui/SecurityAlertFeed'
import NetworkTopologyMap from '../components/ui/NetworkTopologyMap'
import { Activity, Link } from 'lucide-react'

const Dashboard = () => {
    return (
        <div>
            <Header title="Dashboard Overview" />
            <div className="p-6 space-y-6">
                {/* Row 1: Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SummaryCard
                        icon={Activity}
                        title="Real-Time Traffic Load"
                        value="1,234 Mbps"
                        trend="↑ 12% from last hour"
                    />
                    <SummaryCard
                        icon={Link}
                        title="Active Connections"
                        value="2,345"
                        trend="↓ 3% from last hour"
                    />
                </div>

                {/* Row 2: Security Alerts & Topology */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <SecurityAlertFeed />
                    </div>
                    <div className="lg:col-span-1">
                        <NetworkTopologyMap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
