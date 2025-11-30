import { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import { Settings as SettingsIcon, Eye, EyeOff } from 'lucide-react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import apiService from '../services/api'

const Settings = () => {
    const [apiEndpoint, setApiEndpoint] = useState('https://api.openai.com/v1')
    const [apiKey, setApiKey] = useState('')
    const [model, setModel] = useState('gpt-4')
    const [showKey, setShowKey] = useState(false)
    const [saveStatus, setSaveStatus] = useState('')

    useEffect(() => {
        // Load settings from Firestore
        const loadSettings = async () => {
            try {
                const settingsCollection = import.meta.env.VITE_FIRESTORE_SETTINGS_COLLECTION || 'settings'
                const settingsDoc = await getDoc(doc(db, settingsCollection, 'llm-config'))
                if (settingsDoc.exists()) {
                    const data = settingsDoc.data()
                    setApiEndpoint(data.apiEndpoint || '')
                    setApiKey(data.apiKey || '')
                    setModel(data.model || 'gpt-4')
                }
            } catch (error) {
                console.error('Error loading settings:', error)
            }
        }

        loadSettings()
    }, [])

    const handleSave = async () => {
        try {
            const result = await apiService.saveLLMSettings({
                apiEndpoint,
                apiKey,
                model
            })

            setSaveStatus(result.message || 'Configuration saved successfully!')
            console.log('Settings saved with document ID:', result.documentId)
            setTimeout(() => setSaveStatus(''), 3000)
        } catch (error) {
            console.error('Error saving settings:', error)
            setSaveStatus(`Failed to save: ${error.message}`)
            setTimeout(() => setSaveStatus(''), 5000)
        }
    }

    const handleTestConnection = async () => {
        setSaveStatus('Testing connection...')
        // Placeholder for actual connection test
        setTimeout(() => {
            setSaveStatus('Connection test not implemented yet.')
            setTimeout(() => setSaveStatus(''), 3000)
        }, 1000)
    }

    return (
        <div>
            <Header title="LLM API Settings" />
            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <SettingsIcon className="h-6 w-6 text-blue-400" />
                            <h3 className="text-xl font-bold text-gray-100">LLM Configuration</h3>
                        </div>

                        {/* Save Status */}
                        {saveStatus && (
                            <div className="mb-6 p-4 bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg">
                                <p className="text-blue-400 text-sm">{saveStatus}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* API Endpoint */}
                            <div>
                                <label className="block text-gray-300 font-medium mb-2">API Endpoint</label>
                                <input
                                    type="text"
                                    value={apiEndpoint}
                                    onChange={(e) => setApiEndpoint(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="https://api.openai.com/v1"
                                />
                            </div>

                            {/* API Key */}
                            <div>
                                <label className="block text-gray-300 font-medium mb-2">API Key</label>
                                <div className="relative">
                                    <input
                                        type={showKey ? 'text' : 'password'}
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 transition-colors pr-12"
                                        placeholder="sk-..."
                                    />
                                    <button
                                        onClick={() => setShowKey(!showKey)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                    >
                                        {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Model Selection */}
                            <div>
                                <label className="block text-gray-300 font-medium mb-2">Model Selection</label>
                                <select
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="gpt-4o">GPT-4o</option>
                                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                                    <option value="gpt-4">GPT-4</option>
                                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                    <option value="gemini-2.5-pro">Gemini-2.5-Pro</option>
                                    <option value="claude-3-opus">Claude 3 Opus</option>
                                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Save Configuration
                                </button>
                                <button
                                    onClick={handleTestConnection}
                                    className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                                >
                                    Test Connection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
