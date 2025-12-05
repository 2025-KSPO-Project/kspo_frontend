import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { QueryProvider } from "@/lib/queryClient";
import { SWRProvider } from "@/lib/swr";
import BottomNavigator from "@/components/BottomNavigator";
import { AuthInitializer } from "@/components/AuthInitializer";
import { User } from "@/lib/utils/types";

// AuthState에서 함수 필드를 제외한 순수 데이터 타입 정의 (Next.js SSR 최적화)
interface InitialAuthData {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
}

export const metadata: Metadata = {
  title: "KSPO Webapp",
  description: "운동 루틴 & 건강 관리 + 카풀 웹앱",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. 서버 환경 변수에서 테스트 토큰을 읽어옵니다.
  // NEXT_PUBLIC_ 접두사는 서버에서도 접근 가능합니다.
  const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN || null;
  const TEST_USER_NAME = process.env.NEXT_PUBLIC_TEST_USER_NAME || "테스터";
  const TEST_USER_ID = process.env.NEXT_PUBLIC_TEST_USER_ID || "TEST_ID";

  // 2. 쿠키에서 실제 토큰을 읽어옵니다.
  const cookieStore = cookies();
  const cookieAccessToken = (await cookieStore).get('access_token')?.value || null;

  // 3. 토큰 우선 순위 결정: 테스트 토큰이 있으면 쿠키보다 우선합니다.
  const finalAccessToken = TEST_TOKEN || cookieAccessToken;
  
  // 4. User 객체 결정 (실제 운영 시 API 호출 필요, 테스트/쿠키 기반 분기)
  let initialUser: User | null = null;
  if (finalAccessToken) {
      // 토큰이 있다면, 테스트 환경 변수를 사용하여 더미 User 객체를 생성합니다.
      // 실제 운영 환경에서는 API 호출 후 User 객체를 이곳에 할당해야 합니다.
      initialUser = { 
          id: TEST_USER_ID, 
          email: `${TEST_USER_ID}@test.com`,
          name: TEST_USER_NAME,
          role: "USER"
          // User 타입에 필요한 나머지 필드를 채워야 함
      } as User; 
  }

  // 5. AuthInitializer에 전달할 초기 상태 구성 (함수 필드 제외)
  const initialAuthState: InitialAuthData = {
    accessToken: finalAccessToken,
    user: initialUser,
    isLoggedIn: !!finalAccessToken,
  };

  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <SWRProvider>
            <AuthInitializer initialState={initialAuthState}>
              <div className="app-mobile-shell">
                {children}
                <BottomNavigator />
              </div>
            </AuthInitializer>
          </SWRProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
