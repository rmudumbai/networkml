import Header from '../components/layout/Header'
import { Activity } from 'lucide-react'

const TrafficInsights = () => {
    return (
        <div>
            <Header title="Traffic Insights" />
            <div className="p-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
                    <Activity className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-100 mb-2">Traffic Insights</h3>
                    <p className="text-gray-400">Detailed traffic analysis and insights will be displayed here.</p>
                </div>
            </div>
        </div>
    )
}

export default TrafficInsights
