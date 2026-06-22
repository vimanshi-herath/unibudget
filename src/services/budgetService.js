import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

addBudget()
getBudgets()
updateBudget()
deleteBudget()

const COL = "budgets";

export async function addBudget(data) {
  return addDoc(collection(db, COL), data);
}

export async function getBudgets(userId) {
  const q = query(collection(db, COL), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateBudget(id, data) {
  return updateDoc(doc(db, COL, id), data);
}

export async function deleteBudget(id) {
  return deleteDoc(doc(db, COL, id));
}
