import { cn } from '@/shared/lib/utils';
import { REGISTER_STEP_ORDER, type RegisterStep } from '../lib/constants/steps.constant';

interface IStepperProps {
  currentStep: RegisterStep;
  onStepClick?: (step: RegisterStep) => void;
}

export function Step({ currentStep, onStepClick }: IStepperProps) {
  const currentIndex = REGISTER_STEP_ORDER.indexOf(currentStep);

  return (
    <div className="flex items-center gap-2">
      {REGISTER_STEP_ORDER.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isActive = index <= currentIndex;
        // Only completed steps can be revisited; forward steps require verification.
        const isClickable = index < currentIndex;

        return (
          <div key={step} className="contents">
            {/* Connector line before every step except the first */}
            {index > 0 && (
              <div
                className={cn('h-px flex-1', isActive ? 'bg-ds-primary' : 'bg-ds-primary-fade')}
              />
            )}

            {/* Step circle */}
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => onStepClick?.(step)}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-medium enabled:cursor-pointer',
                isActive ? 'bg-ds-primary text-white' : 'bg-ds-primary-fade text-ds-primary',
                isCurrent && 'ring',
              )}
            >
              {index + 1}
            </button>
          </div>
        );
      })}
    </div>
  );
}
