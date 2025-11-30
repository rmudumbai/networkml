# Backend API Documentation

## Overview

This document describes the backend API functions for the Network Analysis Dashboard. All endpoints are hosted on GCP Cloud Run and interact with Cloud Firestore and Cloud Storage.

**Base URL**: Configured via `VITE_CLOUD_RUN_URL` environment variable

---

## API Functions

### 1. Upload Syslog File

**Function**: `uploadSyslogFile(file)`  
**Endpoint**: `POST /upload/syslog`  
**Purpose**: Upload syslog files to Google Cloud Storage and record metadata in Firestore

#### Request

- **Method**: POST
- **Content-Type**: `multipart/form-data`
- **Body**: FormData with the following fields:
  - `file`: File object (the syslog file)
  - `fileName`: String (file name)
  - `fileSize`: String (file size in bytes)
  - `uploadedAt`: String (ISO timestamp)

#### Response

```json
{
  "documentId": "abc123xyz",
  "gcsPath": "gs://bucket-name/syslogs/2024-11-30_file.log",
  "fileName": "file.log",
  "fileSize": 12345,
  "status": "uploaded"
}
```

#### Backend Data Flow

1. Receives file via FormData
2. Saves raw file to GCS bucket (`syslogs/` folder)
3. Creates metadata document in Firestore `files` collection
4. Returns Firestore document ID and GCS path

#### Usage Example

```javascript
import apiService from '../services/api'

const file = document.getElementById('fileInput').files[0]
const result = await apiService.uploadSyslogFile(file)
console.log('Uploaded to:', result.gcsPath)
console.log('Document ID:', result.documentId)
```

---

### 2. Fetch File Metadata

**Function**: `fetchFileMetadata(limit)`  
**Endpoint**: `GET /files`  
**Purpose**: Retrieve list of uploaded files with their status

#### Request

- **Method**: GET
- **Query Parameters**:
  - `limit` (optional): Number of files to return (default: 50)

#### Response

```json
{
  "files": [
    {
      "id": "doc123",
      "fileName": "syslog-2024-11-30.log",
      "fileSize": 12345,
      "status": "processed",
      "uploadedAt": "2024-11-30T10:00:00Z",
      "gcsPath": "gs://bucket/syslogs/syslog-2024-11-30.log"
    },
    {
      "id": "doc124",
      "fileName": "network-log.txt",
      "fileSize": 54321,
      "status": "uploaded",
      "uploadedAt": "2024-11-30T11:00:00Z",
      "gcsPath": "gs://bucket/syslogs/network-log.txt"
    }
  ]
}
```

#### Backend Data Flow

1. Queries Firestore `files` collection
2. Orders by `uploadedAt` descending
3. Limits results to specified number
4. Returns array of file metadata objects

#### Usage Example

```javascript
import apiService from '../services/api'

const files = await apiService.fetchFileMetadata(20)
files.forEach(file => {
  console.log(`${file.fileName} - ${file.status}`)
})
```

---

### 3. Save LLM Settings

**Function**: `saveLLMSettings(settings)`  
**Endpoint**: `POST /settings/llm`  
**Purpose**: Securely save LLM API configuration to Firestore

#### Request

- **Method**: POST
- **Content-Type**: `application/json`
- **Body**:

```json
{
  "apiEndpoint": "https://api.openai.com/v1",
  "apiKey": "sk-...",
  "model": "gpt-4o",
  "updatedAt": "2024-11-30T10:00:00Z"
}
```

#### Response

```json
{
  "success": true,
  "message": "Settings saved successfully",
  "documentId": "llm-config"
}
```

#### Backend Data Flow

1. Receives settings JSON payload
2. Encrypts API key (backend responsibility)
3. Updates Firestore `settings` collection document
4. Returns success status and document ID

#### Security Notes

- API keys are encrypted by the backend before storage
- Only authorized users should access this endpoint
- Consider implementing rate limiting

#### Usage Example

```javascript
import apiService from '../services/api'

const result = await apiService.saveLLMSettings({
  apiEndpoint: 'https://api.openai.com/v1',
  apiKey: 'sk-proj-...',
  model: 'gpt-4o'
})

console.log(result.message) // "Settings saved successfully"
```

---

### 4. Fetch Alerts

**Function**: `fetchAlerts(limit)`  
**Endpoint**: `GET /alerts`  
**Purpose**: Retrieve latest security alerts from Firestore

#### Request

- **Method**: GET
- **Query Parameters**:
  - `limit` (optional): Number of alerts to return (default: 10)

#### Response

```json
{
  "alerts": [
    {
      "id": "alert123",
      "severity": "high",
      "title": "Unusual Traffic Pattern Detected",
      "description": "Spike in outbound connections from 192.168.1.45",
      "timestamp": "2024-11-30T10:00:00Z",
      "color": "red",
      "icon": "alert-triangle"
    },
    {
      "id": "alert124",
      "severity": "medium",
      "title": "Failed Authentication Attempts",
      "description": "Multiple failed SSH login attempts detected",
      "timestamp": "2024-11-30T09:45:00Z",
      "color": "orange",
      "icon": "alert-circle"
    }
  ]
}
```

#### Backend Data Flow

1. Queries Firestore `alerts` collection
2. Orders by `timestamp` descending
3. Limits results to specified number
4. Returns array of alert objects

#### Alert Severity Levels

- **high**: Red color, critical security issues
- **medium**: Orange color, important warnings
- **warning**: Yellow color, potential issues
- **low/info**: Blue color, informational alerts

#### Usage Example

```javascript
import apiService from '../services/api'

const alerts = await apiService.fetchAlerts(5)
alerts.forEach(alert => {
  console.log(`[${alert.severity.toUpperCase()}] ${alert.title}`)
})
```

---

## Error Handling

All API functions follow a consistent error handling pattern:

```javascript
try {
  const result = await apiService.uploadSyslogFile(file)
  // Handle success
} catch (error) {
  console.error('API Error:', error.message)
  // Display error to user
}
```

### Common Error Responses

```json
{
  "error": true,
  "message": "File upload failed: Invalid file type",
  "code": "INVALID_FILE_TYPE"
}
```

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (missing/invalid authentication)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

---

## Environment Configuration

Required environment variables in `.env`:

```bash
# Cloud Run Backend URL
VITE_CLOUD_RUN_URL=https://your-service-xxxxx-uc.a.run.app

# Firebase Configuration
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_GCS_BUCKET_NAME=your-bucket-name

# Firestore Collections
VITE_FIRESTORE_ALERTS_COLLECTION=alerts
VITE_FIRESTORE_SETTINGS_COLLECTION=settings
VITE_FIRESTORE_FILES_COLLECTION=files
```

---

## Backend Implementation Requirements

The Cloud Run backend must implement these endpoints with the following responsibilities:

### POST /upload/syslog
- Accept multipart/form-data
- Validate file type (.log, .txt)
- Upload to GCS with unique filename
- Create Firestore document with metadata
- Return document ID and GCS path

### GET /files
- Query Firestore files collection
- Support pagination via limit parameter
- Return sorted by upload date (newest first)

### POST /settings/llm
- Accept JSON payload
- Encrypt API key before storage
- Update Firestore settings document
- Return success confirmation

### GET /alerts
- Query Firestore alerts collection
- Support pagination via limit parameter
- Return sorted by timestamp (newest first)

---

## Testing

### Local Development

For local testing without a backend, the frontend will gracefully handle API errors and fall back to mock data where applicable.

### Integration Testing

```bash
# Test file upload
curl -X POST http://localhost:8080/upload/syslog \
  -F "file=@test.log" \
  -F "fileName=test.log" \
  -F "fileSize=1234"

# Test fetch files
curl http://localhost:8080/files?limit=10

# Test save settings
curl -X POST http://localhost:8080/settings/llm \
  -H "Content-Type: application/json" \
  -d '{"apiEndpoint":"https://api.openai.com/v1","apiKey":"sk-test","model":"gpt-4o"}'

# Test fetch alerts
curl http://localhost:8080/alerts?limit=5
```

---

## Rate Limiting

Recommended rate limits for production:

- **Upload**: 10 requests per minute per user
- **Fetch Files**: 60 requests per minute per user
- **Save Settings**: 5 requests per minute per user
- **Fetch Alerts**: 60 requests per minute per user

---

## Security Considerations

1. **Authentication**: Implement Firebase Auth or custom JWT authentication
2. **API Key Encryption**: Encrypt sensitive data before storing in Firestore
3. **File Validation**: Validate file types and sizes on backend
4. **CORS**: Configure appropriate CORS policies for Cloud Run
5. **Rate Limiting**: Implement rate limiting to prevent abuse
6. **Input Sanitization**: Sanitize all user inputs to prevent injection attacks

---

## Future Enhancements

- WebSocket support for real-time alerts
- Batch file upload
- File processing status webhooks
- Advanced alert filtering and search
- Settings versioning and rollback
