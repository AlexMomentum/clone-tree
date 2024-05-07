import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const fetchLinksByUsername = async (username) => {
  try {
    const userQuery = query(collection(db, 'users'), where('username', '==', username));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      throw new Error('User not found');
    }
    const userId = userSnapshot.docs[0].id;
    const linksQuery = collection(db, `users/${userId}/links`);
    const linksSnapshot = await getDocs(linksQuery);

    const links = linksSnapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
      backgroundColor: doc.data().backgroundColor || 'white',
      order: doc.data().order || 0
    }));
    return links;
  } catch (e) {
    console.error('Error fetching links by username:', e);
    throw e;
  }
};

export { fetchLinksByUsername };
