// src/stores/peminjamanStore.js
import { db } from '@/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const collectionName = 'peminjaman';

export const addPeminjaman = async (books, returnDate, user) => {
  const borrowedAt = new Date().toISOString();
  for (const book of books) {
    await addDoc(collection(db, collectionName), {
      ...book,
      returnDate,
      borrowedAt,
      status: 'dipinjam',
      user,
    });
  }
};

export const getPeminjamanByUser = async (user) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((d) => d.user === user);
};

export const deletePeminjaman = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};
