import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";

export async function getTransactions(uid) {
  const q = query(collection(db, "transactions"), where("uid", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addTransaction(data) {
  return await addDoc(collection(db, "transactions"), data);
}

export async function updateTransaction(id, data) {
  return await updateDoc(doc(db, "transactions", id), data);
}

export async function deleteTransaction(id) {
  return await deleteDoc(doc(db, "transactions", id));
}