"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const TABS = [
  { href: "/home", label: "홈" },
  { href: "/workout", label: "운동관리" },
  { href: "/carpool", label: "카풀" },
  { href: "/mypage", label: "마이페이지" },
];

export function BottomNavigator() {
  const pathname = usePathname();
  const { isLoggedIn, hydrated } = useAuth();

  // 아직 클라이언트에서 로그인 상태 못 읽었으면 아무것도 렌더 X
  if (!hydrated) return null;

  // 로그인 안 되어 있으면 네비게이션 숨김
  if (!isLoggedIn) return null;

  return (
    <nav className="mt-auto border-t border-gray-200 bg-white px-6 pb-4 pt-2">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/home" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-1 items-center justify-center"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border text-[10px] font-medium transition-colors ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
