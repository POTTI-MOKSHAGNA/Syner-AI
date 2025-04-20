import React from 'react';

interface TabSelectorProps {
  currentMode: 'focus' | 'break' | 'rest';
  onSelectMode: (mode: 'focus' | 'break' | 'rest') => void;
  darkMode: boolean;
}

const TabSelector: React.FC<TabSelectorProps> = ({ currentMode, onSelectMode, darkMode }) => {
  const tabs = [
    { id: 'focus', label: 'Focus' },
    { id: 'break', label: 'Break' },
    { id: 'rest', label: 'Rest' },
  ];

  return (
    <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 py-3 text-center font-medium transition-all duration-300 
            ${currentMode === tab.id 
              ? darkMode 
                ? 'border-b-2 border-blue-400 text-blue-400' 
                : 'border-b-2 border-blue-500 text-blue-500'
              : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }
          `}
          onClick={() => onSelectMode(tab.id as 'focus' | 'break' | 'rest')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;