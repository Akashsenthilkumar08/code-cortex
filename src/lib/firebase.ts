import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBanv10gOHkTBlylH5d1MwDm5YskRzkFZk",
  authDomain: "akash-14574.firebaseapp.com",
  databaseURL: "https://akash-14574-default-rtdb.firebaseio.com",
  projectId: "akash-14574",
  storageBucket: "akash-14574.firebasestorage.app",
  messagingSenderId: "1058558884003",
  appId: "1:1058558884003:web:0b0da65d5d8065015f2716",
  measurementId: "G-7GZKRGSWXL",
};

const app = initializeApp(firebaseConfig);

// Analytics (browser only)
if (typeof window !== "undefined") {
  try { getAnalytics(app); } catch (_) { /* analytics may fail in dev */ }
}

export const auth = getAuth(app);

// ── Providers ───────────────────────────────────────────────────────
export const googleProvider   = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");
export const githubProvider   = new GithubAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });
microsoftProvider.setCustomParameters({ prompt: "select_account" });

// ── Auth helpers ────────────────────────────────────────────────────
export const signInWithGoogle    = (): Promise<UserCredential> => signInWithPopup(auth, googleProvider);
export const signInWithMicrosoft = (): Promise<UserCredential> => signInWithPopup(auth, microsoftProvider);
export const signInWithGithub    = (): Promise<UserCredential> => signInWithPopup(auth, githubProvider);
export const firebaseSignOut     = (): Promise<void>           => signOut(auth);
