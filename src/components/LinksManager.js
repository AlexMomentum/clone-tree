import React, { useEffect, useState } from 'react';
import { addLink, fetchLinks, updateLink, deleteLink } from './links/links';
import { useSelector } from 'react-redux';
//import LogoutButton from './LogoutButton';  // Import the LogoutButton

const LinksManager = ({ userId, styles = { backgroundColor: '#fff', buttonColor: '#000'} }) => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [editLink, setEditLink] = useState({});
  const buttonColor = useSelector(state => state.settings.buttonColor);

  useEffect(() => {
    const loadLinks = async () => {
      const loadedLinks = await fetchLinks(userId);
      setLinks(loadedLinks);
    };

    loadLinks();
  }, [userId]);

  const handleAddLink = async () => {
    if (newLink) {
      const linkId = await addLink(userId, { url: newLink });
      setLinks([...links, { id: linkId, url: newLink }]);
      setNewLink('');  // Clear the input after adding
    }
  };

  const handleDeleteLink = async (linkId) => {
    await deleteLink(userId, linkId);
    setLinks(links.filter(link => link.id !== linkId));
  };

  const handleUpdateLink = async (linkId) => {
    if (editLink.url && editLink.id) {
      await updateLink(userId, editLink.id, { url: editLink.url });
      const updatedLinks = links.map(link => link.id === editLink.id ? { ...link, url: editLink.url } : link);
      setLinks(updatedLinks);
      setEditLink({});  // Clear the editing state
    }
  };

  const startEdit = (link) => {
    setEditLink(link);
  };

  return (
    <div>
      <input
        value={newLink}
        onChange={(e) => setNewLink(e.target.value)}
        placeholder="Add new link"
      />
      <button style={{ backgroundColor: buttonColor, color: 'white' }} onClick={handleAddLink}>
        Add Link
      </button>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            {editLink.id === link.id ? (
              <input
                value={editLink.url}
                onChange={(e) => setEditLink({ ...editLink, url: e.target.value })}
              />
            ) : (
              <span>{link.url}</span>
            )}
            <button style={{ backgroundColor: buttonColor, color: 'white' }} onClick={() => handleUpdateLink(link.id)}>
              Save
            </button>
            <button style={{ backgroundColor: buttonColor, color: 'white' }} onClick={() => handleDeleteLink(link.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksManager;
