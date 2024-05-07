// LinksManager.js
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { fetchLinks, addLink, updateLink } from './links/links';
import { FaGripVertical } from 'react-icons/fa';
import LinkForm from './LinkForm';

function getStyle(style, snapshot) {
  if (!snapshot.isDragging) return style;
  if (!snapshot.isDropAnimating) {
    return {
      ...style,
      boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
    };
  }
  return {
    ...style,
    transition: `all 0.2s ease`,
  };
}

const LinksManager = ({ userId }) => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const buttonColor = useSelector((state) => state.settings.buttonColor);

  useEffect(() => {
    const loadLinks = async () => {
      setIsLoading(true);
      try {
        const loadedLinks = await fetchLinks(userId);
        setLinks(loadedLinks);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load links:', error);
        setIsLoading(false);
      }
    };
    loadLinks();
  }, [userId]);

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;
      if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
        return;
      }
      const reorderedLinks = Array.from(links);
      const [removed] = reorderedLinks.splice(source.index, 1);
      reorderedLinks.splice(destination.index, 0, removed);

      setLinks(reorderedLinks);
      updateFirebaseLinkOrder(reorderedLinks).catch((error) => {
        console.error('Failed to update link order in Firebase:', error);
        setLinks(links); // Optionally revert the UI change if Firebase update fails
      });
    },
    [links, userId]
  );

  const updateFirebaseLinkOrder = async (links) => {
    const batch = writeBatch(db);
    links.forEach((link, index) => {
      const linkRef = doc(db, `users/${userId}/links`, link.id);
      batch.update(linkRef, { order: index });
    });
    try {
      await batch.commit();
    } catch (error) {
      console.error('Error updating Firebase link order:', error);
      throw error; // Re-throw to handle it in the calling context
    }
  };

  const handleEdit = (link) => {
    setCurrentLink(link);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setCurrentLink({ id: null, url: '' }); // Reset link for adding
    setFormOpen(true);
  };

  const saveLink = async (link) => {
    if (link.id) {
      await updateLink(userId, link.id, { url: link.url });
      setLinks(links.map((l) => (l.id === link.id ? { ...l, url: link.url } : l)));
    } else {
      const newLink = { id: await addLink(userId, { url: link.url, order: links.length }), url: link.url };
      setLinks([...links, newLink]);
    }
    setFormOpen(false);
  };

  const closeForm = () => {
    setFormOpen(false);
    setCurrentLink(null);
  };

  return (
    <div>
      <button
        onClick={handleAddLink}
        style={{
          padding: '10px',
          marginTop: '10px',
          backgroundColor: '#6200ee',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        + Add Link
      </button>
      {formOpen && (
        <LinkForm isOpen={formOpen} closeForm={closeForm} linkDetails={currentLink} saveLink={saveLink} />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {links.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...getStyle(provided.draggableProps.style, snapshot),
                        cursor: 'grab',
                        padding: '10px',
                        margin: '10px 0',
                        backgroundColor: snapshot.isDragging ? '#f4f4f4' : '#fff',
                        boxShadow: snapshot.isDragging ? '0px 0px 10px rgba(0,0,0,0.2)' : 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '5px',
                      }}
                    >
                      <span style={{ flexGrow: 1 }}>{link.url}</span>
                      <button onClick={() => handleEdit(link)} style={{ marginRight: '5px' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(link.id)}>Delete</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LinksManager;
