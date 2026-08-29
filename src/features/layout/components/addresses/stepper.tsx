interface AddressFormStepperProps {
  step: number;
}

function StepDot({ stepNumber, active }: { stepNumber: number; active: boolean }) {
  return (
    <div
      className={`relative z-10 flex size-6.25 shrink-0 items-center justify-center rounded-full text-sm leading-normal font-semibold ${active ? 'bg-maroon-600 text-white' : 'bg-zinc-200 text-zinc-500'
        }`}
    >
      {stepNumber}
    </div>
  );
}

function StepSegment({
  active,
  className,
}: {
  active: boolean;
  className: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative h-1.5 ${className} ${active ? 'bg-maroon-600' : 'bg-transparent'}`}
    />
  );
}

export default function Stepper({ step }: AddressFormStepperProps) {
  return (
    <div
      className="relative flex w-full items-center"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={2}
    >
      {/* Full-width inactive track — Figma: zinc-200, 6px */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-zinc-200"
      />

      {/* Leading segment — Figma: 200px */}
      <StepSegment active={step >= 1} className="min-w-0 flex-200" />

      <StepDot stepNumber={1} active={step >= 1} />

      {/* Middle segment — Figma: 340px */}
      <StepSegment active={step >= 2} className="min-w-0 flex-340" />

      <StepDot stepNumber={2} active={step >= 2} />

      {/* Trailing fill after step 2 */}
      <StepSegment active={step >= 2} className="min-w-0 flex-200" />

    </div>
  );
}
