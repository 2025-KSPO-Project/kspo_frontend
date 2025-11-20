"use client";

import { useRouter } from "next/navigation";

export default function OnboardingCompletePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center ">
      {/* 완료 아이콘 */}
      <div className="mb-8 flex items-center justify-center">
        <div className="relative h-32 w-32">
          {/* 바깥 원 (그라데이션 + 그림자) */}
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-emerald-400 to-green-600 shadow-[0_12px_30px_rgba(16,185,129,0.45)]" />
          {/* 안쪽 원 */}
          <div className="absolute inset-1.5 rounded-full  flex items-center justify-center">
            {/* 체크 아이콘 */}
            <span className="text-4xl text-white">✓</span>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        케어핏 추천이 완료되었습니다!
      </h2>

      <p className="mb-10 text-sm text-gray-600">
        지금 바로 당신에게 맞는 동호회·대회·체육시설을 확인해보세요.
      </p>

      {/* 시작하기 버튼 */}
      <button
        onClick={() => router.replace("/home")}
        className="cursor-pointer w-full max-w-xs rounded-xl bg-linear-to-r from-emerald-400 to-green-600 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.55)] transition-transform hover:shadow-[0_12px_28px_rgba(16,185,129,0.7)] active:translate-y-px active:shadow-[0_6px_18px_rgba(16,185,129,0.5)]"
      >
        시작하기
      </button>
    </main>
  );
}
