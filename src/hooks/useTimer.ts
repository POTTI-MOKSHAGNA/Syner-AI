import { useState, useEffect, useCallback, useRef } from 'react';
import { useStreak } from './useStreak';
import { markSessionCompleted } from '../utils/storageUtils';

type TimerMode = 'focus' | 'break' | 'rest';

const DEFAULT_TIMES = {
  focus: 1500, // 1 minute in seconds
  break: 300, // 5 minutes in seconds
  rest: 900, // 15 minutes in seconds
};

export const useTimer = () => {
  const [time, setTime] = useState(DEFAULT_TIMES.focus);
  const [selectedTime, setSelectedTime] = useState(DEFAULT_TIMES.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [isCompleted, setIsCompleted] = useState(false);
  const { incrementStreak, resetStreak } = useStreak();
  const timerRef = useRef<number | null>(null);
  const originalTimeRef = useRef(selectedTime);

  // Reset timer when mode changes
  useEffect(() => {
    setTime(DEFAULT_TIMES[mode]);
    setSelectedTime(DEFAULT_TIMES[mode]);
    setIsRunning(false);
    originalTimeRef.current = DEFAULT_TIMES[mode];
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [mode]);

  // Handle timer countdown
  useEffect(() => {
    if (isRunning) {
      originalTimeRef.current = time;
      timerRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsCompleted(true);
            
            // Only increment streak when focus mode is completed
            if (mode === 'focus') {
              incrementStreak();
              markSessionCompleted();
            }
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, mode, incrementStreak]);

  const startTimer = useCallback(() => {
    if (time > 0) {
      setIsRunning(true);
    }
  }, [time]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (isRunning || time !== originalTimeRef.current) {
      if (mode === 'focus') {
        resetStreak();
      }
    }
    setIsRunning(false);
    setTime(selectedTime);
  }, [selectedTime, isRunning, time, mode, resetStreak]);

  return {
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
    setSelectedTime,
  };
};