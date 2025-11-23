"use client";

import Link from "next/link";

export default function HomePage() {
  // TODO: 실제 로그인 유저 이름으로 대체 (예: useUser() 훅)
  const userName = "케어핏";

  return (
    <div className="flex flex-col px-4 pt-8">
      {/* 상단 로고 + 사용자명 */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Carefit</h1>
        <p className="mt-2 text-sm text-gray-600">
          {userName}님을 위한 추천 운동 라이프
        </p>
      </header>

      {/* 상단 2개 카드: 동호회 / 대회 */}
      <section className="grid grid-cols-2 gap-4">
        {/* 1) 체육동호회 찾기 */}
        <Link
          href="/clubs" // TODO: 실제 동호회 리스트 페이지 경로로 변경
          className="flex h-60 flex-col justify-between rounded-3xl border border-blue-100 bg-blue-50 px-4 py-4 shadow-sm"
        >
          <div>
            <p className="text-[12px] font-medium text-blue-500">
              다 같이 함께하는
            </p>
            <h2 className="mt-2 text-base font-semibold text-blue-900">
              체육동호회 찾기
            </h2>
          </div>
          <div className="mt-4 flex items-center justify-between text-[12px] text-blue-700">
            <span>내 취향 동호회 모아보기</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-500 bg-white text-[11px] font-semibold text-blue-600">
              GO
            </span>
          </div>
        </Link>

        {/* 2) 체육대회 찾기 */}
        <Link
          href="/competitions" // TODO: 실제 체육대회 리스트 페이지 경로로 변경
          className="flex h-60 flex-col justify-between rounded-3xl border border-purple-100 bg-purple-50 px-4 py-4 shadow-sm"
        >
          <div>
            <p className="text-[12px] font-medium text-purple-500">
              갈고닦은 실력을 뽐낼
            </p>
            <h2 className="mt-2 text-base font-semibold text-purple-900">
              체육대회 찾기
            </h2>
          </div>
          <div className="mt-4 flex items-center justify-between text-[12px] text-purple-700">
            <span>참여 가능한 대회 한눈에</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500 bg-white text-[11px] font-semibold text-purple-600">
              GO
            </span>
          </div>
        </Link>
      </section>

      {/* 하단 전체 폭 카드: 주변 체육시설 찾기 */}
      <section className="mt-5">
        <Link
          href="/facility"
          className="flex h-52 flex-col justify-between rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4 shadow-sm"
        >
          <div>
            <p className="text-[12px] font-medium text-emerald-500">
              내 주변에 있는
            </p>
            <h2 className="mt-2 text-base font-semibold text-emerald-900">
              체육시설 찾기
            </h2>
          </div>
          <div className="mt-3 flex items-center justify-between text-[12px] text-emerald-700">
            <span>지도에서 가까운 시설 확인하기</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500 bg-white text-[11px] font-semibold text-emerald-600">
              GO
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
