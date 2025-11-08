import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'projects';

export const fetchProjects = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

export const addProject = async (project) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), project);
  return {
    id: docRef.id,
    ...project
  };
};

export const deleteProject = async (projectId) => {
  await deleteDoc(doc(db, COLLECTION_NAME, projectId));
};

export const clearAllProjects = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const batch = writeBatch(db);
  snapshot.forEach((docSnap) => batch.delete(docSnap.ref));
  await batch.commit();
};

export const updateProject = async (projectId, updatedFields) => {
  await setDoc(doc(db, COLLECTION_NAME, projectId), updatedFields, { merge: true });
};


