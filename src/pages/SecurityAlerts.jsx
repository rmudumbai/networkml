import Header from '../components/layout/Header'
import SecurityAlertFeed from '../components/ui/SecurityAlertFeed'

const SecurityAlerts = () => {
    return (
        <div>
            <Header title="Security Alerts" />
            <div className="p-6">
                <SecurityAlertFeed />
            </div>
        </div>
    )
}

export default SecurityAlerts
