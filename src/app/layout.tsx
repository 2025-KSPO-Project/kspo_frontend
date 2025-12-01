import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { QueryProvider } from "@/lib/queryClient";
import { SWRProvider } from "@/lib/swr";
import BottomNavigator from "@/components/BottomNavigator";

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
      <head>
        {/* Kakao Map SDK */}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <QueryProvider>
          <SWRProvider>
            <div className="app-mobile-shell">
              {children}
              <BottomNavigator />
            </div>
          </SWRProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
