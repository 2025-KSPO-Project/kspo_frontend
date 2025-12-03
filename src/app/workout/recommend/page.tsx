"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export default function WorkoutRecommendIntroPage() {
  const router = useRouter();
  const { name } = useUser();
  const userName = name ?? "케어핏";

  return (
    <main className="flex min-h-screen flex-col bg-white px-4 py-6">
      {/* 상단 헤더 */}
      <header className="relative px-4 pt-4 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
        <div className="mt-10 flex flex-col items-center text-center">
          <h1 className="text-lg font-semibold text-gray-900">운동 추천받기</h1>
        </div>
      </header>
      <div className="flex flex-col gap-5">
        {/* 운동 이미지 자리 */}
        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-gray-300 bg-gray-50">
          <Image
            src="/images/recommend.png"
            alt="Carefit Login Illustration"
            height={52}
            width={128}
            className="object-contain rounded-full border"
          />
        </div>
        <div>
          <p className="mb-8 text-center text-sm text-gray-800">
            오늘 진행할 운동을 <span className="font-semibold">{userName}</span>
            님의 컨디션과 상황에 맞게 추천해요!
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => router.push("/workout/recommend/flow")}
            className="cursor-pointer mt-auto w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white"
          >
            오늘의 운동 추천받기
          </button>
        </div>
      </div>
    </main>
  );
}
