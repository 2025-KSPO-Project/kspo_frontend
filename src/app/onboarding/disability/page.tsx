"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/app/onboarding/OnboardingProgress";

const DISABILITY_OPTIONS = [
  "지체 장애",
  "시각 장애",
  "청각 장애",
  "발달/지적 장애",
  "뇌병변 장애",
  "기타",
];

export default function DisabilityOnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const isValid = !!selected;

  const handleNext = () => {
    if (!isValid) return;
    // TODO: 선택한 장애 유형 저장
    router.push("/onboarding/interests");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      {/* 상단 헤더 */}
      <header className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-gray-500"
        >
          뒤로
        </button>
      </header>

      {/* 진행도 */}
      <OnboardingProgress currentStep={2} totalSteps={3} />

      {/* 타이틀 영역 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">장애 유형</h1>
        <p className="mt-2 text-xs text-gray-500">
          현재 보호 대상의 장애 유형을 선택해주세요.
        </p>
      </section>

      {/* 장애 유형 선택 */}
      <section className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {DISABILITY_OPTIONS.map((item) => {
            const active = selected === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setSelected(item)}
                className={`h-12 cursor-pointer rounded-xl border text-sm font-medium transition-colors ${
                  active
                    ? "border-black-500 bg-blue-50 text-black-600"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {/* 하단 버튼 */}
      <footer className="mt-6">
        <button
          type="button"
          disabled={!isValid}
          onClick={handleNext}
          className={`w-full rounded-xl py-3 text-sm font-semibold ${
            isValid
              ? "bg-black text-white cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </footer>
    </main>
  );
}
