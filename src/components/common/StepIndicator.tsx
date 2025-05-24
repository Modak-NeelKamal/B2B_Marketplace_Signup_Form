import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: { id: string; title: string }[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step indicator */}
              <div className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onStepClick && onStepClick(index)}
                  disabled={!onStepClick || index > currentStep}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : isCurrent
                      ? 'border-teal-600 text-teal-600'
                      : 'border-gray-300 text-gray-300'
                  } ${onStepClick && index <= currentStep ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </button>
                <span
                  className={`absolute -bottom-6 text-xs font-medium ${
                    isCompleted || isCurrent ? 'text-teal-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 transition-colors duration-300 ${
                    index < currentStep ? 'bg-teal-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;