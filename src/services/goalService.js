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

const COL = "goals";

addGoal()
getGoals()
updateGoal()
deleteGoal()

export async function addGoal(data) {
  return addDoc(collection(db, COL), data);
}

export async function getGoals(userId) {
  const q = query(collection(db, COL), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateGoal(id, data) {
  return updateDoc(doc(db, COL, id), data);
}

export async function deleteGoal(id) {
  return deleteDoc(doc(db, COL, id));
}
