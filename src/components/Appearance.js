import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSettings, updateSettings } from '../features/settingsSlice';

const Appearance = () => {
  const dispatch = useDispatch();
  const { user, backgroundColor, buttonColor } = useSelector(state => ({
    user: state.user.data,
    backgroundColor: state.settings.backgroundColor,
    buttonColor: state.settings.buttonColor
  }));

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);

  const handleBackgroundColorChange = (event) => {
    dispatch(updateSettings({ userId: user.uid, newSettings: { backgroundColor: event.target.value } }));
  };

  const handleButtonColorChange = (event) => {
    dispatch(updateSettings({ userId: user.uid, newSettings: { buttonColor: event.target.value } }));
  };

  return (
    <div className="appearance-page p-4">
      <h1 className="text-xl font-bold mb-4">Customize Appearance</h1>
      <div className="color-picker">
        <label>
          Background Color:
          <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
        </label>
      </div>
      <div className="color-picker mt-4">
        <label>
          Button Color:
          <input type="color" value={buttonColor} onChange={handleButtonColorChange} />
        </label>
      </div>
    </div>
  );
};

export default Appearance;
