"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function TodayBadgeCompletePage() {
  const router = useRouter();
  const { name } = useUser();
  const userName = name ?? "사용자";

  const handleExit = () => {
    // 이미 /workout/badge 에서 todayBadge 를 done 처리했기 때문에
    // 여기서는 바로 메인으로 이동만 해도 됨.
    router.push("/workout");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-6">
      {/* 축하 로고 자리 */}
      <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-gray-300">
        축하로고
      </div>

      <p className="mb-8 text-center text-sm text-gray-800">
        축하합니다! <span className="font-semibold">{userName}</span>님의 오늘의
        운동을 완료했습니다.
      </p>

      <button
        type="button"
        onClick={handleExit}
        className="w-full max-w-xs rounded-2xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-900"
      >
        나가기
      </button>
    </main>
  );
}
