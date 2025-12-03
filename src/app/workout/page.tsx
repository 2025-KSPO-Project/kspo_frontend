"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function WorkoutMainPage() {
  const { name } = useUser();
  const userName = name ?? "케어핏";

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 px-4 py-6">
      {/* 상단 텍스트 */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">CareFit</h1>
        <p className="mt-2 text-lg text-gray-800">
          {userName}님을 위한 운동 파트너
        </p>
      </header>

      {/* 카드들 */}
      <section className="flex flex-col gap-4">
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
    </main>
  );
}
