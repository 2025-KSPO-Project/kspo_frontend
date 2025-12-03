"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { LoadingIllustration } from "@/app/onboarding/loading/LoadingIllustration";

type Step = 1 | 2 | 3 | 4 | 5;

const conditionLabels = ["나쁨", "약간 나쁨", "보통", "약간 좋음", "좋음"];

const specialOptions = [
  "전날 운동을 했음",
  "부상이 있음",
  "현재 재활중",
  "간단한 운동을 처방받음",
  "강도높은 훈련 필요",
  "해당사항 없음",
];

export default function WorkoutRecommendFlowPage() {
  const router = useRouter();
  const { name } = useUser();
  const userName = name ?? "사용자";
  const [step, setStep] = useState<Step>(1);
  const [conditionIndex, setConditionIndex] = useState<number | null>(null);
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>([]);

  // step3 → 자동으로 step4로 전환 (추천중 → 완료)
  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => setStep(4), 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const progressPercent = (() => {
    switch (step) {
      case 1:
        return "20%";
      case 2:
        return "40%";
      case 3:
        return "60%";
      case 4:
        return "80%";
      case 5:
        return "100%";
    }
  })();

  const toggleSpecial = (label: string) => {
    setSelectedSpecial((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label]
    );
  };

  // 추천 결과 (더미)
  const recommendedWorkout = {
    title: "저강도 걷기 30분",
    summary: "야외에서 가볍게 걷기 좋은 루틴이에요.",
    minutes: 30,
  };

  // --- 렌더링 ---

  return (
    <main className="flex min-h-screen flex-col bg-white px-4 py-6">
      {/* 상단 헤더 */}
      <header className="relative px-4 pt-4 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
        <div className="mt-10 flex flex-col items-center text-center">
          <h1 className=" text-gray-500">
            {step <= 2 ? "질문" : step === 3 ? "분석중" : "결과"}
          </h1>
        </div>
      </header>
      <div className="flex flex-col gap-5">
        {/* 진행률 바 */}
        <div className="h-4 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-green-300 transition-[width] duration-300"
            style={{ width: progressPercent }}
          />
        </div>

        {/* STEP 별 UI */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                컨디션 체크
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                오늘 하루 컨디션을 체크해주세요!
              </p>
              <p className="mt-1 text-xs text-gray-500">
                컨디션에 맞는 운동 강도를 추천해 드릴게요.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              {conditionLabels.map((label, idx) => {
                const selected = conditionIndex === idx;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setConditionIndex(idx)}
                    className={`cursor-pointer flex h-12 w-12 items-center justify-center rounded-full text-[10px] ${
                      selected
                        ? "border-2 border-green-600 bg-green-600 text-white"
                        : "border border-gray-300 bg-white text-black"
                    }`}
                  >
                    {idx + 1}
                    <br />
                    {label}
                  </button>
                );
              })}
            </div>

            <div>
              <button
                type="button"
                disabled={conditionIndex === null}
                onClick={() => setStep(2)}
                className="cursor-pointer mt-auto w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white disabled:bg-gray-400"
              >
                다음
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <h1 className="text-lg font-semibold text-gray-900">
              오늘의 특이사항
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              오늘 하루 특이사항을 체크해주세요!
            </p>
            <p className="mt-1 text-xs text-gray-500">
              여러 개 선택도 가능해요. 조건에 맞춰 운동을 추천해 드립니다.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {specialOptions.map((label) => {
                const selected = selectedSpecial.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleSpecial(label)}
                    className={`cursor-pointer rounded-2xl border px-3 py-3 text-xs text-left ${
                      selected
                        ? "border-2 border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white text-gray-800"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="cursor-pointer mt-auto w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white"
            >
              추천하기
            </button>
          </>
        )}

        {step === 3 && (
          <div className="mt-16 flex flex-1 flex-col items-center justify-center">
            <LoadingIllustration />
            <p className="text-center text-sm text-gray-800">
              {userName}님의 체크리스트와 정보에 따라 <br />
              운동을 추천중입니다.
            </p>
          </div>
        )}

        {step === 4 && (
          <>
            <div className="mt-16 flex flex-1 flex-col items-center justify-center">
              {/* 완료 아이콘 */}
              <div className="mb-8 flex items-center justify-center">
                <div className="relative h-32 w-32">
                  {/* 바깥 원 (그라데이션 + 그림자) */}
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-emerald-400 to-green-600 shadow-[0_12px_30px_rgba(16,185,129,0.45)]" />
                  {/* 안쪽 원 */}
                  <div className="absolute inset-1.5 rounded-full  flex items-center justify-center">
                    {/* 체크 아이콘 */}
                    <span className="text-4xl text-white">✓</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-800">
                {userName}님의 체크리스트와 정보에 따른
                <br />
                운동추천을 완료했습니다.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep(5)}
              className="cursor-pointer mt-auto w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white"
            >
              보러가기
            </button>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="mb-6 text-lg text-center font-semibold text-gray-900">
              오늘의 추천운동
            </h1>

            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border border-gray-300">
                캐릭터 이미지
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {recommendedWorkout.title}
              </p>
              <p className="mt-2 text-xs text-gray-700">
                {recommendedWorkout.summary}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                추천 시간: 약 {recommendedWorkout.minutes}분
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/workout/checklist")}
              className="cursor-pointer mt-auto w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white"
            >
              운동시작하기
            </button>
          </>
        )}
      </div>
    </main>
  );
}
