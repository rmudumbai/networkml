import { Network } from 'lucide-react'

const NetworkTopologyMap = () => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <Network className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-bold text-gray-100">Network Health</h3>
            </div>
            <div className="relative h-64 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                    {/* Connection lines */}
                    <line x1="150" y1="100" x2="75" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
                    <line x1="150" y1="100" x2="225" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />

                    {/* Central node */}
                    <circle cx="150" cy="100" r="25" fill="#1e40af" stroke="#3b82f6" strokeWidth="3" />
                    <text x="150" y="105" textAnchor="middle" fill="#e5e7eb" fontSize="12" fontWeight="bold">Core</text>

                    {/* Peripheral nodes */}
                    <circle cx="75" cy="50" r="20" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                    <text x="75" y="55" textAnchor="middle" fill="#e5e7eb" fontSize="10">Node 1</text>

                    <circle cx="225" cy="50" r="20" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                    <text x="225" y="55" textAnchor="middle" fill="#e5e7eb" fontSize="10">Node 2</text>
                </svg>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-400">Healthy</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400">Active</span>
                </div>
            </div>
        </div>
    )
}

export default NetworkTopologyMap
