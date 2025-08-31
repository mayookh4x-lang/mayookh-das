
import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const steps = ['Product Info', 'Audience', 'Generate', 'Review'];

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full px-4 sm:px-0">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200"></div>
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-blue-600 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isActive
                      ? 'bg-white ring-4 ring-blue-200 text-blue-600'
                      : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {isCompleted ? (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <p
                className={`mt-2 text-center text-xs sm:text-sm font-medium
                  ${
                    isActive || isCompleted
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
              >
                {steps[i]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
