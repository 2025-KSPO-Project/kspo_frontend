"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/app/onboarding/OnboardingProgress";
import { PROVINCES } from "@/constants/regions";
import { useOnboardingStore } from "@/lib/zustand/onboardingStore";

export default function InitOnboardingPage() {
  const router = useRouter();
  const { provinceCode, setProvince } = useOnboardingStore();
  const [selected, setSelected] = useState<string | null>(provinceCode);

  const isValid = !!selected;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !selected) return;

    setProvince(selected);
    router.push("/onboarding/location"); // 시군구 설정 페이지
  };

  // 시도 바뀔 때마다 store에 바로 반영
  useEffect(() => {
    if (selected) setProvince(selected);
  }, [selected, setProvince]);

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      {/* 상단 바 */}
      <header className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-gray-400"
        >
          뒤로
        </button>
      </header>

      {/* 진행도 */}
      <OnboardingProgress currentStep={1} totalSteps={4} />

      {/* 타이틀 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">시·도 설정</h1>
        <p className="mt-2 text-xs text-gray-500">
          현재 거주하고 계신 시·도를 선택해주세요.
          <br />
          이후 시군구, 장애 유형, 관심 종목 추천에 활용돼요.
        </p>
      </section>

      {/* 시도 선택 */}
      <form onSubmit={handleNext} className="flex flex-1 flex-col gap-4">
        <section className="flex-1">
          {/* 내부 스크롤 영역 */}
          <div className="max-h-170 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              {PROVINCES.map((p) => {
                const active = selected === p.code;
                return (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => setSelected(p.code)}
                    className={`h-12 cursor-pointer rounded-xl border text-sm font-medium transition-colors ${
                      active
                        ? "border-emerald-500 bg-emerald-200 text-black"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className="mt-auto flex flex-col gap-3">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full rounded-xl py-3 text-sm font-semibold ${
              isValid
                ? "bg-emerald-300 text-black cursor-pointer"
                : "bg-emerald-100 text-emerald-400 cursor-not-allowed"
            }`}
          >
            다음
          </button>
        </div>
      </form>
    </main>
  );
}
