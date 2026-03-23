// Firebase Storage helpers for board question images.
// We store question images in the same `images/` storage folder used elsewhere
// to match the existing `storage.rules`.
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

const STORAGE_FOLDER = 'images';

const sanitizeFileName = (name) =>
  name.replace(/[^a-zA-Z0-9._-]/g, '_');

export const uploadQuestionImage = async (imageFile) => {
  if (!imageFile) throw new Error('No image file provided');
  if (!imageFile.type || !imageFile.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  if (!storage) {
    throw new Error('Firebase Storage is not initialized. Please check firebase.js configuration.');
  }

  const timestamp = Date.now();
  const safeName = sanitizeFileName(imageFile.name || 'image');
  const uniqueFileName = `${timestamp}_${Math.random().toString(36).slice(2)}_${safeName}`;
  const storagePath = `${STORAGE_FOLDER}/${uniqueFileName}`;

  const storageRef = ref(storage, storagePath);
  const snapshot = await uploadBytes(storageRef, imageFile);
  const imageUrl = await getDownloadURL(snapshot.ref);

  return { imageUrl, storagePath: snapshot.ref.fullPath };
};

export const deleteQuestionImage = async (storagePath) => {
  if (!storagePath) return;
  if (!storage) return;

  const storageRef = ref(storage, storagePath);
  await deleteObject(storageRef);
};

