import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundColor, setButtonColor } from '../features/settingsSlice';

const Appearance = () => {
  const dispatch = useDispatch();
  const { backgroundColor, buttonColor } = useSelector(state => state.settings);

  const handleBackgroundColorChange = (event) => {
    dispatch(setBackgroundColor(event.target.value));
  };

  const handleButtonColorChange = (event) => {
    dispatch(setButtonColor(event.target.value));
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
