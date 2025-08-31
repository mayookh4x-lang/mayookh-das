
import React, { useState, useCallback } from 'react';
import type { AdData, AdFormData } from './types';
import Stepper from './components/Stepper';
import Step1ProductInfo from './components/steps/Step1ProductInfo';
import Step2Audience from './components/steps/Step2Audience';
import Step3Generate from './components/steps/Step3Generate';
import Step4Review from './components/steps/Step4Review';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<AdFormData>({
    productName: '',
    productDescription: '',
    targetAudience: '',
  });
  const [generatedAd, setGeneratedAd] = useState<AdData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 4;

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleFormDataChange = (data: Partial<AdFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleAdGenerated = (adData: AdData) => {
    setGeneratedAd(adData);
    handleNext();
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      productName: '',
      productDescription: '',
      targetAudience: '',
    });
    setGeneratedAd(null);
    setError(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ProductInfo
            formData={formData}
            onDataChange={handleFormDataChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2Audience
            formData={formData}
            onDataChange={handleFormDataChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3Generate
            formData={formData}
            onAdGenerated={handleAdGenerated}
            onError={(err) => {
              setError(err);
              handleBack(); // Go back to step 2 on error
            }}
          />
        );
      case 4:
        return generatedAd ? (
          <Step4Review adData={generatedAd} onReset={handleReset} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Automated Facebook Ad Builder
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Generate high-performance Facebook ads in seconds with AI.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-200">
            <Stepper currentStep={currentStep} totalSteps={totalSteps} />
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
                <p className="font-bold">An error occurred</p>
                <p>{error}</p>
              </div>
            )}
            <div className="mt-8">{renderStep()}</div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500">
          <p>Powered by Gemini AI</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
