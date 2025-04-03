import { signInWithGoogle, signOut, onAuthStateChanged } from './auth.js';
import { loadPasswords, savePasswords } from './storage.js';

// DOM elements
const googleSignInBtn = document.getElementById('google-signin');
const signOutBtn = document.getElementById('signout-btn');
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');

// Event listeners
googleSignInBtn.addEventListener('click', handleGoogleSignIn);
signOutBtn.addEventListener('click', handleSignOut);

// Check auth state
onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    authContainer.style.display = 'none';
    appContainer.style.display = 'block';
    initializeApp(user);
  } else {
    // User is signed out
    authContainer.style.display = 'block';
    appContainer.style.display = 'none';
  }
});

async function handleGoogleSignIn() {
  try {
    await signInWithGoogle();
  } catch (error) {
    showError("Failed to sign in: " + error.message);
  }
}

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    showError("Failed to sign out: " + error.message);
  }
}

async function initializeApp(user) {
  // Prompt for encryption password (separate from Google auth)
  const encryptionPassword = prompt("Enter your encryption password:");
  
  if (!encryptionPassword) {
    await signOut();
    return;
  }

  // Load user's encrypted data
  try {
    const passwords = await loadPasswords(user, encryptionPassword);
    // Render passwords in UI
  } catch (error) {
    showError("Failed to decrypt data. Please check your password.");
    await signOut();
  }
}