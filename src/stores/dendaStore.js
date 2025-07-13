// src/stores/dendaStore.js
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const dendaRef = collection(db, "denda");

export const tambahDenda = async (data) => {
  await addDoc(dendaRef, data);
};

export const getDenda = async () => {
  const snapshot = await getDocs(dendaRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
