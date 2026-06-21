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
  orderBy,
} from "firebase/firestore";

const COL = "transactions";

export async function addTransaction(data) {
  return addDoc(collection(db, COL), data);
}

export async function getTransactions(userId) {
  const q = query(
    collection(db, COL),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateTransaction(id, data) {
  return updateDoc(doc(db, COL, id), data);
}

export async function deleteTransaction(id) {
  return deleteDoc(doc(db, COL, id));
}
