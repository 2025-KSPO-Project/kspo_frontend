"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingIllustration } from "./LoadingIllustration";

// TODO: 실제 Zustand 등에서 사용자 입력값 가져오기
// import { useSignupStore } from "@/store/signup";

export default function OnboardingLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        // TODO: 시군구 / 장애유형 / 관심종목 가져오기
        // const { sigungu, disability, interests } = useSignupStore.getState();

        // 예시 요청 바디
        const body = {
          sigungu: "강남구",
          disability: "지체 장애",
          interests: ["축구", "러닝"],
        };

        // 실제 추천 API 호출
        await new Promise((resolve) => setTimeout(resolve, 2500)); // 2.5초 딜레이 (API 대체)

        // TODO: fetch("https://api.carefit/recommend", { method: "POST", body: JSON.stringify(body) });

        router.replace("/onboarding/complete");
      } catch (err) {
        console.error(err);
      }
    }

    fetchRecommendations();
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      <LoadingIllustration />
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        잠시만 기다려주세요
      </h2>

      {/* 체크리스트 */}
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>사용자에게 적합한 동호회 찾는 중</span>
          <span className="text-green-500">✔️</span>
        </div>
        <div className="flex items-center gap-2">
          <span>스포츠 대회 추천 중</span>
          <span className="text-green-500">✔️</span>
        </div>
        <div className="flex items-center gap-2">
          <span>주변 체육시설 찾는 중</span>
          <span className="text-green-500">✔️</span>
        </div>
      </div>
    </main>
  );
}
