import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getRandomReward } from '../data/rewards';

interface RewardModalProps {
  onClose: () => void;
  darkMode: boolean;
}

const RewardModal: React.FC<RewardModalProps> = ({ onClose, darkMode }) => {
  const [reward, setReward] = useState<{ type: 'quote' | 'meme'; content: string }>({ 
    type: 'quote', 
    content: '' 
  });
  
  useEffect(() => {
    const randomReward = getRandomReward();
    setReward(randomReward);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div 
        className={`relative max-w-md w-full rounded-lg p-6 shadow-xl transform transition-all duration-300 animate-scale-in ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-opacity-10 hover:bg-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl text-yellow font-bold mb-4 text-center">
          🎉 Great Job! 🎉
        </h2>
        
        <div className="flex flex-col items-center">
          {reward.type === 'quote' ? (
            <div className="text-center">
              <p className={`text-lg italic mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                "{reward.content}"
              </p>
            </div>
          ) : (
            <div className="my-2">
              <img 
                src={reward.content} 
                alt="Motivational meme" 
                className="max-w-full h-auto rounded-lg shadow-sm" 
              />
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
            } text-white`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;