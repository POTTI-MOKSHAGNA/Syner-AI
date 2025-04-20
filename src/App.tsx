import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import TabSelector from './components/TabSelector';
import RewardModal from './components/RewardModal';
import DarkModeToggle from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';
import { useTimer } from './hooks/useTimer';
import { useStreak } from './hooks/useStreak';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { streak } = useStreak();
  const { 
    time, 
    isRunning, 
    mode, 
    selectedTime,
    isCompleted,
    setIsCompleted,
    startTimer, 
    pauseTimer, 
    resetTimer, 
    setTime,
    setMode,
    setSelectedTime
  } = useTimer();
  
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setShowReward(true);
      setIsCompleted(false);
    }
  }, [isCompleted, setIsCompleted]);

  const handleCloseReward = () => {
    setShowReward(false);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
      darkMode ? 'bg-pattern bg-opacity-90' : 'bg-pattern-light'
    }`}>
      {/* Decorative circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full ${
          darkMode ? 'bg-purple-500/30' : 'bg-blue-500/20'
        } blur-3xl floating`}></div>
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full ${
          darkMode ? 'bg-blue-500/30' : 'bg-purple-500/20'
        } blur-3xl floating`} style={{ animationDelay: '-1.5s' }}></div>
      </div>

      <div className="w-full max-w-2xl px-4">
        <div className={`mb-8 p-6 rounded-2xl ${
          darkMode ? 'glass-effect bg-opacity-30' : 'glass-effect-light'
        } shadow-xl`}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Syner AI Timer
            </h1>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          
          <div className={`rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/90'
          }`}>
            <TabSelector 
              currentMode={mode} 
              onSelectMode={setMode} 
              darkMode={darkMode} 
            />
            
            <Timer 
              time={time}
              isRunning={isRunning}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              resetTimer={resetTimer}
              setTime={setTime}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              darkMode={darkMode}
            />
          </div>
          
          <div className={`mt-8 p-6 rounded-xl ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/90'
          } shadow-lg`}>
            <div className="flex items-center justify-center space-x-2">
              <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Current streak:
              </span>
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {streak}
                </span>
                <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  sessions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showReward && (
        <RewardModal 
          onClose={handleCloseReward} 
          darkMode={darkMode} 
        />
      )}
    </div>
  );
}

export default App;