import {initializeApp,getApps,getApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
const config={apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID};
export const configured=Boolean(config.apiKey&&config.projectId);
const app=configured?(getApps().length?getApp():initializeApp(config)):null;
export const auth=app?getAuth(app):null;export const db=app?getFirestore(app):null;export const storage=app?getStorage(app):null;
