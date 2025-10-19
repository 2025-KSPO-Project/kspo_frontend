# 🏃‍♀️ 운동 루틴 & 건강 관리 웹앱

## 🔥 프로젝트 개요

운동 일정/체크리스트/건강 상태 기록을 중심으로 **운동 루틴**을 만들고,  
**LLM 팁**과 **커뮤니티(카풀)**, **Google Maps 동선 등록**을 지원하는 모바일 우선 웹앱입니다.

---

## 🧰 Tech Stack

| 구분                     | 기술                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| **Framework & Language** | Next.js (App Router), React 18, TypeScript                                               |
| **State Management**     | TanStack Query (서버 상태/뮤테이션), SWR (가벼운 캐시/폴링), Zustand (로컬 UI/세션 상태) |
| **Styling**              | Tailwind CSS + Emotion(상태 기반 스타일) + SCSS(페이지 단위 커스텀)                      |
| **Build Tool**           | Next.js 기본 SWC (필요 시 Webpack 커스텀 가능, Turbopack dev 지원)                       |
| **Code Quality**         | ESLint, Prettier                                                                         |
| **Package Manager**      | Yarn Berry (Plug’n’Play)                                                                 |

> ⚠️ Vite는 Next.js와 동시 사용하지 않습니다.  
> 별도 마이크로 프런트엔드가 아닌 이상 Next 기본 SWC 사용이 가장 안정적입니다.

---

## 📁 폴더 구조

```bash
src/
  app/
    (public)/
      page.tsx                   # 랜딩(스플래시/온보딩 진입)
      explore/page.tsx            # 공개 리스트(카풀/게시물 등)
    (auth)/
      login/page.tsx              # 로그인
      signup/page.tsx             # 회원가입
    (user)/
      dashboard/page.tsx          # 메인(오늘의 운동/요약 위젯)
      plan/page.tsx               # 운동 일정 관리/등록
      start/page.tsx              # 오늘의 운동 시작하기(진행 뷰)
      check/
        pre/page.tsx              # 운동 전 체크리스트
        during/page.tsx           # 운동 중 체크리스트
        post/page.tsx             # 운동 후 체크리스트
      health/page.tsx             # 건강 상태 평가/히스토리
      map/page.tsx                # Google Map 동선 등록/경로 관리
    (community)/
      page.tsx                    # 커뮤니티 메인
      register/page.tsx           # 카풀 등록하기
      list/page.tsx               # 카풀 리스트(필터/검색)
      my/page.tsx                 # 나의 카풀 리스트
    (mypage)/
      page.tsx                    # 내 정보/설정/로그아웃
    api/
      health/route.ts             # (선택) 헬스체크
    layout.tsx
    globals.scss                  # 글로벌 SCSS
  components/
    common/                       # 범용 컴포넌트 (Button, Modal 등)
    feature/
      auth/
      schedule/
      checklist/
      health/
      maps/
      community/
      dashboard/
  hooks/
    useAuth.ts
    useChecklist.ts
    useHealth.ts
    useSchedule.ts
    useMaps.ts
  lib/
    queryClient.tsx               # TanStack Query Provider
    swr.tsx                       # SWRConfig Provider
    zustand/
      useAuthStore.ts
      useUIStore.ts
    utils/
      env.ts
      types.ts
    axios.ts                      # fetch/axios 래퍼
  services/                       # API 통신 모듈
    auth.service.ts
    schedule.service.ts
    checklist.service.ts
    health.service.ts
    maps.service.ts
    community.service.ts
  styles/
    tailwind.css
    theme.scss
  public/
    icons/
    images/
🧩 설치 및 초기 설정
1️⃣ 의존성 설치
bash
코드 복사
yarn add next react react-dom
yarn add -D typescript @types/react @types/node
yarn add @tanstack/react-query swr zustand
yarn add tailwindcss postcss autoprefixer
yarn add -D eslint prettier eslint-config-next
yarn add @emotion/react @emotion/styled
yarn add -D sass
yarn add @react-google-maps/api
2️⃣ Tailwind 초기화
bash
코드 복사
npx tailwindcss init -p
tailwind.config.js

js
코드 복사
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
src/styles/tailwind.css

css
코드 복사
@tailwind base;
@tailwind components;
@tailwind utilities;
3️⃣ Yarn Berry (PnP) 설정
.yarnrc.yml

yml
코드 복사
nodeLinker: pnp
yarnPath: .yarn/releases/yarn-berry.cjs
IDE에서 PnP SDK 인식:

bash
코드 복사
yarn dlx @yarnpkg/sdks vscode
4️⃣ package.json 스크립트
json
코드 복사
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc --noEmit"
  }
}
5️⃣ 환경변수 (.env.local)
ini
코드 복사
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY
```
