"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  facilitiesMock,
  type Facility,
  type FacilityType,
  sportLabel,
} from "@/constants/facilities";

type SortKey = "distance" | "name";

type FilterKey = "ALL" | FacilityType;

const FILTER_TAGS: { key: FilterKey; label: string }[] = [
  { key: "ALL", label: "전체" },
  { key: "GYM", label: "체력단련실" },
  { key: "SWIMMING", label: "수영장" },
  { key: "BASKETBALL", label: "농구장" },
  { key: "FOOTBALL", label: "축구장" },
  { key: "OTHER", label: "기타" },
];

const userName = "케어핏";

export default function FacilityListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("distance");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");

  const filteredList = useMemo(() => {
    let list: Facility[] = facilitiesMock;

    // 타입 필터
    if (activeFilter !== "ALL") {
      list = list.filter((f) => f.sportType === activeFilter);
    }

    // 검색어 (시설명 + 주소)
    const keyword = search.trim();
    if (keyword) {
      const lower = keyword.toLowerCase();
      list = list.filter((f) => {
        const fullAddress =
          `${f.provinceName} ${f.districtName} ${f.address}`.toLowerCase();
        return (
          f.name.toLowerCase().includes(lower) ||
          fullAddress.includes(lower) ||
          f.mainSportName.toLowerCase().includes(lower)
        );
      });
    }

    // 정렬
    list = [...list].sort((a, b) => {
      if (sortKey === "distance") {
        return (a.distanceKm ?? 999) - (b.distanceKm ?? 999);
      }
      // 이름순
      return a.name.localeCompare(b.name, "ko");
    });

    return list;
  }, [activeFilter, search, sortKey]);

  return (
    <div className="flex min-h-screen flex-col">
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

        {/* 중앙 타이틀 */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-[11px] text-gray-400">주변 체육시설</p>
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            안녕하세요! {userName}님
          </h1>
          <p className="mt-1 text-[12px] text-gray-500">
            {userName}님 근처의 체육시설을 찾아볼 수 있어요
          </p>
        </div>
      </header>

      {/* 검색 + 정렬 영역 */}
      <div className="mt-2 flex items-center gap-2 px-4">
        {/* 검색창 */}
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
          <span className="text-lg text-gray-400">🔍</span>
          <input
            className="w-full border-none bg-transparent text-sm outline-none"
            placeholder="체육시설을 검색해보세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 정렬 버튼 (아이콘만, 실제 토글) */}
        <button
          type="button"
          onClick={() =>
            setSortKey((prev) => (prev === "distance" ? "name" : "distance"))
          }
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[11px] text-gray-700 shadow-sm"
        >
          정렬
        </button>
      </div>

      {/* 타입 필터 태그 영역 */}
      <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar">
        {FILTER_TAGS.map((tag) => {
          const isActive = activeFilter === tag.key;
          return (
            <button
              key={tag.key}
              type="button"
              onClick={() => setActiveFilter(tag.key)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                isActive
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-white text-gray-600 shadow-sm"
              }`}
            >
              {tag.label}
            </button>
          );
        })}
      </div>

      {/* 리스트 영역 */}
      <main className="mt-3 flex-1 space-y-3 px-4 pb-24">
        {filteredList.map((f) => (
          <Link
            key={f.id}
            href={`/facility/${f.id}`}
            className="block rounded-3xl bg-white px-4 py-3 text-left shadow-sm"
          >
            {/* 시설명 */}
            <h2 className="text-[15px] font-semibold text-gray-900">
              {f.name}
            </h2>

            {/* 주소 */}
            <p className="mt-1 text-[12px] text-gray-500">
              주소: {f.provinceName} {f.districtName} {f.address}
            </p>

            {/* 종목 */}
            <p className="mt-1 text-[13px] font-medium text-blue-600">
              종목: {f.mainSportName || sportLabel(f.sportType)}
            </p>

            {/* 거리 정보 (있을 경우만) */}
            {f.distanceKm != null && (
              <p className="mt-1 text-[11px] text-gray-400">
                내 위치로부터 약 {f.distanceKm.toFixed(1)}km
              </p>
            )}
          </Link>
        ))}

        {filteredList.length === 0 && (
          <div className="mt-10 text-center text-sm text-gray-400">
            조건에 맞는 체육시설이 없어요.
          </div>
        )}
      </main>
    </div>
  );
}
