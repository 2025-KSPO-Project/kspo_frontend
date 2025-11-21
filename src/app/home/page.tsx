"use client";

import Link from "next/link";
import { BottomNavigator } from "@/components/BottomNavigator";

export default function HomePage() {
  // TODO: 실제 로그인 유저 이름으로 대체 (예: useUser() 훅)
  const userName = "케어핏";

  return (
    <div className="flex flex-col">
      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-4 pt-6 pb-24">
        {/* 상단 로고 + 사용자명 */}
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight">Carefit</h1>
          <p className="mt-1 text-sm text-gray-600">
            {userName}님을 위한 추천 운동 라이프
          </p>
        </header>

        {/* 상단 2개 카드: 동호회 / 대회 */}
        <section className="grid grid-cols-2 gap-3">
          {/* 1) 체육동호회 찾기 */}
          <Link
            href="/clubs" // TODO: 실제 동호회 리스트 페이지 경로로 변경
            className="flex h-40 flex-col justify-between rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 shadow-sm"
          >
            <div>
              <p className="text-[11px] font-medium text-blue-500">
                다 같이 함께하는
              </p>
              <h2 className="mt-1 text-sm font-semibold text-blue-900">
                체육동호회
                <br />
                찾기
              </h2>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-blue-700">
              <span>내 취향 동호회 모아보기</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 bg-white text-[11px] font-semibold text-blue-600">
                GO
              </span>
            </div>
          </Link>

          {/* 2) 체육대회 찾기 */}
          <Link
            href="/competitions" // TODO: 실제 체육대회 리스트 페이지 경로로 변경
            className="flex h-40 flex-col justify-between rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 shadow-sm"
          >
            <div>
              <p className="text-[11px] font-medium text-purple-500">
                갈고닦은 실력을 뽐낼
              </p>
              <h2 className="mt-1 text-sm font-semibold text-purple-900">
                체육대회
                <br />
                찾기
              </h2>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-purple-700">
              <span>참여 가능한 대회 한눈에</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 bg-white text-[11px] font-semibold text-purple-600">
                GO
              </span>
            </div>
          </Link>
        </section>

        {/* 하단 전체 폭 카드: 주변 체육시설 찾기 */}
        <section className="mt-4">
          <Link
            href="/facility"
            className="flex h-28 flex-col justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 shadow-sm"
          >
            <div>
              <p className="text-[11px] font-medium text-emerald-500">
                내 주변에 있는
              </p>
              <h2 className="mt-1 text-sm font-semibold text-emerald-900">
                체육시설 찾기
              </h2>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-700">
              <span>지도에서 가까운 시설 확인하기</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500 bg-white text-[11px] font-semibold text-emerald-600">
                GO
              </span>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
