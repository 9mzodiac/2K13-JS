import * as admin from "firebase-admin";

const ADMIN_APP = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
  : admin.app();

const ADMIN_DB = admin.firestore();

const ADMIN_BUCKET = admin.storage().bucket();

export { ADMIN_APP, ADMIN_DB, ADMIN_BUCKET };
