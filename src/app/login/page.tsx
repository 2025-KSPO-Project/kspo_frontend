"use client";

import { useRouter } from "next/navigation";
import { setDummyLogin } from "@/hooks/useAuth";
import Image from "next/image";
import { setDummyUserName } from "@/hooks/useUser";

export default function LoginPage() {
  const router = useRouter();

  const handleNaverLogin = () => {
    alert("네이버 로그인 연동 예정입니다. 일단 회원가입 화면으로 이동합니다.");
    router.push("/onboarding/init");
  };

  const handleSkip = () => {
    setDummyLogin(true);
    setDummyUserName("홍길동");
    router.push("/home");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      {/* 상단 뒤로가기 */}
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-gray-500"
        >
          뒤로
        </button>
      </header>

      {/* 중앙 이미지 영역: 화면의 대부분을 차지하게 고정 높이 부여 */}
      <section className="flex-1 justify-center items-center pt-8">
        <div className="relative w-full h-[70vh] overflow-hidden rounded-2xl">
          <Image
            src="/images/login-hero.png"
            alt="Carefit Login Illustration"
            fill // 부모 div를 기준으로 꽉 채움
            className="object-center" // 위/아래 여백 없이 채우기
            priority
          />
        </div>
      </section>

      {/* 하단 버튼 영역 - 이미지 바로 아래에 붙음 */}
      <footer className="flex flex-col items-center gap-3 pb-4">
        <div className="flex w-full max-w-[300px] flex-col gap-2">
          {/* 네이버 로그인 */}
          <button
            type="button"
            onClick={handleNaverLogin}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#03C75A] py-3 text-sm font-semibold text-white shadow-sm"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-white/90 text-xs font-bold text-[#03C75A]">
              N
            </span>
            네이버로 계속하기
          </button>

          {/* 개발용 건너뛰기 */}
          <button
            type="button"
            onClick={handleSkip}
            className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 py-3 text-xs text-gray-600"
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
