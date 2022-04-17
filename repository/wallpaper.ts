import { db } from "@/firebase/client";
import { collection, doc, getDocs } from "firebase/firestore";

const getWallpaper: any = async () => {
  const wallpaperSnapshot = await getDocs(collection(db, "wallpaper"));

  const wallpapers = [];
  for await (const wallpaper of wallpaperSnapshot.docs) {
    wallpapers.push({
      id: wallpaper.id,
      ...wallpaper.data(),
    });
  }

  return wallpapers;
};

export { getWallpaper };
