// Google Cloud Storage Service
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'
import apiService from './api'

const BUCKET_NAME = import.meta.env.VITE_GCS_BUCKET_NAME || 'network-analysis-syslogs'

/**
 * Upload file to Google Cloud Storage
 * @param {File} file - File to upload
 * @param {Function} onProgress - Progress callback (optional)
 * @returns {Promise<string>} - Download URL of uploaded file
 */
export const uploadToGCS = async (file, onProgress = null) => {
    try {
        // Create a storage reference
        const timestamp = new Date().getTime()
        const fileName = `syslogs/${timestamp}_${file.name}`
        const storageRef = ref(storage, fileName)

        // Create upload task
        const uploadTask = uploadBytesResumable(storageRef, file)

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress tracking
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    if (onProgress) {
                        onProgress(progress)
                    }
                    console.log(`Upload is ${progress}% done`)
                },
                (error) => {
                    // Handle upload errors
                    console.error('Upload error:', error)
                    reject(error)
                },
                async () => {
                    // Upload completed successfully
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        console.log('File available at:', downloadURL)

                        // Notify backend to process the file
                        await apiService.processSyslog({
                            fileName: file.name,
                            fileSize: file.size,
                            fileType: file.type,
                            storagePath: fileName,
                            downloadURL,
                            uploadedAt: new Date().toISOString(),
                        })

                        resolve(downloadURL)
                    } catch (error) {
                        reject(error)
                    }
                }
            )
        })
    } catch (error) {
        console.error('Error uploading to GCS:', error)
        throw error
    }
}

/**
 * Get file metadata from GCS
 * @param {string} filePath - Path to file in GCS
 * @returns {Promise<Object>} - File metadata
 */
export const getFileMetadata = async (filePath) => {
    try {
        const storageRef = ref(storage, filePath)
        const metadata = await getMetadata(storageRef)
        return metadata
    } catch (error) {
        console.error('Error getting file metadata:', error)
        throw error
    }
}

/**
 * Delete file from GCS
 * @param {string} filePath - Path to file in GCS
 * @returns {Promise<void>}
 */
export const deleteFromGCS = async (filePath) => {
    try {
        const storageRef = ref(storage, filePath)
        await deleteObject(storageRef)
        console.log('File deleted successfully')
    } catch (error) {
        console.error('Error deleting file:', error)
        throw error
    }
}
