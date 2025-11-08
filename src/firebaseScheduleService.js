import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'schedule';

export const fetchScheduleItems = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

export const replaceScheduleItems = async (scheduleItems) => {
  const collectionRef = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(collectionRef);
  const batch = writeBatch(db);

  snapshot.forEach((docSnap) => batch.delete(docSnap.ref));

  scheduleItems.forEach((item) => {
    const { id, ...rest } = item;
    const docRef = doc(collectionRef, String(id));
    batch.set(docRef, rest);
  });

  await batch.commit();
};


