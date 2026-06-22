import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";

export async function getBudgets(uid) {
  const q = query(collection(db, "budgets"), where("userId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addBudget(data) {
  return await addDoc(collection(db, "budgets"), data);
}

export async function updateBudget(id, data) {
  return await updateDoc(doc(db, "budgets", id), data);
}

export async function deleteBudget(id) {
  return await deleteDoc(doc(db, "budgets", id));
}