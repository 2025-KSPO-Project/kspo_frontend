"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkoutScheduleNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 여기서 실제 API로 일정 저장하면 됨
    console.log("운동일정 등록:", { title, date, time });

    alert("운동일정이 등록되었습니다.");
    router.push("/workout"); // 메인으로 이동
  };

  return (
    <main className="flex min-h-screen flex-col bg-white px-4 py-6">
      {/* 상단 헤더 */}
      <header className="relative px-4 pt-4 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-[16px]">운동일정 등록하기</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-800">
            운동명
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full border-b border-gray-300 bg-transparent py-1 text-sm outline-none focus:border-black"
              placeholder="예) 걷기 30분"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            날짜
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full border-b border-red-400 bg-transparent py-1 text-sm outline-none focus:border-black"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            운동시간
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 w-full border-b border-gray-300 bg-transparent py-1 text-sm outline-none focus:border-black"
            />
          </label>
        </div>

        <button
          type="submit"
          className="cursor-pointer mt-6 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white"
        >
          등록하기
        </button>
      </form>
    </main>
  );
}
