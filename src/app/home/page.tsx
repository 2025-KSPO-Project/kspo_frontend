"use client";

import { HomeCard } from "@/components/HomeCard";
import { useUser } from "@/hooks/useUser";

export default function HomePage() {
  const { name } = useUser();
  const userName = name ?? "케어핏";

  return (
    <div className="relative ">
      {/* 상단 카드 2개 높이의 '절반 정도'에만 들어가는 배경색 블록 */}
      {/* 숫자는 카드/헤더 높이에 맞춰 조절 가능: h-[220px], h-[240px] 등 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-60 bg-green-200" />

      {/* 실제 콘텐츠 */}
      <div className="relative px-5 pt-10">
        {/* 상단 헤더 (로고 + 사용자명) */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-black">
              Carefit
            </h1>
            <p className="mt-2 text-xs text-black-50">
              {userName}님을 위한 추천 운동 라이프
            </p>
          </div>
        </header>

        {/* 2 x 2 카드 영역 */}
        <section className="grid grid-cols-2 gap-4 pt-12">
          {/* 상단 2개 카드 */}
          <HomeCard
            href="/clubs"
            eyebrow="다 같이 함께하는"
            title="체육동호회 찾기"
            description="내 취향 동호회 모아보기"
            color="blue"
          />
          <HomeCard
            href="/competitions"
            eyebrow="갈고닦은 실력을 뽐낼"
            title="체육대회 찾기"
            description="참여 가능한 대회 한눈에"
            color="purple"
          />

          {/* 하단 2개 카드 */}
          <HomeCard
            href="/facility"
            eyebrow="내 주변에 있는"
            title="체육시설 찾기"
            description="지도에서 가까운 시설 확인"
            color="emerald"
          />
          <HomeCard
            href="/workout"
            eyebrow="꾸준한 습관 만들기"
            title="운동관리"
            description="오늘 할 운동 한눈에"
            color="orange"
          />
        </section>
      </div>
    </div>
  );
}
