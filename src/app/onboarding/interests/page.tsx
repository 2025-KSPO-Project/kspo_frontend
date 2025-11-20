"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/app/onboarding/page";

const SPORTS_OPTIONS = [
  "축구",
  "농구",
  "배드민턴",
  "수영",
  "러닝",
  "헬스",
  "요가/필라테스",
  "기타",
];

export default function InterestsOnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  const isValid = selected.length > 0;

  const handleComplete = () => {
    if (!isValid) return;
    // TODO: 선택한 관심 종목들 저장
    router.push("/onboarding/loading"); // 또는 완료 후 이동할 경로
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
      <OnboardingProgress currentStep={3} totalSteps={3} />

      {/* 타이틀 영역 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">관심 종목</h1>
        <p className="mt-2 text-xs text-gray-500">
          선호하는 혹은 관심있는 종목을 선택해주세요.
        </p>
        <p className="mt-1 text-[11px] text-blue-500">
          여러 개 선택할 수 있으며, 최소 1개 이상 선택해야 합니다.
        </p>
      </section>

      {/* 관심 종목 선택 (다중 선택) */}
      <section className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {SPORTS_OPTIONS.map((item) => {
            const active = selected.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleSelect(item)}
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
          onClick={handleComplete}
          className={`w-full rounded-xl py-3 text-sm font-semibold ${
            isValid
              ? "bg-black text-white cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          설정 완료
        </button>
      </footer>
    </main>
  );
}
