// API Service for GCP Cloud Run Backend
const API_BASE_URL = import.meta.env.VITE_CLOUD_RUN_URL || 'http://localhost:8080'

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL
    }

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
                throw new Error(`API Error: ${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (error) {
            console.error('API Request failed:', error)
            throw error
        }
    }

    // GET request
    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'GET',
            ...options,
        })
    }

    // POST request
    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options,
        })
    }

    // PUT request
    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options,
        })
    }

    // DELETE request
    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'DELETE',
            ...options,
        })
    }

    // Process syslog file
    async processSyslog(fileMetadata) {
        return this.post('/api/syslog/process', fileMetadata)
    }

    // Get metrics
    async getMetrics() {
        return this.get('/api/metrics')
    }

    // Get alerts
    async getAlerts(limit = 10) {
        return this.get(`/api/alerts?limit=${limit}`)
    }

    // Test LLM connection
    async testLLMConnection(config) {
        return this.post('/api/llm/test', config)
    }
}

export default new ApiService()
