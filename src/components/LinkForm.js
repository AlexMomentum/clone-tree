import React, { useState, useEffect } from 'react';
import '../ModalStyles.css'; // Adjust the path as necessary

const LinkForm = ({ isOpen, closeForm, linkDetails, saveLink }) => {
  const [link, setLink] = useState({ id: null, url: '' });

  useEffect(() => {
    // When linkDetails change, update local state
    if (linkDetails) {
      setLink(linkDetails);
    }
  }, [linkDetails]);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveLink(link);
    closeForm();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={link.url}
          onChange={(e) => setLink({ ...link, url: e.target.value })}
          placeholder="Enter link URL"
        />
        <button type="submit">Save</button>
        <button onClick={closeForm} type="button">Cancel</button>
      </form>
    </div>
  );
};

export default LinkForm;
