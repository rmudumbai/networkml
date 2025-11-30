import { UserCircle } from 'lucide-react'

const Header = ({ title }) => {
    return (
        <div className="bg-gray-900 border-b border-gray-800 p-4 mb-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
                <div className="flex items-center gap-4">
                    <UserCircle className="h-8 w-8 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    )
}

export default Header
