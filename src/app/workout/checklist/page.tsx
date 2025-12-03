"use client";

import { useRouter } from "next/navigation";

export default function WorkoutPreChecklistPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col bg-white px-4 py-6">
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

        {/* 중앙 문구 */}
        <div className="mt-10 flex flex-col items-center text-center">
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            운동 시작 전 체크리스트
          </h1>
        </div>
      </header>
      <div className="flex flex-col gap-5">
        <div>
          {/* 체크리스트 영역 (더미) */}
          <section className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-6">
            <p className="text-sm font-semibold text-gray-900">
              운동 전 체크사항
            </p>
            <ul className="mt-3 space-y-2 text-xs text-gray-700">
              <li>• 스트레칭은 충분히 하셨나요?</li>
              <li>• 통증이 느껴지는 부위는 없는지 확인했나요?</li>
              <li>• 물과 운동화 등 준비물이 갖춰져 있나요?</li>
            </ul>
          </section>
        </div>

        <div>
          <button
            type="button"
            onClick={() => router.push("/workout")}
            className="cursor-pointer mt-auto w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white"
          >
            운동 시작
          </button>
        </div>
      </div>
    </main>
  );
}
