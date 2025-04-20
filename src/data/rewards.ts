interface Reward {
  type: 'quote' | 'meme';
  content: string;
}

// Collection of motivational quotes
const quotes: string[] = [
  "The secret of getting ahead is getting started. – Mark Twain",
  "It always seems impossible until it's done. – Nelson Mandela",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
  "The future depends on what you do today. – Mahatma Gandhi",
  "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Focus on being productive instead of busy. – Tim Ferriss",
  "The way to get started is to quit talking and begin doing. – Walt Disney",
  "Don't count the days, make the days count. – Muhammad Ali",
  "You don't have to be great to start, but you have to start to be great. – Zig Ziglar",
  "The only place where success comes before work is in the dictionary. – Vidal Sassoon",
];

// Collection of meme image URLs
const memes: string[] = [
  "https://res.cloudinary.com/dw5vhltqw/image/upload/v1745174766/Screenshot_2025-04-21_001439_bvcyhf.png", // Distracted boyfriend meme
  "https://res.cloudinary.com/ddgpk6auc/image/upload/v1745174809/Screenshot_2025-04-21_001504_rxip2s.png",   // Success Kid
  "https://res.cloudinary.com/dw5vhltqw/image/upload/v1745174814/Screenshot_2025-04-21_001636_mquuws.png",  // One Does Not Simply
  "https://res.cloudinary.com/dw5vhltqw/image/upload/v1745174905/Screenshot_2025-04-21_001756_gafth8.png",   // Drakeposting
  "https://res.cloudinary.com/dw5vhltqw/image/upload/v1745174940/Screenshot_2025-04-21_001849_pzumeh.png"   // Change My Mind
];

/**
 * Returns a random reward (either quote or meme)
 * @returns A random reward object with type and content
 */
export const getRandomReward = (): Reward => {
  // Randomly choose between quote or meme (50/50 chance)
  const isQuote = Math.random() > 0.5;
  
  if (isQuote) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return {
      type: 'quote',
      content: quotes[randomIndex]
    };
  } else {
    const randomIndex = Math.floor(Math.random() * memes.length);
    return {
      type: 'meme',
      content: memes[randomIndex]
    };
  }
};