"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/app/onboarding/OnboardingProgress";
import { DISABILITY_TYPES } from "@/constants/disability";
import { useOnboardingStore } from "@/lib/zustand/onboardingStore";

export default function DisabilityOnboardingPage() {
  const router = useRouter();
  const { disabilityCode, setDisability } = useOnboardingStore();
  const [selected, setSelected] = useState<number | null>(disabilityCode);

  const isValid = selected != null;

  const handleNext = () => {
    if (!isValid || selected == null) return;
    setDisability(selected);
    router.push("/onboarding/interests");
  };

  return (
    <main className="flex min-h-screen flex-col overflow-y-auto px-6 py-8">
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
      <OnboardingProgress currentStep={3} totalSteps={4} />

      {/* 타이틀 영역 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">장애 유형</h1>
        <p className="mt-2 text-xs text-gray-500">
          현재 보호 대상의 장애 유형을 선택해주세요.
        </p>
      </section>

      {/* 장애 유형 선택 - 내부 스크롤 영역 */}
      <section className="flex-1">
        <div className="max-h-[260px] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            {DISABILITY_TYPES.map((item) => {
              const active = selected === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelected(item.code)}
                  className={`h-12 cursor-pointer rounded-xl border text-xs font-medium transition-colors ${
                    active
                      ? "border-emerald-500 bg-emerald-200 text-black"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 하단 버튼 */}
      <footer className="mt-6 pb-2">
        <button
          type="button"
          disabled={!isValid}
          onClick={handleNext}
          className={`w-full rounded-xl py-3 text-sm font-semibold ${
            isValid
              ? "bg-emerald-300 text-black cursor-pointer"
              : "bg-emerald-100 text-emerald-400 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </footer>
    </main>
  );
}
