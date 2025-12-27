// Firebase service for image bank operations
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { db, storage } from './firebase';

const COLLECTION_NAME = 'imageBank';
const STORAGE_FOLDER = 'images';

/**
 * Upload image to Firebase Storage and save metadata to Firestore
 */
export const uploadImage = async (imageFile, metadata) => {
    try {
        console.log('uploadImage called with:', { fileName: imageFile.name, fileSize: imageFile.size, metadata });
        
        // Check if storage is initialized
        if (!storage) {
            throw new Error('Firebase Storage is not initialized. Please check firebase.js configuration.');
        }
        
        // Create a unique filename
        const timestamp = Date.now();
        const fileName = `${timestamp}_${imageFile.name}`;
        const storagePath = `${STORAGE_FOLDER}/${fileName}`;
        console.log('Creating storage reference:', storagePath);
        
        const storageRef = ref(storage, storagePath);
        console.log('Storage ref created, uploading bytes...');

        // Upload image to Firebase Storage
        console.log('Uploading to Firebase Storage...');
        const snapshot = await uploadBytes(storageRef, imageFile);
        console.log('Upload successful, getting download URL...');
        
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Download URL obtained:', downloadURL);

        // Save metadata to Firestore
        const imageData = {
            ...metadata,
            fileName: imageFile.name,
            fileSize: imageFile.size,
            storagePath: snapshot.ref.fullPath,
            downloadURL: downloadURL,
            uploadedAt: Timestamp.now()
        };
        
        console.log('Saving metadata to Firestore...', imageData);
        const docRef = await addDoc(collection(db, COLLECTION_NAME), imageData);
        console.log('Metadata saved to Firestore with ID:', docRef.id);
        
        return {
            id: docRef.id,
            ...imageData
        };
    } catch (error) {
        console.error('Error uploading image - Details:', {
            code: error.code,
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        throw error;
    }
};

/**
 * Get all images from Firebase
 */
export const getAllImages = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('uploadedAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const images = [];
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            images.push({
                id: docSnap.id,
                ...data,
                // Convert Timestamp to ISO string if needed
                uploadedAt: data.uploadedAt?.toDate?.()?.toISOString() || data.uploadedAt
            });
        });

        return images;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

/**
 * Delete image from both Storage and Firestore
 */
export const deleteImage = async (imageId, storagePath) => {
    try {
        // Delete from Firestore
        await deleteDoc(doc(db, COLLECTION_NAME, imageId));

        // Delete from Storage if path exists
        if (storagePath) {
            const storageRef = ref(storage, storagePath);
            await deleteObject(storageRef);
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

