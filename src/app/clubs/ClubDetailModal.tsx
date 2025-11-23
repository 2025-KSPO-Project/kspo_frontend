"use client";

import type { Club } from "./page";

export default function ClubDetailModal({
  club,
  onClose,
}: {
  club: Club;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      {/* 바깥 클릭하면 모달 닫힘 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 컨테이너 */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-t-3xl p-6 shadow-lg animate-slide-up">
        {/* 상단 닫기 버튼 */}
        <button
          className="absolute right-4 top-4 text-gray-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{club.club_name}</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>위치:</strong> {club.province_name} {club.district_name}
          </p>
          <p>
            <strong>종목:</strong> {club.sport_name}
          </p>
          <p>
            <strong>세부 종목:</strong> {club.sport_sub_name}
          </p>
          <p>
            <strong>소개문구:</strong> {club.intro_text}
          </p>
        </div>
      </div>
    </div>
  );
}
