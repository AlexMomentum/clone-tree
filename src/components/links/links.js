import { db } from '../../firebase/firebase-config';
import { collection, addDoc, getDocs, query, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const addLink = async (userId, linkData) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/links`), linkData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;  // Return the document ID
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error(e);  // Re-throw the error to be handled by caller
  }
};

const fetchLinks = async (userId) => {
  try {
    const q = query(collection(db, `users/${userId}/links`));
    const querySnapshot = await getDocs(q);
    const links = querySnapshot.docs.map(doc => ({
      id: doc.id,
      url: doc.data().url,
      backgroundColor: doc.data().backgroundColor || 'white', // Default to white if not specified
      order: doc.data().order || 0 // Default to 0 if not specified
    }));
    // Optionally, sort by order if you're using ordering
    links.sort((a, b) => a.order - b.order);
    return links;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw new Error(e);
  }
};


  const updateLink = async (userId, linkId, newLinkData) => {
    try {
      const linkRef = doc(db, `users/${userId}/links`, linkId);
      await updateDoc(linkRef, newLinkData);
      console.log("Document updated successfully");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw new Error(e);
    }
  };

  const deleteLink = async (userId, linkId) => {
    try {
      const linkRef = doc(db, `users/${userId}/links`, linkId);
      await deleteDoc(linkRef);
      console.log("Document deleted successfully");
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw new Error(e);
    }
  };

export { addLink, fetchLinks, updateLink, deleteLink };