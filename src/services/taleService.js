import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { encryptText, decryptText } from "../utils/crypto";


// ✅ SAVE ENCRYPTED TALE
// export const saveEncryptedTale = async (userId, taleData) => {
//   if (!userId) throw new Error("User not logged in");

//   const encryptedTale = {
//     title: encryptText(taleData.title),
//     category: encryptText(taleData.category),
//     content: encryptText(taleData.content),
//     timestamp: Timestamp.now(),
//     userId,
//   };

//   const talesRef = collection(db, "users", userId, "tales");
//   await addDoc(talesRef, encryptedTale);
// };


export const saveEncryptedTale = async (userId, taleData) => {
  if (!userId) throw new Error("User not logged in");

  const now = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffsetMs);
  const dateKeyIST = `${istDate.getFullYear()}-${String(istDate.getMonth() + 1).padStart(2, "0")}-${String(istDate.getDate()).padStart(2, "0")}`;

  const encryptedTale = {
    title: encryptText(taleData.title),
    category: encryptText(taleData.category),
    content: encryptText(taleData.content),
    timestamp: Timestamp.now(),
    dateKey: dateKeyIST, // ✅ precomputed IST date
    userId,
  };

  const talesRef = collection(db, "users", userId, "tales");
  await addDoc(talesRef, encryptedTale);
};

// ✅ GET TALES BY DATE
export const getTalesByDate = async (date, userId) => {
  if (!userId) return [];

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const talesRef = collection(db, "users", userId, "tales");
    const q = query(
      talesRef,
      where("timestamp", ">=", Timestamp.fromDate(startOfDay)),
      where("timestamp", "<=", Timestamp.fromDate(endOfDay))
    );

    const snapshot = await getDocs(q);
console.log("Fetching tales between:", startOfDay, "and", endOfDay);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: decryptText(data.title),
        category: decryptText(data.category),
        content: decryptText(data.content),
        timestamp: data.timestamp.toDate(),
      };
    });
  } catch (error) {
    console.error("Error fetching tales:", error);
    return [];
  }
  
};

// ✅ DELETE TALE
export const deleteTale = async (userId, taleId) => {
  try {
    const taleRef = doc(db, "users", userId, "tales", taleId);
    await deleteDoc(taleRef);
    console.log("Tale deleted");
  } catch (error) {
    console.error("Error deleting tale:", error);
  }
};

// ✅ UPDATE TALE (Encrypted)
export const updateTale = async (userId, taleId, updatedData) => {
  try {
    const encryptedData = {
      ...updatedData,
      content: encryptText(updatedData.content),
      title: encryptText(updatedData.title),
      category: encryptText(updatedData.category),
    };

    const taleRef = doc(db, "users", userId, "tales", taleId);
    await updateDoc(taleRef, encryptedData);
  } catch (error) {
    console.error("Error updating tale:", error);
    throw error;
  }
};

export const getUserTales = async (userId) => {
  try {
    const talesRef = collection(db, "users", userId, "tales");
    const snapshot = await getDocs(talesRef);

    const tales = snapshot.docs.map((doc) => {
      const data = doc.data();
      const ts = data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp);

      // Use local date string (yyyy-mm-dd) here:
      const localDateKey = `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(2, "0")}-${String(ts.getDate()).padStart(2, "0")}`;

      return {
        id: doc.id,
        ...data,
        timestamp: ts,
        dateKey: localDateKey,
      };
    });

    // Group by dateKey
    const groupedTalesByDate = {};
    for (const tale of tales) {
      if (!groupedTalesByDate[tale.dateKey]) {
        groupedTalesByDate[tale.dateKey] = [];
      }
      groupedTalesByDate[tale.dateKey].push(tale);
    }

    return { tales, groupedTalesByDate };
  } catch (error) {
    console.error("Error fetching tales: ", error);
    return { tales: [], groupedTalesByDate: {} };
  }
};
