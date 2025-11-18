"use client";

type SplashScreenProps = {
  // 필요하면 onFinish 같은 콜백도 받을 수 있음
};

export function SplashScreen(props: SplashScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* 로고 */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-white">Carefit</span>
        </div>

        {/* 로딩 인디케이터 */}
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span className="h-4 w-4 rounded-full bg-green-300 animate-bounce" />
          <span className="h-4 w-4 rounded-full bg-green-300 animate-bounce [animation-delay:0.15s]" />
          <span className="h-4 w-4 rounded-full bg-green-300 animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    </main>
  );
}
