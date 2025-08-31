
import React, { useEffect, useState } from 'react';
import { generateFullAd } from '../../services/geminiService';
import type { AdData, AdFormData } from '../../types';
import Loader from '../common/Loader';

interface Step3Props {
  formData: AdFormData;
  onAdGenerated: (adData: AdData) => void;
  onError: (error: string) => void;
}

const generationMessages = [
  "Crafting compelling ad copy...",
  "Designing eye-catching visuals...",
  "Analyzing your target audience...",
  "Unlocking marketing genius...",
  "Assembling the perfect ad..."
];

const Step3Generate: React.FC<Step3Props> = ({ formData, onAdGenerated, onError }) => {
  const [message, setMessage] = useState(generationMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = generationMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % generationMessages.length;
        return generationMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generate = async () => {
      try {
        const adData = await generateFullAd(formData);
        onAdGenerated(adData);
      } catch (e) {
        if (e instanceof Error) {
          onError(e.message);
        } else {
          onError("An unknown error occurred during ad generation.");
        }
      }
    };

    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, onAdGenerated, onError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center animate-fade-in">
      <Loader />
      <h2 className="text-2xl font-bold text-gray-800 mt-6">Generating Your Ad</h2>
      <p className="text-gray-600 mt-2 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default Step3Generate;
