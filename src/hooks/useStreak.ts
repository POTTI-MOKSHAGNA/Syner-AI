import { useState, useEffect, useCallback } from 'react';
import { getStreak, setStreak } from '../utils/storageUtils';

export const useStreak = () => {
  const [streak, setStreakState] = useState(0);

  // Load streak from localStorage on initial render
  useEffect(() => {
    const savedStreak = getStreak();
    setStreakState(savedStreak);
  }, []);

  const incrementStreak = useCallback(() => {
    setStreakState((prevStreak) => {
      const newStreak = prevStreak + 1;
      setStreak(newStreak);
      return newStreak;
    });
  }, []);

  const resetStreak = useCallback(() => {
    setStreakState(0);
    setStreak(0);
  }, []);

  return {
    streak,
    incrementStreak,
    resetStreak,
  };
};