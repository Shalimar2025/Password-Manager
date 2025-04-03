import { deriveKey, encryptData, decryptData } from './crypto.js';

// Get user-specific storage key
function getUserStorageKey(userId) {
  return `encrypted_vault_${userId}`;
}

// Save encrypted passwords
export async function savePasswords(user, password, entries) {
  const salt = user.uid; // Using user ID as salt
  const key = await deriveKey(password, salt);
  
  const encryptedEntries = await encryptData(key, JSON.stringify(entries));
  
  localStorage.setItem(
    getUserStorageKey(user.uid),
    JSON.stringify(encryptedEntries)
  );
}

// Load and decrypt passwords
export async function loadPasswords(user, password) {
  const salt = user.uid;
  const key = await deriveKey(password, salt);
  
  const encryptedData = localStorage.getItem(getUserStorageKey(user.uid));
  if (!encryptedData) return [];
  
  const parsedData = JSON.parse(encryptedData);
  const decrypted = await decryptData(key, parsedData);
  
  return JSON.parse(decrypted);
}