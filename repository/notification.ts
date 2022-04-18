import { db } from "@/firebase/client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const getNotifications = async () => {
  const notificationCollection = collection(db, "notification");

  const querySnapshot = await getDocs(
    query(
      notificationCollection,
      where("cleared", "==", false),
      // orderBy("createdDate", "desc")
    )
  );

  const notifications = [];
  for await (const notification of querySnapshot.docs) {
    notifications.push({
      id: notification.id,
      ...notification.data(),
    });
  }

  return notifications;
};

const clearNotification = async (id: string) => {
  await updateDoc(doc(db, "notification", id), {
    cleared: true,
  });
};

export { getNotifications, clearNotification };
