"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function MyPage() {
  // 가상의 이메일 데이터 
  const userEmail = "example@naver.com"; 
    
  const { name, hydrated } = useUser();
  const router = useRouter();

  // 로딩 중이면 잠깐 숨김
  if (!hydrated) return null;

  const userName = name ?? "케어핏";

  // 공통 메뉴 항목 배열
  const menuItems = [
    { href: "/mypage/profile", icon: "👤", label: "내 정보 관리", color: "text-gray-900" },
    { href: "/workout", icon: "🏋️", label: "운동 관리", color: "text-gray-900" },
    { href: "/carpool/history", icon: "🚗", label: "카풀 이용 내역", color: "text-gray-900" },
  ];

  // 이메일 도메인 체크 (예시: 네이버만 N 로고 표시)
  const isNaverEmail = userEmail.endsWith('@naver.com');

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 1. 상단 헤더 및 인사 문구 (수정된 디자인 적용) */}
      <header className="relative bg-white px-4 pt-8 pb-6 shadow-sm">
        {/* 뒤로가기 버튼 - 왼쪽 상단*/}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        {/* 중앙 인사 문구 */}
        <div className="flex flex-col items-center text-center">
          <p className="text-xs text-gray-400">마이페이지</p>
          
          {/* 닉네임 + 이메일 */}
          <h1 className="mt-2 text-xl font-semibold text-gray-900">
            안녕하세요! {userName}님 👋
          </h1>
          
          {/* 이메일과 네이버 로고 */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <span>{userEmail}</span>
            {isNaverEmail && (
              <span className="flex h-5 w-5 items-center justify-center rounded bg-white/90 text-xs font-bold text-[#03C75A] shadow-sm">
                N
              </span>
            )}
          </div>
          
          {/* 하단 응원 메시지 */}
          <p className="mt-1 text-[13px] text-gray-500">
            {userName}님의 건강한 루틴을 응원해요!
          </p>
        </div>

        {/* 프로필 서클 재배치 */}
        <section className="mt-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 text-2xl font-bold text-white shadow-lg">
            {userName.slice(0, 1)}
          </div>
        </section>
      </header>

      {/* 2. 메뉴 섹션 (기존 스타일 유지) */}
      <main className="flex-1 space-y-3 px-4 pt-6 pb-24">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-xl bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl">{item.icon}</span>
              <span className="text-base font-medium text-gray-900">
                {item.label}
              </span>
            </div>
            <span className="text-lg text-gray-400 font-semibold">›</span>
          </Link>
        ))}

        {/* 3. 로그아웃 버튼 (붉은색 텍스트 및 버튼 스타일 유지) */}
        <button
          type="button"
          onClick={() => {
            alert("추후 로그아웃 로직과 연결 예정입니다.");
          }}
          className="mt-6 flex w-full items-center justify-between rounded-xl bg-white px-4 py-4 text-left text-base font-medium text-red-500 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <span className="text-xl">🚪</span>
            <span>로그아웃</span>
          </div>
        </button>
      </main>
    </div>
  );
}
