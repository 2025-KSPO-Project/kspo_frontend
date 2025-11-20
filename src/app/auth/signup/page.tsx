"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = name.trim().length > 0 && nickname.trim().length > 0;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: 여기에서 실제 회원가입 API 호출 or Zustand에 임시 저장
    router.push("/onboarding/location");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 py-8 ">
      {/* 상단 바 */}
      <header className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-gray-400"
        >
          뒤로
        </button>
      </header>

      {/* 타이틀 */}
      <section className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          Carefit에 오신 걸 환영해요 👋
        </h1>
        <p className="mt-2 text-xs text-gray-500">
          네이버 계정으로 기본 정보는 가져올 수 있지만,
          <br />
          운동 파트너 추천을 위해 몇 가지만 더 알려주세요.
        </p>
      </section>

      {/* 폼 */}
      <form onSubmit={handleNext} className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="실명을 입력해 주세요"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              닉네임 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="운동 파트너에게 보여질 이름"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-black"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <p className="text-[10px] text-gray-400">
              예: 축구 좋아하는 재활러, 주 3회 러너 등 자유롭게 작성해 주세요.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              연락처 (선택)
            </label>
            <input
              type="tel"
              placeholder="카풀/동호회 참여 시 연락받을 번호"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full rounded-xl py-3 text-sm font-semibold ${
              isValid
                ? "bg-black text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            다음 (시·도 설정하기)
          </button>
          <p className="text-[10px] text-center text-gray-400">
            다음 단계에서 거주 지역과 운동 목적을 선택하면,
            <br />
            동호회·대회·체육시설 추천을 더 정확하게 받을 수 있어요.
          </p>
        </div>
      </form>
    </main>
  );
}
