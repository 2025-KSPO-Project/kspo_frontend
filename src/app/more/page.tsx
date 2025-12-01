"use client";

import Link from "next/link";

export default function MorePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 px-5 pt-8 pb-24">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">더보기</h1>
        <p className="mt-1 text-xs text-gray-500">
          공지사항과 상담 메뉴를 확인해 보세요.
        </p>
      </header>

      <section className="mt-6 space-y-3">
        {/* 공지사항 */}
        <Link
          href="/notices" // TODO: 실제 공지사항 페이지 경로로 교체
          className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📢</span>
            <div>
              <p className="text-sm font-medium text-gray-900">공지사항</p>
              <p className="text-[11px] text-gray-500">
                서비스 이용 안내 및 업데이트 소식
              </p>
            </div>
          </div>
          <span className="text-lg text-gray-300">›</span>
        </Link>

        {/* 카톡 상담 */}
        <button
          type="button"
          // TODO: 실제 카카오톡 채널 / 상담 URL 연동
          onClick={() => {
            alert("카카오 상담 채널과 연동 예정입니다.");
          }}
          className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <div>
              <p className="text-sm font-medium text-gray-900">카톡 상담</p>
              <p className="text-[11px] text-gray-500">
                1:1 실시간 채팅 상담 문의
              </p>
            </div>
          </div>
          <span className="text-lg text-gray-300">›</span>
        </button>
      </section>
    </main>
  );
}
