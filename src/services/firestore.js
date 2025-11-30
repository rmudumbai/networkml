// Firestore Database Service
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../config/firebase'

// Collection names from environment variables
const COLLECTIONS = {
    alerts: import.meta.env.VITE_FIRESTORE_ALERTS_COLLECTION || 'alerts',
    settings: import.meta.env.VITE_FIRESTORE_SETTINGS_COLLECTION || 'settings',
    metrics: import.meta.env.VITE_FIRESTORE_METRICS_COLLECTION || 'metrics',
}

/**
 * Get a single document
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} - Document data
 */
export const getDocument = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log('No such document!')
            return null
        }
    } catch (error) {
        console.error('Error getting document:', error)
        throw error
    }
}

/**
 * Get all documents from a collection
 * @param {string} collectionName - Collection name
 * @returns {Promise<Array>} - Array of documents
 */
export const getAllDocuments = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName))
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error('Error getting documents:', error)
        throw error
    }
}

/**
 * Create a new document
 * @param {string} collectionName - Collection name
 * @param {Object} data - Document data
 * @returns {Promise<string>} - New document ID
 */
export const createDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: new Date().toISOString(),
        })
        return docRef.id
    } catch (error) {
        console.error('Error creating document:', error)
        throw error
    }
}

/**
 * Update a document
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @param {Object} data - Updated data
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, documentId, data) => {
    try {
        const docRef = doc(db, collectionName, documentId)
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error updating document:', error)
        throw error
    }
}

/**
 * Delete a document
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, documentId) => {
    try {
        await deleteDoc(doc(db, collectionName, documentId))
    } catch (error) {
        console.error('Error deleting document:', error)
        throw error
    }
}

/**
 * Query documents with filters
 * @param {string} collectionName - Collection name
 * @param {Array} filters - Array of filter conditions
 * @param {string} orderByField - Field to order by
 * @param {number} limitCount - Limit number of results
 * @returns {Promise<Array>} - Array of documents
 */
export const queryDocuments = async (
    collectionName,
    filters = [],
    orderByField = null,
    limitCount = null
) => {
    try {
        let q = collection(db, collectionName)

        // Apply filters
        filters.forEach(filter => {
            q = query(q, where(filter.field, filter.operator, filter.value))
        })

        // Apply ordering
        if (orderByField) {
            q = query(q, orderBy(orderByField, 'desc'))
        }

        // Apply limit
        if (limitCount) {
            q = query(q, limit(limitCount))
        }

        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error('Error querying documents:', error)
        throw error
    }
}

/**
 * Subscribe to real-time updates
 * @param {string} collectionName - Collection name
 * @param {Function} callback - Callback function for updates
 * @param {Array} filters - Optional filters
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToCollection = (
    collectionName,
    callback,
    filters = [],
    orderByField = null,
    limitCount = null
) => {
    try {
        let q = collection(db, collectionName)

        // Apply filters
        filters.forEach(filter => {
            q = query(q, where(filter.field, filter.operator, filter.value))
        })

        // Apply ordering
        if (orderByField) {
            q = query(q, orderBy(orderByField, 'desc'))
        }

        // Apply limit
        if (limitCount) {
            q = query(q, limit(limitCount))
        }

        return onSnapshot(q, (snapshot) => {
            const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            callback(documents)
        })
    } catch (error) {
        console.error('Error subscribing to collection:', error)
        throw error
    }
}

// Convenience functions for specific collections
export const getAlerts = (limitCount = 10) => {
    return queryDocuments(COLLECTIONS.alerts, [], 'timestamp', limitCount)
}

export const getSettings = (settingId) => {
    return getDocument(COLLECTIONS.settings, settingId)
}

export const saveSettings = (settingId, data) => {
    return setDoc(doc(db, COLLECTIONS.settings, settingId), data)
}

export const getMetrics = () => {
    return getAllDocuments(COLLECTIONS.metrics)
}
