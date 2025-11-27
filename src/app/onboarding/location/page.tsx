"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/app/onboarding/OnboardingProgress";
import { DISTRICTS } from "@/constants/regions";
import { useOnboardingStore } from "@/lib/zustand/onboardingStore";

export default function LocationOnboardingPage() {
  const router = useRouter();
  const { provinceCode, districtCode, setDistrict } = useOnboardingStore();
  const [selected, setSelected] = useState<string | null>(districtCode);

  // 시도 선택 없이 직접 진입하는 경우 방어
  useEffect(() => {
    if (!provinceCode) {
      router.replace("/onboarding/init");
    }
  }, [provinceCode, router]);

  const options = useMemo(
    () => DISTRICTS.filter((d) => d.provinceCode === provinceCode),
    [provinceCode]
  );

  const isValid = !!selected;

  const handleNext = () => {
    if (!isValid || !selected) return;
    setDistrict(selected);
    router.push("/onboarding/disability");
  };

  if (!provinceCode) return null;

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
      <OnboardingProgress currentStep={2} totalSteps={4} />

      {/* 타이틀 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">시군구 설정</h1>
        <p className="mt-2 text-xs text-gray-500">
          현재 거주하고 계신 시군구를 선택해주세요.
        </p>
      </section>

      {/* 시군구 선택 - 내부 스크롤 영역 */}
      <section className="flex-1">
        <div className="max-h-170 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            {options.map((gu) => {
              const active = selected === gu.code;
              return (
                <button
                  key={gu.code}
                  type="button"
                  onClick={() => setSelected(gu.code)}
                  className={`h-12 cursor-pointer rounded-xl border text-sm font-medium transition-colors ${
                    active
                      ? "border-emerald-500 bg-emerald-200 text-black"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {gu.name}
                </button>
              );
            })}
          </div>
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
