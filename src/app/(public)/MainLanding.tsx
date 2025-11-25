"use client";

import Link from "next/link";

export function MainLanding() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-linear-to-b px-6 py-10">
      {/* 상단 로고 */}
      <header className="w-full flex justify-start">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-black/90">Carefit</span>
        </div>
      </header>

      {/* 중앙 메인 카피 */}
      <section className="flex flex-1 flex-col items-center justify-center text-center gap-5">
        <p className="rounded-full bg-black/80 px-4 py-1 text-xs font-medium text-green-300">
          이동약자도, 운동 초보도
        </p>
        <h1 className="text-3xl font-extrabold leading-snug text-black">
          한 손에 관리하는
          <br />
          <span className="underline decoration-black/30">운동의 모든 것</span>
        </h1>
        <p className="mt-2 text-sm text-black/70">
          오늘의 운동부터 체육동호회, 대회, 체육시설까지
          <br />
          나에게 맞는 운동 루틴을 한 번에 관리해 보세요.
        </p>

        {/* 일러스트 영역 */}
        <div className="mt-4 h-40 w-full max-w-xs rounded-3xl bg-white/70 shadow-md flex items-center justify-center text-xs text-gray-500">
          여기 운동/케어핏 일러스트 들어갈 예정
        </div>
      </section>

      {/* 하단 CTA 버튼 */}
      <footer className="flex flex-col gap-3">
        <Link
          href="/auth/login"
          className="block w-full rounded-xl bg-green-300 text-center text-sm font-semibold text-black py-3 px-6"
        >
          시작하기
        </Link>
        <p className="text-[11px] text-black text-center">
          시작하기를 누르면 서비스 이용약관 및 개인정보처리방침에 동의하게
          됩니다.
        </p>
      </footer>
    </main>
  );
}
