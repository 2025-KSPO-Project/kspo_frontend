"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { competitionsMock, type Competition } from "@/constants/competitions";

type TabKey = "all" | "favorites";
type SortKey = "distance" | "deadline";

const userName = "케어핏";

export default function CompetitionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [sortKey, setSortKey] = useState<SortKey>("distance");

  const filteredList = useMemo(() => {
    let list: Competition[] =
      activeTab === "all"
        ? competitionsMock
        : competitionsMock.filter((c) => c.isFavorite);

    list = [...list].sort((a, b) => {
      if (sortKey === "distance") {
        return a.distanceKm - b.distanceKm;
      }
      // 임박순 = 시작일이 빠른 순
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    return list;
  }, [activeTab, sortKey]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* 상단 헤더 */}
      <header className="relative px-4 pt-4 pb-4">
        {/* 뒤로가기 버튼 - 왼쪽 상단 고정 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        {/* 중앙 인사 문구 */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-[11px] text-gray-400">체육대회 찾기</p>
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            안녕하세요! {userName}님
          </h1>
          <p className="mt-1 text-[12px] text-gray-500">
            {userName}님의 추천 운동에 해당하는 대회 리스트에요
          </p>
        </div>
      </header>

      {/* 탭 영역 */}
      <div className="mt-3 flex px-4">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`cursor-pointer flex-1 rounded-full px-3 py-2 text-sm font-medium ${
            activeTab === "all"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          전체 대회
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("favorites")}
          className={`cursor-pointer ml-2 flex-1 rounded-full px-3 py-2 text-sm font-medium ${
            activeTab === "favorites"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          즐겨찾기
        </button>
      </div>

      {/* 필터(거리순/임박순) */}
      <div className="mt-4 flex items-center justify-between px-4">
        <p className="text-xs text-gray-500">
          총 {filteredList.length}개의 대회가 있어요
        </p>
        <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setSortKey("distance")}
            className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-medium ${
              sortKey === "distance"
                ? "bg-gray-900 text-white"
                : "text-gray-500"
            }`}
          >
            거리순
          </button>
          <button
            type="button"
            onClick={() => setSortKey("deadline")}
            className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-medium ${
              sortKey === "deadline"
                ? "bg-gray-900 text-white"
                : "text-gray-500"
            }`}
          >
            임박순
          </button>
        </div>
      </div>

      {/* 리스트 */}
      <main className="mt-3 flex-1 space-y-3 px-4 pb-6">
        {filteredList.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}

        {filteredList.length === 0 && (
          <div className="mt-10 text-center text-sm text-gray-400">
            아직 즐겨찾기한 대회가 없어요.
          </div>
        )}
      </main>
    </div>
  );
}

function formatPeriod(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);

  const toDateStr = (d: Date) =>
    d.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return `${toDateStr(s)} ~ ${toDateStr(e)}`;
}

type CardProps = {
  competition: Competition;
};

function CompetitionCard({ competition }: CardProps) {
  return (
    <Link
      href={`/competitions/${competition.id}`}
      className="block rounded-3xl bg-white px-4 py-3 shadow-sm"
    >
      {/* 1. 대회명 */}
      <h2 className="text-[15px] font-semibold text-gray-900">
        {competition.name}
      </h2>

      {/* 2. 기간 */}
      <p className="mt-1 text-[12px] text-gray-500">
        {formatPeriod(competition.startDate, competition.endDate)}
      </p>

      {/* 3. 주종목명 */}
      <p className="mt-1 text-[13px] font-medium text-blue-600">
        주종목: {competition.mainEvent}
      </p>

      {/* 거리 정보 (옵션) */}
      <p className="mt-2 text-[11px] text-gray-400">
        내 위치로부터 약 {competition.distanceKm.toFixed(1)}km
      </p>
    </Link>
  );
}
