// src/stores/pengembalianStore.js
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const pengembalianRef = collection(db, "pengembalian");

export const tambahPengembalian = async (data) => {
  await addDoc(pengembalianRef, data);
};

export const getPengembalian = async () => {
  const snapshot = await getDocs(pengembalianRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
