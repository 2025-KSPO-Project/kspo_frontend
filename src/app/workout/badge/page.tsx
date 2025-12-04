"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const BADGE_KEY_PREFIX = "carefit_todayBadge_done_";

function getTodayKey() {
  const today = new Date();
  const y = today.getFullYear();
  const m = `${today.getMonth() + 1}`.padStart(2, "0");
  const d = `${today.getDate()}`.padStart(2, "0");
  return `${BADGE_KEY_PREFIX}${y}-${m}-${d}`;
}

function getTodayLabel() {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  return `${y}년 ${m}월 ${d}일`;
}

export default function TodayBadgePage() {
  const router = useRouter();
  const { name } = useUser();
  const userName = name ?? "사용자";

  // 더미 운동 정보
  const workoutTitle = "가벼운 걷기 30분";
  const workoutStartTime = "19:30";

  const handleContinue = () => {
    router.push("/workout");
  };

  const handleFinish = () => {
    // 오늘 운동증 완료 플래그 저장
    if (typeof window !== "undefined") {
      const key = getTodayKey();
      window.localStorage.setItem(key, "done");
    }
    router.push("/workout/badge/complete");
  };

  return (
    <main className="flex min-h-screen flex-col bg-white px-4 py-6">
      {/* 헤더 */}
      <header className="mb-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer rounded-full border h-9 w-9  border-gray-300 px-2 py-1 text-xs text-gray-600"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
      </header>

      <section className="flex flex-1 flex-col rounded-2xl border border-gray-200 bg-gray-50 px-4 py-6">
        <h1 className="mb-4 text-lg font-semibold text-gray-900">
          {userName}님의 {getTodayLabel()} 운동
        </h1>

        <div className="space-y-2 text-sm text-gray-800">
          <p>
            <span className="font-semibold">오늘의 운동: </span>
            {workoutTitle}
          </p>
          <p>
            <span className="font-semibold">운동 시작시간: </span>
            {workoutStartTime}
          </p>
        </div>
      </section>
      <div className="mt-auto flex gap-3 pt-8">
        <button
          type="button"
          onClick={handleContinue}
          className="cursor-pointer flex-1 rounded-2xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-800"
        >
          운동계속
        </button>
        <button
          type="button"
          onClick={handleFinish}
          className="cursor-pointer flex-1 rounded-2xl bg-black py-3 text-sm font-semibold text-white"
        >
          운동종료
        </button>
      </div>
    </main>
  );
}
