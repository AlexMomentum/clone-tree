import { db } from '../../firebase/firebase-config';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Add Link
const addLinkToDB = async (userId, linkData) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/links`), linkData);
    console.log('Document written with ID:', docRef.id);
    return docRef.id;  // Return the document ID
  } catch (e) {
    console.error('Error adding document:', e);
    throw new Error(e);
  }
};

// Fetch Links by User ID
const fetchUserLinks = async (userId) => {
  try {
    const q = query(collection(db, `users/${userId}/links`));
    const querySnapshot = await getDocs(q);
    const links = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
      backgroundColor: doc.data().backgroundColor || 'white',
      order: doc.data().order || 0
    }));
    links.sort((a, b) => a.order - b.order);
    return links;
  } catch (e) {
    console.error('Error fetching documents:', e);
    throw new Error(e);
  }
};

// Fetch Links by Username
const fetchLinksByUsername = async (username) => {
  try {
    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('settings.username', '==', username));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      throw new Error(`User with username '${username}' not found`);
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;
    const linksCollection = collection(db, `users/${userId}/links`);
    const linksSnapshot = await getDocs(linksCollection);

    const links = linksSnapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url || '',
      userId,
      backgroundColor: doc.data().backgroundColor || '#ffffff',
      order: doc.data().order || 0,
    }));

    if (links.length === 0) {
      throw new Error(`No links found for user '${username}'`);
    }

    links.sort((a, b) => a.order - b.order);
    return links;
  } catch (e) {
    console.error('Error fetching documents by username:', e.message);
    throw new Error(e.message);
  }
};

// Update Link
const updateLink = async (userId, linkId, newLinkData) => {
  try {
    const linkRef = doc(db, `users/${userId}/links`, linkId);
    await updateDoc(linkRef, newLinkData);
    console.log('Document updated successfully');
  } catch (e) {
    console.error('Error updating document:', e);
    throw new Error(e);
  }
};

// Delete Link
const deleteLink = async (userId, linkId) => {
  try {
    const linkRef = doc(db, `users/${userId}/links`, linkId);
    await deleteDoc(linkRef);
    console.log('Document deleted successfully');
  } catch (e) {
    console.error('Error deleting document:', e);
    throw new Error(e);
  }
};

// Export all functions
export { addLinkToDB as addLink, fetchUserLinks as fetchLinks, fetchLinksByUsername, updateLink, deleteLink };
