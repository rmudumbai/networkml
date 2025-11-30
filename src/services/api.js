// API Service for GCP Cloud Run Backend
const API_BASE_URL = import.meta.env.VITE_CLOUD_RUN_URL || 'http://localhost:8080'

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL
    }

    /**
     * Generic request handler
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (error) {
            console.error('API Request failed:', error)
            throw error
        }
    }

    /**
     * Upload Syslog File
     * POST /upload/syslog
     * Sends file using FormData. Backend saves raw file to GCS and records metadata in Firestore.
     * Returns the Firestore Document ID and GCS path.
     * 
     * @param {File} file - The syslog file to upload
     * @returns {Promise<{documentId: string, gcsPath: string, fileName: string, fileSize: number}>}
     */
    async uploadSyslogFile(file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileName', file.name)
        formData.append('fileSize', file.size.toString())
        formData.append('uploadedAt', new Date().toISOString())

        try {
            const response = await fetch(`${this.baseURL}/upload/syslog`, {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - browser will set it with boundary for FormData
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `Upload failed: ${response.status}`)
            }

            const result = await response.json()
            return {
                documentId: result.documentId,
                gcsPath: result.gcsPath,
                fileName: result.fileName,
                fileSize: result.fileSize,
                status: result.status || 'uploaded'
            }
        } catch (error) {
            console.error('File upload error:', error)
            throw error
        }
    }

    /**
     * Fetch File Metadata
     * GET /files
     * Fetches the list of uploaded files (name, status) by querying Cloud Firestore.
     * 
     * @param {number} limit - Optional limit for number of files to fetch
     * @returns {Promise<Array<{id: string, fileName: string, fileSize: number, status: string, uploadedAt: string, gcsPath: string}>>}
     */
    async fetchFileMetadata(limit = 50) {
        try {
            const endpoint = limit ? `/files?limit=${limit}` : '/files'
            const response = await this.request(endpoint, {
                method: 'GET',
            })

            return response.files || []
        } catch (error) {
            console.error('Error fetching file metadata:', error)
            throw error
        }
    }

    /**
     * Save LLM Settings
     * POST /settings/llm
     * Sends JSON payload for the API key and model. Backend securely updates the settings document in Cloud Firestore.
     * 
     * @param {Object} settings - LLM settings object
     * @param {string} settings.apiEndpoint - API endpoint URL
     * @param {string} settings.apiKey - API key (will be encrypted by backend)
     * @param {string} settings.model - Model name
     * @returns {Promise<{success: boolean, message: string, documentId: string}>}
     */
    async saveLLMSettings(settings) {
        try {
            const response = await this.request('/settings/llm', {
                method: 'POST',
                body: JSON.stringify({
                    apiEndpoint: settings.apiEndpoint,
                    apiKey: settings.apiKey,
                    model: settings.model,
                    updatedAt: new Date().toISOString()
                }),
            })

            return {
                success: response.success || true,
                message: response.message || 'Settings saved successfully',
                documentId: response.documentId
            }
        } catch (error) {
            console.error('Error saving LLM settings:', error)
            throw error
        }
    }

    /**
     * Fetch Alerts
     * GET /alerts
     * Fetches the latest security alerts by querying the alerts collection in Cloud Firestore.
     * 
     * @param {number} limit - Optional limit for number of alerts to fetch
     * @returns {Promise<Array<{id: string, severity: string, title: string, description: string, timestamp: string, color: string, icon: string}>>}
     */
    async fetchAlerts(limit = 10) {
        try {
            const endpoint = limit ? `/alerts?limit=${limit}` : '/alerts'
            const response = await this.request(endpoint, {
                method: 'GET',
            })

            return response.alerts || []
        } catch (error) {
            console.error('Error fetching alerts:', error)
            throw error
        }
    }

    // Legacy methods for backward compatibility
    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'GET',
            ...options,
        })
    }

    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options,
        })
    }

    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options,
        })
    }

    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'DELETE',
            ...options,
        })
    }

    // Additional helper methods
    async getMetrics() {
        return this.get('/api/metrics')
    }

    async testLLMConnection(config) {
        return this.post('/api/llm/test', config)
    }
}

export default new ApiService()
