"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function MyPage() {
  const { name, hydrated } = useUser();
  if (!hydrated) return null; // 로딩 중이면 잠깐 숨김

  const userName = name ?? "케어핏";

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 px-5 pt-8 pb-24">
      {/* 프로필 카드 */}
      <section className="rounded-3xl bg-white px-4 py-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-lg font-semibold text-white">
            {userName.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{userName}님</p>
            <p className="mt-1 text-[11px] text-gray-500">
              건강한 운동 루틴 같이 만들어 볼까요?
            </p>
          </div>
        </div>
      </section>

      {/* 메뉴 */}
      <section className="mt-6 space-y-3">
        <Link
          href="/mypage/profile"
          className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">👤</span>
            <span className="text-sm text-gray-900">내 정보 관리</span>
          </div>
          <span className="text-lg text-gray-300">›</span>
        </Link>

        <Link
          href="/workout" // 기존 운동관리 페이지 재사용
          className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🏋️</span>
            <span className="text-sm text-gray-900">운동 관리</span>
          </div>
          <span className="text-lg text-gray-300">›</span>
        </Link>

        <Link
          href="/carpool/history" // TODO: 카풀 히스토리(or 설정) 페이지
          className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🚗</span>
            <span className="text-sm text-gray-900">카풀 이용 내역</span>
          </div>
          <span className="text-lg text-gray-300">›</span>
        </Link>

        <button
          type="button"
          // TODO: 실제 로그아웃 로직 연결 (setDummyLogin(false) 등)
          onClick={() => {
            alert("추후 로그아웃 로직과 연결 예정입니다.");
          }}
          className="mt-2 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left text-sm text-red-500 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🚪</span>
            <span>로그아웃</span>
          </div>
        </button>
      </section>
    </main>
  );
}
