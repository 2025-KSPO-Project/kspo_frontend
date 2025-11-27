"use client";

import Link from "next/link";
import Image from "next/image";
import { ANIMAL_CHARACTERS } from "@/constants/character";

export function MainLanding() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-linear-to-b px-6 py-10">
      {/* 상단 로고 */}
      <header className="flex w-full justify-start">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-black/90">Carefit</span>
        </div>
      </header>

      {/* 중앙 메인 카피 */}
      <section className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
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

        {/* 6마리 동물 캐릭터 그리드 */}
        <div className="mt-4 w-full max-w-sm rounded-3xl bg-white/70 p-4 ">
          <div className="grid grid-cols-3 gap-3">
            {ANIMAL_CHARACTERS.map((ch) => (
              <div
                key={ch.src}
                className="flex flex-col items-center gap-1 rounded-2xl bg-white/80 px-2 py-2 shadow-sm"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-emerald-50">
                  <Image
                    src={ch.src}
                    alt={ch.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-semibold text-gray-800">
                  {ch.name}
                </span>
                <span className="text-[10px] text-emerald-600">{ch.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA 버튼 */}
      <footer className="flex flex-col gap-3">
        <Link
          href="/login"
          className="block w-full rounded-xl bg-green-300 px-6 py-3 text-center text-sm font-semibold text-black"
        >
          시작하기
        </Link>
        <p className="text-center text-[11px] text-black">
          시작하기를 누르면 서비스 이용약관 및 개인정보처리방침에 동의하게
          됩니다.
        </p>
      </footer>
    </main>
  );
}
