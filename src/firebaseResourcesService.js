import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'resources';

const defaultGroupedResources = () => ({
  books: [],
  journals: [],
  links: []
});

export const fetchResources = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const grouped = defaultGroupedResources();

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const type = data.type || 'book';
    const key = type === 'journal' ? 'journals' : type === 'link' ? 'links' : 'books';
    grouped[key] = [
      ...grouped[key],
      {
        id: docSnap.id,
        ...data
      }
    ];
  });

  return grouped;
};

export const addResource = async (resource) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), resource);
  return {
    id: docRef.id,
    ...resource
  };
};


