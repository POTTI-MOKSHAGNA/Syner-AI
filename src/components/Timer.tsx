import React, { useState } from 'react';
import { formatTime } from '../utils/timerUtils';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface TimerProps {
  time: number;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setTime: (time: number) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  darkMode: boolean;
}

const Timer: React.FC<TimerProps> = ({
  time,
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer,
  setTime,
  selectedTime,
  setSelectedTime,
  darkMode,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [minutes, setMinutes] = useState(Math.floor(selectedTime / 60));
  const [seconds, setSeconds] = useState(0);

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      const totalSeconds = minutes * 60 + seconds;
      setSelectedTime(totalSeconds);
      setTime(totalSeconds);
      startTimer();
    }
  };

  const handleReset = () => {
    resetTimer();
  };

  const handleTimeChange = (mins: number) => {
    setMinutes(mins);
    setSeconds(0);
    const totalSeconds = mins * 60;
    setSelectedTime(totalSeconds);
    setTime(totalSeconds);
    setShowSettings(false);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const secs = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
    setSeconds(secs);
    const totalSeconds = minutes * 60 + secs;
    setSelectedTime(totalSeconds);
    setTime(totalSeconds);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = Math.max(0, parseInt(e.target.value) || 0);
    setMinutes(mins);
    const totalSeconds = mins * 60 + seconds;
    setSelectedTime(totalSeconds);
    setTime(totalSeconds);
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div
          className={`text-8xl font-bold mb-8 transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text ${
            darkMode ? 'text-white' : 'text-transparent'
          }`}
        >
          {formatTime(time)}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStartPause}
            className={`flex items-center justify-center px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              isRunning
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            {isRunning ? (
              <>
                <Pause size={20} className="mr-2" /> Pause
              </>
            ) : (
              <>
                <Play size={20} className="mr-2" /> Start
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className={`flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            } shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            } shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {showSettings && (
        <div
          className={`p-6 rounded-xl transition-all duration-300 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          } shadow-lg`}
        >
          <h3 className="text-xl text-white font-semibold mb-4">Adjust Timer</h3>

          <div className="flex justify-center gap-4 mb-6">
            <div className="flex flex-col items-center">
              <label className="text-sm mb-1">Minutes</label>
              <input
                type="number"
                min="0"
                value={minutes}
                onChange={handleMinutesChange}
                className={`w-20 px-3 py-2 rounded-lg text-center ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white'
                }`}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-sm mb-1">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={handleSecondsChange}
                className={`w-20 px-3 py-2 rounded-lg text-center ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 5, 10, 15, 20, 25, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => handleTimeChange(mins)}
                className={`py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                  selectedTime === mins * 60
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : darkMode
                    ? 'bg-gray-800 hover:bg-gray-600 text-white'
                    : 'bg-white hover:bg-gray-200'
                } font-medium`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;