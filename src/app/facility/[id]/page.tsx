"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { facilitiesMock, sportLabel } from "@/constants/facilities";
import KakaoMap from "@/components/KakaoMap";

// kakao typings
declare global {
  interface Window {
    kakao: any;
  }
}

export default function FacilityDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const initial = facilitiesMock.find((f) => f.id === rawId);

  // URL → 기본 선택값
  const [selectedId, setSelectedId] = useState<string | null>(
    initial?.id ?? null
  );

  const selected =
    facilitiesMock.find((f) => f.id === selectedId) ?? initial ?? null;

  if (!selected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-sm text-gray-500">
          체육시설 정보를 찾을 수 없어요.
        </p>
        <button
          onClick={() => router.back()}
          className="rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* 지도 영역 */}
      <header className="relative h-64 w-full overflow-hidden">
        {/* 실제 Kakao Map */}
        <KakaoMap lat={selected.lat} lng={selected.lng} />

        {/* 목업 마커 클릭 이벤트 (지금도 유지) */}
        {facilitiesMock.map((f, index) => {
          const top = 20 + index * 12;
          const left = 18 + index * 15;

          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedId(f.id)}
              className={`absolute z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] ${
                selected?.id === f.id
                  ? "border-emerald-600 bg-white text-emerald-700"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              체
            </button>
          );
        })}

        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
      </header>

      {/* 하단 정보 카드 */}
      <main className="-mt-4 flex flex-1 flex-col rounded-t-3xl bg-white px-5 pb-6 pt-4 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
        {/* 핸들 바 */}
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-300" />

        {/* 정보 섹션 */}
        <section className="space-y-2 text-sm text-gray-800">
          {/* 시설명 */}
          <h1 className="text-lg font-semibold text-gray-900">
            {selected.name}
          </h1>

          <p className="text-[11px] text-gray-400">
            {selected.provinceName} {selected.districtName}
          </p>

          {/* 주소 */}
          <div className="mt-2">
            <p className="text-[11px] font-medium text-gray-500">주소</p>
            <p className="mt-0.5">
              {selected.provinceName} {selected.districtName} {selected.address}
            </p>
          </div>

          {/* 종목 */}
          <div className="mt-2">
            <p className="text-[11px] font-medium text-gray-500">종목</p>
            <p className="mt-0.5">
              {selected.mainSportName} ({sportLabel(selected.sportType)})
            </p>
          </div>

          {/* 거리 */}
          {selected.distanceKm != null && (
            <div className="mt-2">
              <p className="text-[11px] font-medium text-gray-500">거리</p>
              <p className="mt-0.5 text-[12px] text-gray-600">
                내 위치로부터 약 {selected.distanceKm.toFixed(1)}km
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
