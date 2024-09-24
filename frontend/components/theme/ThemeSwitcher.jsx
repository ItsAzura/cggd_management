import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/feature/themeSlice';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleThemeChange = () => {
    dispatch(toggleTheme()); // Thay đổi giữa dark và light
  };

  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      <button onClick={handleThemeChange}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default ThemeSwitcher;
