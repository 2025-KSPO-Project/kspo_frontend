import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/queryClient";
import { SWRProvider } from "@/lib/swr";
import { BottomNavigator } from "@/components/BottomNavigator";

export const metadata: Metadata = {
  title: "KSPO Webapp",
  description: "운동 루틴 & 건강 관리 + 카풀 웹앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* 모바일 프레임 */}
        <div className="app-mobile-shell">
          <QueryProvider>
            <SWRProvider>
              {/* 앱 내부 레이아웃: 상단 콘텐츠 + 하단 네비게이션 */}
              <div className="flex min-h-screen flex-col">
                <main className="flex-1">{children}</main>
                <BottomNavigator />
              </div>
            </SWRProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
