import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/queryClient";
import { SWRProvider } from "@/lib/swr";
import BottomNavigatorClient from "@/components/BottomNavigator.client";

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
        <div className="app-mobile-shell">
          <QueryProvider>
            <SWRProvider>
              <div className="flex min-h-screen flex-col">
                <main className="flex-1">{children}</main>
                {/* CSR 전용 네비게이션 */}
                <BottomNavigatorClient />
              </div>
            </SWRProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
