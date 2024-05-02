import React, { useEffect, useState } from 'react';
import { addLink, fetchLinks, updateLink, deleteLink } from './links/links';
import { useSelector } from 'react-redux';

const LinksManager = ({ userId }) => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [editLink, setEditLink] = useState({});
  const [addingLink, setAddingLink] = useState(false);
  const buttonColor = useSelector(state => state.settings.buttonColor);

  useEffect(() => {
    const loadLinks = async () => {
      const loadedLinks = await fetchLinks(userId);
      setLinks(loadedLinks);
    };
    loadLinks();
  }, [userId]);

  const handleAddOrUpdateLink = async () => {
    if (editLink.id) {
      // Update existing link
      await updateLink(editLink.id, { url: newLink });
      const updatedLinks = links.map(link => 
        link.id === editLink.id ? { ...link, url: newLink } : link
      );
      setLinks(updatedLinks);
    } else {
      // Add new link
      const linkId = await addLink(userId, { url: newLink });
      setLinks([...links, { id: linkId, url: newLink }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setAddingLink(false);
    setEditLink({});
    setNewLink('');
  };

  const openForm = (link) => {
    if (link) {
      setEditLink(link);
      setNewLink(link.url);
    } else {
      setEditLink({});
      setNewLink('');
    }
    setAddingLink(true);
  };

  const toggleAddLink = () => {
    if (addingLink) {
      resetForm();
    } else {
      openForm();
    }
  };

  return (
    <div>
      <button onClick={toggleAddLink} style={{ backgroundColor: buttonColor, color: 'white' }}>
        {addingLink ? 'Cancel' : '+ Add Link'}
      </button>
      {addingLink && (
        <div>
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter URL"
          />
          <button style={{ backgroundColor: buttonColor, color: 'white' }} onClick={handleAddOrUpdateLink}>
            {editLink.id ? 'Save Changes' : 'Add Link'}
          </button>
        </div>
      )}
      <ul style={{ padding: 0 }}>
        {links.map(link => (
          <li key={link.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span>{link.url}</span>
            <div>
              <button onClick={() => openForm(link)}>Edit</button>
              <button onClick={() => deleteLink(link.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksManager;
