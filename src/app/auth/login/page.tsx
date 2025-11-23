"use client";

import { useRouter } from "next/navigation";
import { setDummyLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();

  const handleNaverLogin = () => {
    alert("네이버 로그인 연동 예정입니다. 일단 회원가입 화면으로 이동합니다.");

    // 아직 진짜 로그인은 아니라고 가정하면 여기서는 안 찍고
    // 온보딩 끝나고 complete에서 찍어도 됨
    // setDummyLogin(true);

    router.push("/auth/signup");
  };

  const handleSkip = () => {
    // (개발용) 바로 로그인된 상태로 간주
    setDummyLogin(true);
    router.push("/home");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      {/* 상단 뒤로가기 / 나중에 할래요 */}
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-gray-500"
        >
          뒤로
        </button>
      </header>

      {/* 중앙 로고 + 카피 */}
      <section className="flex-1 flex flex-col items-center justify-center text-center gap-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">Carefit</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">
          한 손에 관리하는 운동의 모든 것
        </h1>
        <p className="text-xs text-gray-500">
          간편 로그인으로 오늘의 운동, 체육동호회, 대회 정보를 한 번에
          받아보세요.
        </p>
      </section>

      {/* 하단 로그인 버튼 + 약관 안내 */}
      <footer className="flex flex-col gap-3 pb-4">
        <div className="flex flex-col gap-2">
          {/* 네이버 로그인 버튼 */}
          <button
            type="button"
            onClick={handleNaverLogin}
            className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-[#03C75A] py-3 text-sm font-semibold text-white shadow-sm"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-white/90 text-xs font-bold text-[#03C75A]">
              N
            </span>
            네이버로 계속하기
          </button>

          {/* (개발용) 건너뛰기 버튼 */}
          <button
            type="button"
            onClick={handleSkip}
            className="cursor-pointer w-full rounded-xl border border-gray-200 bg-gray-50 py-3 text-xs text-gray-600"
          >
            (개발용) 로그인 건너뛰고 홈으로 이동
          </button>
        </div>

        <p className="text-[10px] text-center text-black">
          로그인 시 서비스 이용약관, 개인정보 처리방침에 동의하게 됩니다.
        </p>
      </footer>
    </main>
  );
}
