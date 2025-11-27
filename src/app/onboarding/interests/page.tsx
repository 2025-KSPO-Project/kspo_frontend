"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/app/onboarding/OnboardingProgress";
import { MAIN_SPORTS } from "@/constants/mainSports";
import { useOnboardingStore } from "@/lib/zustand/onboardingStore";

export default function InterestsOnboardingPage() {
  const router = useRouter();
  const { sportCodes, toggleSport } = useOnboardingStore();
  const [selected, setSelected] = useState<number[]>(sportCodes);

  useEffect(() => {
    setSelected(sportCodes);
  }, [sportCodes]);

  const handleToggle = (code: number) => {
    toggleSport(code);
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const isValid = selected.length > 0;

  const handleComplete = () => {
    if (!isValid) return;
    router.push("/onboarding/loading");
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
      <OnboardingProgress currentStep={4} totalSteps={4} />

      {/* 타이틀 영역 */}
      <section className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">관심 종목</h1>
        <p className="mt-2 text-xs text-gray-500">
          선호하는 혹은 관심있는 종목을 선택해주세요.
        </p>
        <p className="mt-1 text-[11px] text-emerald-600">
          여러 개 선택할 수 있으며, 최소 1개 이상 선택해야 합니다.
        </p>
      </section>

      {/* 관심 종목 선택 (다중 선택) - 내부 스크롤 영역 */}
      <section className="flex-1">
        <div className="max-h-[260px] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            {MAIN_SPORTS.map((item) => {
              const active = selected.includes(item.code);
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleToggle(item.code)}
                  className={`h-12 cursor-pointer rounded-xl border text-sm font-medium transition-colors ${
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
          onClick={handleComplete}
          className={`w-full rounded-xl py-3 text-sm font-semibold ${
            isValid
              ? "bg-emerald-300 text-black cursor-pointer"
              : "bg-emerald-100 text-emerald-400 cursor-not-allowed"
          }`}
        >
          설정 완료
        </button>
      </footer>
    </main>
  );
}
