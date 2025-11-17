import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/queryClient";
import { SWRProvider } from "@/lib/swr";

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
            <SWRProvider>{children}</SWRProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
