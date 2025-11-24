"use client";

import { useRouter, useParams } from "next/navigation";
import { clubs } from "@/constants/clubs"; // ClubsPage에서 export한 Club 타입 사용

export default function ClubDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id)
    ? Number(params.id[0])
    : Number(params.id);

  const club = clubs.find((c) => c.id === id);

  if (!club) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-sm text-gray-500">
          동호회 정보를 찾을 수 없어요.
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
      {/* 상단 배경 + 뒤로가기 버튼 (단색 배경 / 필요하면 이미지로 변경 가능) */}
      <header className="relative h-40 w-full overflow-hidden bg-linear-to-b from-emerald-400 to-emerald-300 px-4 pt-4">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/demo-club-header.png")',
          }}
        />
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
      </header>

      {/* 내용 영역 */}
      <main className="-mt-6 flex flex-1 flex-col rounded-t-3xl bg-[#bbf7d0] px-5 pb-8 pt-4 shadow-[0_-6px_20px_rgba(0,0,0,0.04)]">
        {/* 상단 둥근 구분선(handle) */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/20" />

        {/* 제목 */}
        <h1 className="text-lg font-semibold text-gray-900">
          {club.club_name}
        </h1>

        {/* 태그 영역 (위치 + 종목) */}
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full bg-white/70 px-3 py-1 font-medium text-gray-700">
            {club.province_name} {club.district_name}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
            {club.sport_name}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
            {club.disability_type}
          </span>
        </div>

        {/* 상세 정보 카드 */}
        <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          <div className="space-y-3 text-sm text-gray-800">
            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-medium text-gray-400">동호회명</p>
              <p className="mt-0.5">{club.club_name}</p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-medium text-gray-400">위치</p>
              <p className="mt-0.5">
                {club.province_name} {club.district_name}
              </p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-medium text-gray-400">종목</p>
              <p className="mt-0.5">{club.sport_name}</p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-medium text-gray-400">세부 종목</p>
              <p className="mt-0.5">{club.sport_sub_name}</p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">소개 문구</p>
              <p className="mt-0.5">{club.intro_text}</p>
            </div>
          </div>
        </section>

        {/* 하단 버튼 (예: 문의하기 / 가입 신청 등) */}
        <button
          type="button"
          className="mt-auto mb-2 h-12 w-full rounded-2xl bg-black text-sm font-semibold text-white shadow-md"
        >
          동호회 문의하러 가기
        </button>
      </main>
    </div>
  );
}
