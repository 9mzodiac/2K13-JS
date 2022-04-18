import { ADMIN_DB } from "@/firebase/admin";

const getMainProfile = async () => {
  const instagramUserCollection = await ADMIN_DB.collection("insta_users")
    .where("mainProfile", "==", true)
    .get();
  if (instagramUserCollection.empty) return null;

  return JSON.parse(
    JSON.stringify({
      id: instagramUserCollection.docs[0].id,
      ...instagramUserCollection.docs[0].data(),
    })
  );
};

const getMainProfilePosts = async (id: string) => {
  const instagramPostsCollection = await ADMIN_DB.collection("instagram")
    .where("user.id", "==", id)
    .get();
  const instaposts = [];
  for await (const post of instagramPostsCollection.docs) {
    instaposts.push({
      id: post.id,
      ...post.data(),
    });
  }

  return JSON.parse(JSON.stringify(instaposts));
};

const getExplorePost = async () => {
  const instagramPostsCollection = await ADMIN_DB.collection("instagram").get();
  const instaposts = [];
  for await (const post of instagramPostsCollection.docs) {
    instaposts.push({
      id: post.id,
      ...post.data(),
    });
  }

  return JSON.parse(JSON.stringify(instaposts));
};

const getInstaPost = async (id: string) => {
  const instagramPostsCollection = await ADMIN_DB.collection("instagram")
    .doc(id)
    .get();
  return {
    id: instagramPostsCollection.id,
    ...instagramPostsCollection.data(),
  };
};

export { getMainProfile, getMainProfilePosts, getExplorePost, getInstaPost };
