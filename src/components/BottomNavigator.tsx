"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const TABS = [
  { href: "/home", label: "홈", icon: "🏠" },
  { href: "/carpool", label: "카풀", icon: "🚗" },
  { href: "/mypage", label: "마이페이지", icon: "👤" },
  { href: "/more", label: "더보기", icon: "⋯" },
];

export default function BottomNavigator() {
  const pathname = usePathname();
  const { isLoggedIn, hydrated } = useAuth();

  if (!hydrated) return null;
  if (!isLoggedIn) return null;

  return (
    <nav className="mt-auto bg-white/90 backdrop-blur-md shadow-[0_-3px_10px_rgba(0,0,0,0.06)] px-6 pb-5 pt-3">
      {/* ✅ border-t 제거해서 위 화면과의 경계선 없어짐 */}
      <div className="mx-auto flex max-w-md items-center justify-between gap-5">
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
              <button
                type="button"
                className={`
                  flex h-12 w-14 flex-col items-center justify-center
                  rounded-2xl text-[10px] font-medium transition-all
                  shadow-sm
                  ${
                    isActive
                      ? "bg-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] scale-110"
                      : "bg-white text-gray-600 border border-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.08)] active:scale-95"
                  }
                `}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                <span className="mt-1 leading-none">{tab.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
