"use client";

import { useState, useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

type WorkoutRecord = {
  title: string;
  duration: string; // '30분' 같은 형태
};

// 날짜별 더미 운동 기록 (YYYY-MM-DD)
const DUMMY_WORKOUTS: Record<string, WorkoutRecord> = {
  "2025-12-01": { title: "저강도 걷기", duration: "30분" },
  "2025-12-02": { title: "스트레칭 + 요가", duration: "20분" },
  "2025-12-05": { title: "실내 자전거", duration: "25분" },
};

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function WorkoutProgressPage() {
  const router = useRouter();
  const { name } = useUser();

  const today = new Date();
  const [currentYear] = useState(today.getFullYear());
  const [currentMonth] = useState(today.getMonth()); // 0~11
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startWeekday = firstDay.getDay(); // 0(일)~6(토)
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];

    // 앞쪽 비어 있는 칸
    for (let i = 0; i < startWeekday; i += 1) {
      days.push(null);
    }

    // 실제 날짜
    for (let d = 1; d <= daysInMonth; d += 1) {
      days.push(new Date(currentYear, currentMonth, d));
    }

    return days;
  }, [currentYear, currentMonth]);

  const selectedKey =
    selectedDate != null ? formatDate(selectedDate) : undefined;
  const selectedWorkout =
    selectedKey && DUMMY_WORKOUTS[selectedKey]
      ? DUMMY_WORKOUTS[selectedKey]
      : null;

  const monthLabel = `${currentYear}년 ${currentMonth + 1}월`;

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
          <h1 className="text-lg font-semibold text-gray-900">
            현재 {name ?? "사용자"}의 운동추이
          </h1>
        </div>
      </header>

      {/* 캘린더 + 아래 카드 */}
      <section className="flex flex-1 flex-col gap-4">
        {/* 캘린더 박스 */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3">
          {/* 월/연도 */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">
              {monthLabel}
            </span>
            {/* 필요하면 이전/다음 달 네비게이션 여기 추가 */}
          </div>

          {/* 요일 헤더 */}
          <div className="mb-1 grid grid-cols-7 text-center text-[11px] text-gray-500">
            {WEEKDAY_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} />;
              }

              const key = formatDate(day);
              const isToday = formatDate(today) === key;
              const isSelected =
                selectedDate && formatDate(selectedDate) === key;
              const hasWorkout = Boolean(DUMMY_WORKOUTS[key]);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={`cursor-pointer mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs
                    ${
                      isSelected
                        ? "bg-teal-500 text-white"
                        : isToday
                          ? "border border-teal-400 text-gray-900"
                          : "text-gray-800"
                    }`}
                >
                  {day.getDate()}
                  {hasWorkout && (
                    <span className="ml-0.5 -mt-3.5 inline-block h-1.5 w-1.5 rounded-full bg-teal-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택한 날짜의 운동 정보 카드 */}
        {selectedDate && (
          <div className="mt-2 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">선택한 날짜</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {selectedKey} ({WEEKDAY_LABELS[selectedDate.getDay()]})
            </p>

            {selectedWorkout ? (
              <div className="mt-3 space-y-1 text-sm text-gray-800">
                <p>
                  <span className="font-medium">운동명:</span>{" "}
                  {selectedWorkout.title}
                </p>
                <p>
                  <span className="font-medium">운동시간:</span>{" "}
                  {selectedWorkout.duration}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-xs text-gray-500">
                해당 날짜에는 기록된 운동이 없습니다.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
