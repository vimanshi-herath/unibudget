import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";

export async function getGoals(uid) {
  const q = query(collection(db, "goals"), where("userId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addGoal(data) {
  return await addDoc(collection(db, "goals"), data);
}

export async function updateGoal(id, data) {
  return await updateDoc(doc(db, "goals", id), data);
}

export async function deleteGoal(id) {
  return await deleteDoc(doc(db, "goals", id));
}