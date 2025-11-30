import { useState } from 'react'
import Header from '../components/layout/Header'
import { UploadCloud, FileText, X } from 'lucide-react'
import { uploadToGCS } from '../services/storage'

const SyslogUploader = () => {
    const [files, setFiles] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFiles = Array.from(e.dataTransfer.files)
        const validFiles = droppedFiles.filter(file =>
            file.name.endsWith('.log') || file.name.endsWith('.txt')
        )
        setFiles([...files, ...validFiles])
    }

    const handleFileInput = (e) => {
        const selectedFiles = Array.from(e.target.files)
        setFiles([...files, ...selectedFiles])
    }

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    const handleProcessFiles = async () => {
        if (files.length === 0) return

        setUploading(true)
        setUploadStatus('Uploading files...')

        try {
            // Upload each file to GCS
            for (const file of files) {
                await uploadToGCS(file)
            }
            setUploadStatus(`Successfully uploaded ${files.length} file(s)`)
            setFiles([])

            // Clear status after 3 seconds
            setTimeout(() => setUploadStatus(''), 3000)
        } catch (error) {
            console.error('Upload error:', error)
            setUploadStatus('Upload failed. Please check your GCP configuration.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <Header title="Syslog Uploader" />
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Upload Area */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${isDragging
                            ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                            : 'border-gray-700 bg-gray-900'
                            }`}
                    >
                        <UploadCloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-100 mb-2">Upload Syslog Files</h3>
                        <p className="text-gray-400 mb-6">Drag and drop files here, or click to browse</p>
                        <label className="inline-block">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileInput}
                                className="hidden"
                                accept=".log,.txt"
                            />
                            <span className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block">
                                Browse Files
                            </span>
                        </label>
                    </div>

                    {/* Upload Status */}
                    {uploadStatus && (
                        <div className="mt-4 p-4 bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg text-center">
                            <p className="text-blue-400">{uploadStatus}</p>
                        </div>
                    )}

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <h4 className="text-lg font-bold text-gray-100 mb-4">File Status List ({files.length})</h4>
                            <div className="space-y-3">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                                        <div className="flex items-center gap-3 flex-1">
                                            <FileText className="h-5 w-5 text-blue-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-100 font-medium">{file.name}</p>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                                                    <span className="text-xs px-2 py-1 rounded bg-blue-500 bg-opacity-20 text-blue-400">
                                                        {uploading ? 'Processing...' : 'Ready'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="p-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleProcessFiles}
                                disabled={uploading}
                                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Processing...' : 'Process Files'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SyslogUploader
