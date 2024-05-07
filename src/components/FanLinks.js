// src/components/FanLinks.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLinksByUsername } from './links/links';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

// Function to ensure the URL has a proper protocol
const ensureAbsoluteUrl = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

const FanLinks = () => {
  const { username } = useParams();
  const [links, setLinks] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [buttonColor, setButtonColor] = useState('#0000ff');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinksAndSettings = async () => {
      try {
        // Fetch the links by username
        const fetchedLinks = await fetchLinksByUsername(username);
        setLinks(fetchedLinks);

        // Fetch the user settings
        if (fetchedLinks.length > 0) {
          const userId = fetchedLinks[0].userId;
          const userRef = doc(db, 'users', userId);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const settings = userData.settings || {};
            setBackgroundColor(settings.backgroundColor || '#ffffff');
            setButtonColor(settings.buttonColor || '#0000ff');
          } else {
            setError(`User settings not found for userId: ${userId}`);
          }
        } else {
          setError(`No links found for user '${username}'`);
        }
      } catch (err) {
        setError(`Error loading links: ${err.message}`);
      }
    };

    fetchLinksAndSettings();
  }, [username]);

  if (error) {
    return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;
  }

  return (
    <div style={{ backgroundColor, padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ color: buttonColor }}>{`${username}'s Links`}</h1>
      {links.map((link) => (
        <a
          key={link.id}
          href={ensureAbsoluteUrl(link.url)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: buttonColor,
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          {link.url}
        </a>
      ))}
    </div>
  );
};

export default FanLinks;
