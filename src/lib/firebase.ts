import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  doc, 
  updateDoc, 
  increment,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import type { Blessing } from '../types';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  projectId: firebaseConfigJson.projectId,
  appId: firebaseConfigJson.appId,
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = firebaseConfigJson.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

const BLESSINGS_COLLECTION = 'blessings';

export function subscribeToBlessings(callback: (blessings: Blessing[]) => void, errorCallback?: (error: Error) => void) {
  const q = query(
    collection(db, BLESSINGS_COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const blessings: Blessing[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        blessings.push({
          id: docSnap.id,
          name: data.name || '',
          relationship: data.relationship || '',
          message: data.message || '',
          prayerBadge: data.prayerBadge || '',
          likes: data.likes || 0,
          likedBy: data.likedBy || [],
          createdAt: data.createdAt || Date.now(),
        });
      });
      callback(blessings);
    },
    (err) => {
      console.warn('Firestore subscription notice:', err);
      if (errorCallback) errorCallback(err);
    }
  );
}

export async function addBlessing(blessing: Omit<Blessing, 'id' | 'likes' | 'likedBy' | 'createdAt'>) {
  const newBlessing = {
    ...blessing,
    likes: 0,
    likedBy: [],
    createdAt: Date.now(),
  };

  return await addDoc(collection(db, BLESSINGS_COLLECTION), newBlessing);
}

export async function toggleLikeBlessing(blessingId: string, userId: string, isCurrentlyLiked: boolean) {
  const docRef = doc(db, BLESSINGS_COLLECTION, blessingId);
  if (isCurrentlyLiked) {
    await updateDoc(docRef, {
      likes: increment(-1),
      likedBy: arrayRemove(userId),
    });
  } else {
    await updateDoc(docRef, {
      likes: increment(1),
      likedBy: arrayUnion(userId),
    });
  }
}
