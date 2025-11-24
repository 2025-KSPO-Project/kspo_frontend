"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { competitionsMock } from "@/constants/competitions";

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

export default function CompetitionDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const competition = competitionsMock.find((c) => c.id === id);

  if (!competition) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-sm text-gray-500">
          대회 정보를 찾을 수 없어요.
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
      {/* 상단 배경 + 뒤로가기 버튼 */}
      <header className="relative h-40 w-full overflow-hidden px-4 pt-4">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/demo-competition-header.png")',
          }}
        />
        {/* 리스트 페이지와 동일한 위치의 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
      </header>

      {/* 내용 영역 */}
      <main className="flex-1 rounded-full px-5 pb-8 pt-6 flex flex-col">
        {/* 상단 둥근 구분선(handle) */}
        <div className="mx-auto mb-4 h-2 w-12 rounded-full bg-black/70" />

        {/* 제목 + 태그 */}
        <h1 className="text-lg font-semibold text-gray-900">
          {competition.name}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
            {competition.mainEvent}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
            {competition.subEvent}
          </span>
        </div>

        {/* 상세 정보 카드 */}
        <section className="mt-5 rounded-2xl bg-white/90 p-4 shadow-sm">
          <div className="space-y-3 text-sm text-gray-800">
            <div className="border-b border-gray-100 pb-3 last:border-none">
              <p className="text-[11px] font-medium text-gray-400">대회명</p>
              <p className="mt-0.5">{competition.name}</p>
            </div>

            <div className="border-b border-gray-100 pb-3 last:border-none">
              <p className="text-[11px] font-medium text-gray-400">기간</p>
              <p className="mt-0.5">
                {formatPeriod(competition.startDate, competition.endDate)}
              </p>
            </div>

            <div className="border-b border-gray-100 pb-3 last:border-none">
              <p className="text-[11px] font-medium text-gray-400">주종목명</p>
              <p className="mt-0.5">{competition.mainEvent}</p>
            </div>

            <div className="border-b border-gray-100 pb-3 last:border-none">
              <p className="text-[11px] font-medium text-gray-400">
                세부종목명
              </p>
              <p className="mt-0.5">{competition.subEvent}</p>
            </div>

            <div className="border-b border-gray-100 pb-3 last:border-none">
              <p className="text-[11px] font-medium text-gray-400">주관</p>
              <p className="mt-0.5">{competition.organizer}</p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">대회 상세</p>
              <Link
                href={competition.officialUrl}
                target="_blank"
                className="mt-0.5 inline-flex items-center text-blue-600 underline"
              >
                {competition.officialUrl}
              </Link>
            </div>
          </div>
        </section>

        {/* 하단 버튼: 맨 밑에 고정되도록 mt-auto */}
        <button
          type="button"
          className="mt-auto mb-2 h-12 w-full rounded-2xl bg-black text-sm font-semibold text-white shadow-md"
        >
          대회 신청하러 가기
        </button>
      </main>
    </div>
  );
}
