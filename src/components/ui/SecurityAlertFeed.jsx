import { useEffect, useState } from 'react'
import { ShieldAlert, AlertTriangle, AlertCircle, Info, Eye } from 'lucide-react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '../../config/firebase'

const SecurityAlertFeed = () => {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Real-time listener for alerts from Firestore
        const alertsCollection = import.meta.env.VITE_FIRESTORE_ALERTS_COLLECTION || 'alerts'
        const q = query(
            collection(db, alertsCollection),
            orderBy('timestamp', 'desc'),
            limit(5)
        )

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const alertsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setAlerts(alertsData)
                setLoading(false)
            },
            (error) => {
                console.error('Error fetching alerts:', error)
                // Fallback to mock data if Firestore fails
                setAlerts(getMockAlerts())
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    // Mock data for development/fallback
    const getMockAlerts = () => [
        {
            id: 1,
            severity: 'high',
            icon: 'alert-triangle',
            title: 'Unusual Traffic Pattern Detected',
            description: 'Spike in outbound connections from 192.168.1.45',
            time: '2 minutes ago',
            color: 'red'
        },
        {
            id: 2,
            severity: 'medium',
            icon: 'alert-circle',
            title: 'Failed Authentication Attempts',
            description: 'Multiple failed SSH login attempts detected',
            time: '15 minutes ago',
            color: 'orange'
        },
        {
            id: 3,
            severity: 'low',
            icon: 'info',
            title: 'Certificate Expiring Soon',
            description: 'SSL certificate expires in 14 days',
            time: '1 hour ago',
            color: 'blue'
        },
        {
            id: 4,
            severity: 'high',
            icon: 'shield-alert',
            title: 'Port Scan Detected',
            description: 'Sequential port scanning from external IP',
            time: '2 hours ago',
            color: 'red'
        },
        {
            id: 5,
            severity: 'medium',
            icon: 'alert-circle',
            title: 'Bandwidth Threshold Exceeded',
            description: 'Network utilization above 85%',
            time: '3 hours ago',
            color: 'yellow'
        }
    ]

    const getIconComponent = (iconName) => {
        const icons = {
            'alert-triangle': AlertTriangle,
            'alert-circle': AlertCircle,
            'info': Info,
            'shield-alert': ShieldAlert
        }
        return icons[iconName] || AlertCircle
    }

    // Color-coded severity tags with Tailwind colors
    const severityTagColors = {
        red: 'bg-red-500 text-white',
        orange: 'bg-orange-500 text-white',
        yellow: 'bg-yellow-500 text-gray-900',
        blue: 'bg-blue-500 text-white'
    }

    const severityBorderColors = {
        red: 'border-red-500',
        orange: 'border-orange-500',
        yellow: 'border-yellow-500',
        blue: 'border-blue-500'
    }

    const severityBgColors = {
        red: 'bg-red-500 bg-opacity-10',
        orange: 'bg-orange-500 bg-opacity-10',
        yellow: 'bg-yellow-500 bg-opacity-10',
        blue: 'bg-blue-500 bg-opacity-10'
    }

    const iconColors = {
        red: 'text-red-400',
        orange: 'text-orange-400',
        yellow: 'text-yellow-400',
        blue: 'text-blue-400'
    }

    const getSeverityLabel = (color) => {
        const labels = {
            red: 'HIGH',
            orange: 'MEDIUM',
            yellow: 'WARNING',
            blue: 'INFO'
        }
        return labels[color] || 'UNKNOWN'
    }

    // Use mock data if no alerts from Firestore
    const displayAlerts = alerts.length > 0 ? alerts : getMockAlerts()

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-gray-100">Security Alert List</h3>
            </div>
            <div className="space-y-3">
                {displayAlerts.map(alert => {
                    const IconComponent = getIconComponent(alert.icon)
                    return (
                        <div
                            key={alert.id}
                            className={`border-l-4 ${severityBorderColors[alert.color]} ${severityBgColors[alert.color]} p-4 rounded-r-lg`}
                        >
                            {/* Vertically centered row */}
                            <div className="flex items-center gap-4">
                                {/* Icon */}
                                <IconComponent className={`h-5 w-5 ${iconColors[alert.color]} flex-shrink-0`} />

                                {/* Content - flex-1 to take available space */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {/* Severity Tag */}
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${severityTagColors[alert.color]}`}>
                                            {getSeverityLabel(alert.color)}
                                        </span>
                                        <h4 className="text-gray-100 font-semibold text-sm">{alert.title}</h4>
                                    </div>
                                    <p className="text-gray-400 text-xs mb-1">{alert.description}</p>
                                    <span className="text-gray-500 text-xs">{alert.time}</span>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => console.log('View details for alert:', alert.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
                                >
                                    <Eye className="h-4 w-4" />
                                    View Details
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SecurityAlertFeed
