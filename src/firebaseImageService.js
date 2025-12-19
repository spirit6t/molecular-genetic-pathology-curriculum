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
        // Create a unique filename
        const timestamp = Date.now();
        const fileName = `${timestamp}_${imageFile.name}`;
        const storageRef = ref(storage, `${STORAGE_FOLDER}/${fileName}`);

        // Upload image to Firebase Storage
        const snapshot = await uploadBytes(storageRef, imageFile);
        
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Save metadata to Firestore
        const imageData = {
            ...metadata,
            fileName: imageFile.name,
            fileSize: imageFile.size,
            storagePath: snapshot.ref.fullPath,
            downloadURL: downloadURL,
            uploadedAt: Timestamp.now()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), imageData);
        
        return {
            id: docRef.id,
            ...imageData
        };
    } catch (error) {
        console.error('Error uploading image:', error);
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

