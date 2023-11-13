import { db } from "@/firebase/client";
import {
  collection,
  doc,
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
      orderBy("createdDate", "desc")
    )
  );

  const notifications = [];
  for await (const notification of querySnapshot.docs) {
    setTimeout(()=>{
      notifications.push({
        id: notification.id,
        ...notification.data(),
      });
    }, 2000)
  }

  return notifications;
};

const clearNotification = async (id: string) => {
  await updateDoc(doc(db, "notification", id), {
    cleared: true,
  });
};

export { getNotifications, clearNotification };
