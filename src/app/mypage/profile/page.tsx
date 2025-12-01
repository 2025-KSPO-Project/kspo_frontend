"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
  const router = useRouter();
  const { name, setName, hydrated } = useUser();
  const [localName, setLocalName] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    setLocalName(name ?? "");
  }, [hydrated, name]);

  const handleSave = () => {
    const trimmed = localName.trim();
    if (!trimmed) {
      alert("이름을 입력해주세요.");
      return;
    }
    setName(trimmed); // 🔥 useUser에서 넘어온 setName 사용
    alert("내 정보가 저장되었습니다.");
    router.back(); // 혹은 router.push("/mypage");
  };

  if (!hydrated) return null;

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 px-5 pt-8 pb-24">
      <header className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-gray-500"
        >
          ← 뒤로
        </button>
        <h1 className="text-sm font-semibold text-gray-900">내 정보 관리</h1>
        <div className="w-8" />
      </header>

      <section className="rounded-3xl bg-white px-4 py-5 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-gray-900">기본 정보</h2>
        <p className="mb-4 text-[11px] text-gray-500">
          홈 화면과 마이페이지에 표시될 이름을 관리할 수 있어요.
        </p>

        <label className="block text-xs font-medium text-gray-700">
          이름 / 닉네임
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500"
            placeholder="이름을 입력해주세요"
          />
        </label>
      </section>

      <button
        type="button"
        onClick={handleSave}
        className="mt-8 w-full rounded-2xl bg-teal-500 py-3 text-sm font-semibold text-white shadow-sm active:scale-[0.98]"
      >
        저장하기
      </button>
    </main>
  );
}
