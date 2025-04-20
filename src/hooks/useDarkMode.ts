import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  // Check if user has already set a preference
  const getSavedMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      return JSON.parse(savedMode);
    }
    // Use system preference as default
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode on component mount
  useEffect(() => {
    setDarkMode(getSavedMode());
  }, []);

  // Save preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return {
    darkMode,
    toggleDarkMode,
  };
};