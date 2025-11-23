"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/app/onboarding/OnboardingProgress";

const SIGUNGU_OPTIONS = [
  "종로구",
  "중구",
  "용산구",
  "성동구",
  "광진구",
  "동대문구",
  "중랑구",
  "성북구",
];

export default function LocationOnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const isValid = !!selected;

  const handleNext = () => {
    if (!isValid) return;
    // TODO: 선택한 시군구 상태 저장 (Zustand/Context 등)
    router.push("/onboarding/disability");
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
      <OnboardingProgress currentStep={1} totalSteps={3} />

      {/* 타이틀 영역 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">시군구 설정</h1>
        <p className="mt-2 text-xs text-gray-500">
          현재 거주하고 계신 시군구를 선택해주세요.
        </p>
      </section>

      {/* 시군구 선택 영역 */}
      <section className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {SIGUNGU_OPTIONS.map((gu) => {
            const active = selected === gu;
            return (
              <button
                key={gu}
                type="button"
                onClick={() => setSelected(gu)}
                className={`h-12 cursor-pointer rounded-xl border text-sm font-medium transition-colors ${
                  active
                    ? "border-black-500 bg-blue-50 text-black-600"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {gu}
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
