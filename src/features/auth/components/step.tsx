interface IStepperProps {
  currentStep: number;
}
const totalSteps = 4;
export default function Step({ currentStep }: IStepperProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCurrent = currentStep === step;
        const isComplete = currentStep > step;
        const isActive = isCurrent || isComplete;

        return (
          <div key={step} className="contents">
            {/* Connector line before every step except the first */}
            {step > 1 && (
              <div
                className={`h-px flex-1 ${currentStep >= step ? 'bg-ds-primary' : 'bg-ds-primary-fade'}`}
              />
            )}

            {/* Step circle */}
            <div
              className={`flex size-6.25 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                isActive ? 'bg-ds-primary text-white' : 'bg-ds-primary-fade text-ds-primary'
              } ${isCurrent ? 'ring' : ''}`}
            >
              {step}
            </div>
          </div>
        );
      })}
    </div>
  );
}
