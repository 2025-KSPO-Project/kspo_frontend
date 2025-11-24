"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { CLUB_COLORS, clubs } from "@/constants/clubs";

const userName = "케어핏";

export default function ClubsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      {/* 상단 헤더 - 체육대회 리스트와 동일한 구조 */}
      <header className="relative px-4 pt-4 pb-4">
        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        {/* 중앙 인사 문구 */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-[11px] text-gray-400">체육동호회 찾기</p>
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            안녕하세요! {userName}님
          </h1>
          <p className="mt-1 text-[12px] text-gray-500">
            {userName}님을 위한 체육동호회 리스트에요
          </p>
        </div>
      </header>

      {/* 리스트 영역 */}
      <main className="mt-3 flex-1 space-y-3 px-4 pb-24">
        {clubs.map((club) => {
          const badgeClass = CLUB_COLORS[club.disability_type];

          return (
            <Link
              key={club.id}
              href={`/clubs/${club.id}`}
              className="block w-full cursor-pointer rounded-3xl bg-white px-4 py-3 text-left shadow-sm"
            >
              {/* 상단: 클럽명 + 장애 유형 뱃지 */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {club.club_name}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeClass}`}
                >
                  {club.disability_type}
                </span>
              </div>

              {/* 위치 */}
              <p className="mt-1 text-left text-[12px] text-gray-500">
                위치: {club.province_name} {club.district_name}
              </p>

              {/* 종목 */}
              <p className="mt-1 text-left text-[13px] font-medium text-blue-600">
                종목: {club.sport_name}
              </p>

              {/* 한 줄 소개 */}
              <p className="mt-2 text-left text-[11px] text-gray-400">
                {club.intro_text}
              </p>
            </Link>
          );
        })}

        {clubs.length === 0 && (
          <div className="mt-10 text-center text-sm text-gray-400">
            아직 등록된 동호회가 없어요.
          </div>
        )}
      </main>
    </div>
  );
}
