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

  // useParams가 string | string[] 가능성이 있어서 방어적으로 처리
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const competition = competitionsMock.find((c) => c.id === id);

  if (!competition) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="relative h-40 w-full bg-linear-to-b from-blue-500 to-blue-300 px-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
      </header>

      {/* 내용 카드 */}
      <main className="-mt-10 flex-1 rounded-t-3xl bg-white px-5 pb-8 pt-6 shadow-[0_-6px_20px_rgba(0,0,0,0.04)]">
        {/* 대회명 */}
        <h1 className="text-lg font-semibold text-gray-900">
          {competition.name}
        </h1>

        {/* 간단 태그들 (주종목, 세부종목) */}
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
            {competition.mainEvent}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
            {competition.subEvent}
          </span>
        </div>

        {/* 구분선 */}
        <div className="mt-5 h-px w-full bg-gray-100" />

        {/* 세부 정보 */}
        <section className="mt-4 space-y-3 text-sm text-gray-800">
          <div>
            <p className="text-[11px] font-medium text-gray-400">대회명</p>
            <p className="mt-0.5">{competition.name}</p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-gray-400">기간</p>
            <p className="mt-0.5">
              {formatPeriod(competition.startDate, competition.endDate)}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-gray-400">주종목명</p>
            <p className="mt-0.5">{competition.mainEvent}</p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-gray-400">세부종목명</p>
            <p className="mt-0.5">{competition.subEvent}</p>
          </div>

          <div>
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
        </section>

        {/* 하단 버튼 */}
        <button
          type="button"
          className="mt-8 h-12 w-full rounded-2xl bg-blue-600 text-sm font-semibold text-white shadow-sm"
        >
          대회 신청하러 가기
        </button>
      </main>
    </div>
  );
}
