"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const dummySchedules = [
  {
    id: 1,
    title: "저녁 산책 30분",
    date: "2025-12-01",
    isToday: true,
  },
  {
    id: 2,
    title: "가벼운 스트레칭",
    date: "2025-12-03",
    isToday: false,
  },
  {
    id: 3,
    title: "실내 자전거 20분",
    date: "2025-12-05",
    isToday: false,
  },
];

export default function WorkoutScheduleListPage() {
  const router = useRouter();
  const { name } = useUser();

  return (
    <main className="flex min-h-screen flex-col bg-white px-4 py-6">
      {/* 상단 헤더 */}
      <header className="relative px-4 pt-4 pb-4">
        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        {/* 중앙 문구 */}
        <div className="mt-10 flex flex-col items-center text-center">
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            {name}님을 위한 운동 일정
          </h1>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        {dummySchedules.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <div>
              {item.isToday && (
                <p className="text-xs font-semibold text-red-500">오늘 운동!</p>
              )}
              <p className="text-sm font-semibold text-gray-900">
                제목: {item.title}
              </p>
              <p className="mt-1 text-xs text-gray-600">날짜: {item.date}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-700">
              선택
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
