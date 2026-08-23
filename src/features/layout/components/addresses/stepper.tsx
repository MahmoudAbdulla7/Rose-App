interface AddressFormStepperProps {
  step: number;
}

export default function Stepper({ step }: AddressFormStepperProps) {
  return (
    <div className="flex w-full items-center">
      <div
        className={`h-1.5 flex-[250] ${step >= 1 ? 'bg-maroon-600' : 'bg-zinc-200'}`}
      />

      <div
        className={`flex size-[25px] shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          step >= 1 ? 'bg-maroon-600 text-white' : 'bg-zinc-200 text-zinc-500'
        }`}
      >
        1
      </div>

      <div
        className={`h-1.5 flex-[350] ${step >= 2 ? 'bg-maroon-600' : 'bg-zinc-200'}`}
      />

      <div
        className={`flex size-[25px] shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          step >= 2 ? 'bg-maroon-600 text-white' : 'bg-zinc-200 text-zinc-500'
        }`}
      >
        2
      </div>
    </div>
  );
}
