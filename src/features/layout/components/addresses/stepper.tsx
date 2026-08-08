interface AddressFormStepperProps {
  step: 1 | 2;
}

export default function Stepper({ step }: AddressFormStepperProps) {
  return (
    <div className="flex items-center">
      {/* Before Step 1 */}
      <div className="bg-ds-primary h-0.5 flex-1" />

      {/* Step 1 */}
      <div
        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
          step >= 1 ? 'bg-ds-primary' : 'bg-ds-border-muted'
        }`}
      >
        1
      </div>

      {/* Between Steps */}
      <div className={`h-0.5 flex-1 ${step >= 2 ? 'bg-ds-primary' : 'bg-ds-border-muted'}`} />

      {/* Step 2 */}
      <div
        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
          step >= 2 ? 'bg-ds-primary' : 'bg-ds-border-muted'
        }`}
      >
        2
      </div>

      {/* After Step 2 */}
      <div className="bg-ds-border-muted h-0.5 flex-1" />
    </div>
  );
}
