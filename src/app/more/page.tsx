"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // 뒤로가기 버튼 사용을 위해 useRouter 추가

export default function MorePage() {
  const router = useRouter(); 

  // 공통 메뉴 항목 배열
  const menuItems = [
    { 
      href: "/notices", 
      icon: "📢", 
      title: "공지사항", 
      description: "서비스 이용 안내 및 업데이트 소식", 
      isLink: true 
    },
    { 
      action: () => { 
        alert("카카오 상담 채널과 연동 예정입니다."); 
      }, 
      icon: "💬", 
      title: "카톡 상담", 
      description: "1:1 실시간 채팅 상담 문의", 
      isLink: false 
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 1. 상단 헤더 */}
      <header className="relative bg-white px-4 pt-8 pb-6 shadow-sm">
        
        {/* 뒤로가기 버튼 - 왼쪽 상단 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        {/* 중앙 헤더 문구 */}
        <div className="flex flex-col items-center text-center mt-4">
          <p className="text-xs text-gray-400">지원 및 정보</p>
          <h1 className="mt-2 text-xl font-semibold text-gray-900">
            더보기
          </h1>
          <p className="mt-1 text-[13px] text-gray-500">
            공지사항과 상담 메뉴를 확인해 보세요.
          </p>
        </div>
      </header>

      {/* 2. 메뉴 섹션 */}
      <main className="flex-1 space-y-3 px-4 pt-6 pb-24">
        <section className="space-y-3">
          {menuItems.map((item) => {
            const Content = (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    {/* 타이틀 */}
                    <p className="text-base font-medium text-gray-900">
                      {item.title}
                    </p>
                    {/* 설명 */}
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* 우측 아이콘 */}
                <span className="text-lg text-gray-400 font-semibold">›</span>
              </>
            );

            const commonClass = "flex items-center justify-between rounded-xl bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md";

            if (item.isLink) {
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={commonClass}
                >
                  {Content}
                </Link>
              );
            } else {
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={item.action}
                  // 카톡 상담 버튼은 text-left가 필요
                  className={`w-full text-left ${commonClass}`}
                >
                  {Content}
                </button>
              );
            }
          })}
        </section>
      </main>
    </div>
  );
}
