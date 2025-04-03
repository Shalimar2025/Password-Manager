// Initialize Firebase (you'll need to set up a Firebase project)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    return result.user;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}

// Sign out
export function signOut() {
  return firebase.auth().signOut();
}

// Check auth state
export function onAuthStateChanged(callback) {
  return firebase.auth().onAuthStateChanged(callback);
}
