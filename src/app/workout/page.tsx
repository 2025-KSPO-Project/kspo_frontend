"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WorkoutMainPage() {
  const router = useRouter();
  const { name } = useUser();
  const userName = name ?? "케어핏";
  const [showBadge, setShowBadge] = useState(false);

  const BADGE_KEY_PREFIX = "carefit_todayBadge_done_";

  function getTodayKey() {
    const today = new Date();
    const y = today.getFullYear();
    const m = `${today.getMonth() + 1}`.padStart(2, "0");
    const d = `${today.getDate()}`.padStart(2, "0");
    return `${BADGE_KEY_PREFIX}${y}-${m}-${d}`;
  }

  // 오늘 운동증 완료 여부 로컬스토리지에서 읽기
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = getTodayKey();
    const value = window.localStorage.getItem(key);
    // 저장된 값이 없으면 오늘의 운동증 표시
    setShowBadge(value !== "done");
  }, []);

  return (
    <div className="relative ">
      {/* 상단 카드 2개 높이의 '절반 정도'에만 들어가는 배경색 블록 */}
      {/* 숫자는 카드/헤더 높이에 맞춰 조절 가능: h-[220px], h-[240px] 등 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-green-200" />

      {/* 실제 콘텐츠 */}
      <div className="relative px-5 pt-10">
        {/* 상단 헤더 */}
        <header className="flex items-start justify-between">
          {/* 뒤로가기 버튼 - 왼쪽 상단 고정 */}
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <span className="text-lg leading-none">‹</span>
            </button>
          </div>

          {/* 중앙 인사 문구 */}
          <div className="flex flex-col items-center text-center">
            <h1 className="mt-1 text-lg font-bold text-gray-900">Carefit</h1>
            <p className="mt-1 text-[12px] text-gray-500">
              {userName}님을 위한 운동 파트너
            </p>
          </div>

          {/* 오른쪽 상단 오늘의 운동증 동그란 컴포넌트 */}
          <div>
            {showBadge && (
              <button
                type="button"
                onClick={() => router.push("/workout/badge")}
                className="cursor-pointer mt-0 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-gray-300 bg-white text-center text-[11px] font-medium text-gray-800 shadow-sm"
              >
                <span>오늘의</span>
                <span>운동증</span>
              </button>
            )}
          </div>
        </header>

        {/* 카드들 */}
        <section className="flex flex-col gap-4 pt-10">
          {/* 1. 운동일정 등록하기 */}
          <Link
            href="/workout/schedule/new"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm"
          >
            <p className="text-xs font-medium text-gray-500">
              나의 건강한 체크리스트
            </p>
            <p className="mt-2 text-base font-semibold text-gray-900">
              운동일정 등록하기
            </p>
          </Link>

          {/* 2. 오늘의 운동 시작하기 & 운동현황 */}
          <Link
            href="/workout/start"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm"
          >
            <p className="text-xs font-medium text-gray-500">오늘도 힘차게!</p>
            <p className="mt-2 text-base font-semibold text-gray-900">
              오늘의 운동 시작하기 &amp; 운동현황
            </p>
          </Link>

          {/* 3. 현재 나의 운동추이 */}
          <Link
            href="/workout/progress"
            className="mt-2 rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm"
          >
            <p className="text-xs font-medium text-gray-500">
              건강하게 나를 돌아보기
            </p>
            <p className="mt-2 text-base font-semibold text-gray-900">
              현재 나의 운동추이
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
