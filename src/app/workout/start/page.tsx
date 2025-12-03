"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function WorkoutStartPage() {
  const router = useRouter();
  const { name } = useUser();
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col bg-white px-4 py-6">
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

        {/* 중앙 인사 문구 */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-[11px] text-gray-400">운동시작하기</p>
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            안녕하세요! {name}님
          </h1>
          <p className="mt-1 text-[12px] text-gray-500">
            오늘도 힘차게 시작해봅시다!
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-4">
        {/* 오늘의 운동현황 */}
        <button
          type="button"
          onClick={() => setShowStatusModal(true)}
          className="cursor-pointer w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm"
        >
          <p className="text-base font-semibold text-gray-900">
            오늘의 운동현황
          </p>
          <p className="mt-1 text-xs text-gray-500">
            오늘 운동을 했는지 간단히 체크해요.
          </p>
        </button>

        {/* 운동일정에서 불러오기 */}
        <button
          type="button"
          onClick={() => router.push("/workout/schedule/list")}
          className="cursor-pointer w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm"
        >
          <p className="text-base font-semibold text-gray-900">
            운동일정에서 불러오기
          </p>
          <p className="mt-1 text-xs text-gray-500">
            등록해둔 운동일정에서 오늘의 운동을 선택해요.
          </p>
        </button>

        {/* 오늘의 운동추천받기 카드 */}
        <button
          type="button"
          onClick={() => router.push("/workout/recommend")}
          className="cursor-pointer w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm"
        >
          <p className="text-base font-semibold text-gray-900">
            오늘의 운동추천받기
          </p>
          <p className="mt-1 text-xs text-gray-500">
            컨디션과 상황에 맞는 운동을 추천받아요.
          </p>
        </button>
      </section>

      {/* 운동현황 모달 */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[80%] max-w-sm rounded-3xl bg-white pb-4 pt-6 text-center shadow-xl">
            {/* 이미지 자리 */}
            <div className="mx-auto mb-4 h-24 w-24 rounded-3xl bg-blue-100" />
            <p className="text-sm font-semibold text-gray-900">
              오늘 운동은 하셨나요?
            </p>
            <p className="mt-1 text-xs text-gray-500">
              간단히 운동 여부만 체크해 주세요.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 px-4">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="cursor-pointer flex-1 rounded-full border border-gray-300 py-2 text-xs font-medium text-gray-700"
              >
                돌아가기
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("오늘 운동 완료로 기록했습니다. (더미)");
                  setShowStatusModal(false);
                }}
                className="cursor-pointer flex-1 rounded-full bg-black py-2 text-xs font-medium text-white"
              >
                운동완료로 표시하기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
