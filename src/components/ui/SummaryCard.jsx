const SummaryCard = ({ icon: Icon, title, value, trend }) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-600 bg-opacity-20 rounded-lg">
                            <Icon className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-100">{value}</p>
                    {trend && (
                        <p className="text-sm text-green-400 mt-2">{trend}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SummaryCard
