"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function WorkoutMainPage() {
  const { name } = useUser();
  const userName = name ?? "케어핏";

  return (
    <div className="relative ">
      {/* 상단 카드 2개 높이의 '절반 정도'에만 들어가는 배경색 블록 */}
      {/* 숫자는 카드/헤더 높이에 맞춰 조절 가능: h-[220px], h-[240px] 등 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-green-200" />

      {/* 실제 콘텐츠 */}
      <div className="relative px-5 pt-10">
        {/* 상단 헤더 (로고 + 사용자명) */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-black">
              Carefit
            </h1>
            <h1 className="mt-2 text-lg text-black-50">
              {userName}님을 위한 운동 파트너
            </h1>
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
