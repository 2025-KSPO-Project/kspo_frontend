"use client";

type OnboardingProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      {/* 진행 바 */}
      <div className="h-4 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-green-300 transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      {/* 단계 텍스트 */}
      <p className="mt-1 text-[11px] text-gray-400">
        {currentStep} / {totalSteps}
      </p>
    </div>
  );
}
