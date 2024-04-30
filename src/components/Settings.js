import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBackgroundColor, setButtonColor, fetchUserSettings, persistSettingsToFirestore } from '../features/settingsSlice';

const Settings = () => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const backgroundColor = useSelector((state) => state.settings.backgroundColor);
  const buttonColor = useSelector((state) => state.settings.buttonColor);

  useEffect(() => {
    if (user) {
      // Dispatch fetchUserSettings thunk to fetch and update Redux state
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);

  const handleBackgroundColorChange = (e) => {
    const newColor = e.target.value;
    dispatch(setBackgroundColor(newColor));
    if (user) {
      // Dispatch persistSettingsToFirestore thunk to update Firestore
      dispatch(persistSettingsToFirestore({ userId: user.uid, settings: { backgroundColor: newColor } }));
    }
  };

  const handleButtonColorChange = (e) => {
    const newColor = e.target.value;
    dispatch(setButtonColor(newColor));
    if (user) {
      // Dispatch persistSettingsToFirestore thunk to update Firestore
      dispatch(persistSettingsToFirestore({ userId: user.uid, settings: { buttonColor: newColor } }));
    }
  };

  return (
    <div className="settings-panel">
      <div>
        <label>Background Color:</label>
        <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
      </div>
      <div>
        <label>Button Color:</label>
        <input type="color" value={buttonColor} onChange={handleButtonColorChange} />
      </div>
    </div>
  );
};

export default Settings;
