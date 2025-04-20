/**
 * Retrieves the current streak from localStorage
 * @returns Current streak count
 */
export const getStreak = (): number => {
  const streak = localStorage.getItem('streak');
  return streak ? parseInt(streak, 10) : 0;
};

/**
 * Saves the streak count to localStorage
 * @param streak Streak count to save
 */
export const setStreak = (streak: number): void => {
  localStorage.setItem('streak', streak.toString());
};

/**
 * Checks if a session was completed today
 * @returns Boolean indicating if a session was completed today
 */
export const hasCompletedSessionToday = (): boolean => {
  const lastSessionDate = localStorage.getItem('lastSessionDate');
  if (!lastSessionDate) return false;
  
  const today = new Date().toDateString();
  return lastSessionDate === today;
};

/**
 * Records that a session was completed today
 */
export const markSessionCompleted = (): void => {
  const today = new Date().toDateString();
  localStorage.setItem('lastSessionDate', today);
};