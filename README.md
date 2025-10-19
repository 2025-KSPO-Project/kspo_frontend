🔥 프로젝트 개요

운동 일정/체크리스트/건강상태 기록을 중심으로 운동 루틴을 만들고, LLM 팁과 커뮤니티(카플), Google Maps 동선 등록을 지원하는 모바일 우선 웹앱.

🧰 Tech Stack

Framework & Language: Next.js (App Router), React 18, TypeScript

State: TanStack Query (서버 상태/뮤테이션), SWR (가벼운 캐시/폴링), Zustand (로컬 UI/세션 상태)

Styling: Tailwind CSS + Emotion(상태 기반 스타일) + SCSS(페이지 단위 커스텀)

Build: Next.js 기본 SWC (필요 시 Webpack 커스텀 가능, 실험용 Turbopack dev 지원)

※ Vite는 Next.js와 동시 사용하지 않습니다. 별도 마이크로 프런트엔드가 아닌 이상 Next 기본 SWC 사용이 가장 안정적입니다.

Quality: ESLint, Prettier

Package Manager: Yarn Berry (Plug’n’Play)

🗂 폴더 구조
src/
app/
(public)/
page.tsx # 랜딩(스플래시/온보딩 진입)
explore/page.tsx # 공개 리스트(카플/게시물 등)
(auth)/
login/page.tsx # 로그인
signup/page.tsx # 회원가입
(user)/
dashboard/page.tsx # 메인(오늘의 운동/요약 위젯)
plan/
page.tsx # 운동 일정 관리/등록
start/
page.tsx # 오늘의 운동 시작하기(진행 뷰)
check/
pre/page.tsx # 운동 전 체크리스트
during/page.tsx # 운동 중 체크리스트
post/page.tsx # 운동 후 체크리스트
health/
page.tsx # 건강 상태 평가/히스토리
map/
page.tsx # Google Map 동선 등록/경로 관리
(community)/
page.tsx # 카플 커뮤니티 허브
register/page.tsx # 카플 등록하기
list/page.tsx # 카플 리스트(필터/검색)
my/page.tsx # 나의 카플 리스트
(mypage)/
page.tsx # 내 정보/설정/로그아웃
api/health/route.ts # (선택) 헬스체크
layout.tsx
globals.scss # 글로벌 SCSS (Tailwind와 병행)
components/
common/ # 범용 컴포넌트(Button, Modal 등)
feature/
auth/
schedule/
checklist/
health/
maps/
community/
dashboard/
styles/
tailwind.css
theme.css
lib/
axios.ts # fetch/axios 래퍼(선택)
queryClient.tsx # TanStack Query Provider
swr.tsx # SWRConfig Provider
zustand/ # Zustand stores
useAuthStore.ts
useUIStore.ts
utils/
env.ts
types.ts
hooks/
useAuth.ts
useChecklist.ts
useHealth.ts
useMaps.ts
useSchedule.ts
services/ # API 모듈 (REST/GraphQL)
auth.service.ts
schedule.service.ts
checklist.service.ts
health.service.ts
community.service.ts
maps.service.ts
pages/ # (필요 시) Next pages 라우팅 호환
public/
icons/ images/

📦 설치 & 실행

# 0) Node 20 이상 권장

corepack enable

# 1) Next 앱 생성 후 Yarn Berry 세팅

yarn set version berry
yarn init -2

# 2) 의존성

yarn add next react react-dom
yarn add -D typescript @types/react @types/node
yarn add @tanstack/react-query swr zustand
yarn add tailwindcss postcss autoprefixer
yarn add -D eslint prettier eslint-config-next
yarn add @emotion/react @emotion/styled
yarn add -D sass

# (지도)

yarn add @react-google-maps/api

Tailwind 초기화
npx tailwindcss init -p

tailwind.config.js

module.exports = {
content: ["./src/**/*.{ts,tsx}"],
theme: { extend: {} },
plugins: [],
}

src/styles/tailwind.css

@tailwind base;
@tailwind components;
@tailwind utilities;

Yarn Berry PnP 설정

.yarnrc.yml

nodeLinker: pnp
yarnPath: .yarn/releases/yarn-berry.cjs

IDE가 PnP를 인식하도록 SDK 생성:

yarn dlx @yarnpkg/sdks vscode

스크립트

package.json

{
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "eslint . --ext .ts,.tsx",
"typecheck": "tsc --noEmit"
}
}

환경변수

.env.local

NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxx

🧭 상태관리 원칙

TanStack Query: 서버 상태(운동 일정/체크리스트/건강 기록/커뮤니티/지도 경로)와 모든 mutation.

SWR: 가벼운 read-only 데이터(공지, 마이크로 카운트, 폴링).

Zustand: 세션/로컬 UI 상태(모달, 토글, 현재 진행 중인 운동 step, 임시 폼 캐시).

🔐 코드 품질

ESLint: eslint-config-next 기반 + PnP 호환

Prettier: 기본 규칙, line width 100 추천
