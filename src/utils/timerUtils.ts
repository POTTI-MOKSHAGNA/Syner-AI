/**
 * Formats seconds into a MM:SS display format
 * @param seconds Total seconds to format
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Calculates percentage of time elapsed
 * @param currentTime Current time in seconds
 * @param totalTime Total time in seconds
 * @returns Percentage completed (0-100)
 */
export const calculateProgress = (currentTime: number, totalTime: number): number => {
  if (totalTime === 0) return 0;
  return ((totalTime - currentTime) / totalTime) * 100;
};