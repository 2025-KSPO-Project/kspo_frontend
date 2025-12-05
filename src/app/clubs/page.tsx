"use client";

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { useQuery } from '@tanstack/react-query'; 
import { CLUB_COLORS, DisabilityType } from "@/constants/clubs"; 
import { fetchClubs } from "@/api/clubApi"; 
import { type ClubData, type ClubListResponse } from "@/types/clubs"; 
import Pagination from "@/components/Pagination";

// -----------------------------------------------------------
// 상수 및 페이지네이션 설정
// -----------------------------------------------------------
const ITEMS_PER_PAGE = 10;
const INITIAL_PAGE = 0;

interface ClubCardProps {
    club: ClubData;
}

function ClubCard({ club }: ClubCardProps) {
    const clubName = club.clubName || "이름 없음";
    const disabilityType = club.disabilityType || "일반"; 
    const badgeKey = disabilityType as DisabilityType;
    const sportName = club.sportName || "미정";
    const provinceName = club.provinceName || "지역";
    const districtName = club.districtName || "미상";
    const introText = club.introText || "동호회 소개가 없습니다.";

    const badgeClass = CLUB_COLORS[badgeKey] || "bg-gray-200 text-gray-700";

    return (
        <Link
            key={club.id}
            href={`/clubs/${club.id}`}
            className="block w-full cursor-pointer rounded-3xl bg-white px-4 py-3 text-left shadow-sm"
        >
            {/* 상단: 클럽명 + 장애 유형 뱃지 */}
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-gray-900">
                    {clubName}
                </h3>
                <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeClass}`}
                >
                    {disabilityType}
                </span>
            </div>

            {/* 위치 */}
            <p className="mt-1 text-left text-[12px] text-gray-500">
                위치: {provinceName} {districtName}
            </p>

            {/* 종목 */}
            <p className="mt-1 text-left text-[13px] font-medium text-blue-600">
                종목: {sportName}
            </p>

            {/* 한 줄 소개 */}
            <p className="mt-2 text-left text-[11px] text-gray-400 truncate">
                {introText}
            </p>
        </Link>
    );
}

// -----------------------------------------------------------
// 메인 컴포넌트
// -----------------------------------------------------------
export default function ClubsPage() {
    const router = useRouter();
    const user = useAuthStore(state => state.user);
    const userName = user?.name || "사용자";
    
    // 1. 페이지 상태 추가
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

    // 2. React Query를 사용하여 API 데이터 호출 (타입 및 페이지 상태 반영)
    // useQuery의 제네릭 타입을 ClubListResponse로 지정
    const { data, isLoading, error } = useQuery<ClubListResponse>({
        // 쿼리 키에 currentPage를 포함하여 페이지 변경 시 재요청 트리거
        queryKey: ['clubsList', currentPage, ITEMS_PER_PAGE], 
        queryFn: () => fetchClubs(currentPage, ITEMS_PER_PAGE), // 현재 페이지 전달
        staleTime: 1000 * 60 * 5, 
        placeholderData: (previousData) => previousData,
    });

    // 3. 데이터 및 페이지네이션 정보 추출
    // 💡 data.data.content, data.data.totalPages 등 ClubListResponse 구조에 맞춰 접근
    const clubList = data?.data?.content || [];
    const totalPages = data?.data?.totalPages || 0;
    const totalClubs = data?.data?.totalElements || 0;
    
    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // -----------------------------------------------------------
    // 렌더링 상태 처리
    // -----------------------------------------------------------

    // 데이터가 없고 로딩 중일 때
    if (isLoading && !data) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
                <p className="text-gray-600 animate-pulse">동호회 목록을 불러오는 중...</p>
            </div>
        );
    }

    // API 응답 실패 처리 (error 객체 확인)
    const apiError = data?.error || error;
    
    if (apiError) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
                <p className="text-red-500">데이터 로딩 오류 발생: {apiError.message || apiError.toString()}</p>
                <p className="text-sm text-gray-500 mt-2">잠시 후 다시 시도해 주세요.</p>
            </div>
        );
    }
    
    // -----------------------------------------------------------
    // UI 렌더링
    // -----------------------------------------------------------

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* 상단 헤더 */}
            <header className="relative px-4 pt-4 pb-4 bg-white shadow-sm">
                {/* 뒤로가기 버튼 */}
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="cursor-pointer absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 shadow-sm"
                >
                    <span className="text-lg leading-none text-gray-600">‹</span>
                </button>

                {/* 중앙 인사 문구 */}
                <div className="mt-10 flex flex-col items-center text-center">
                    <p className="text-[11px] text-gray-400">체육동호회 찾기</p>
                    <h1 className="mt-1 text-base font-semibold text-gray-900">
                        안녕하세요! {userName}님
                    </h1>
                    <p className="mt-1 text-[12px] text-gray-500">
                        {userName}님을 위한 체육동호회 리스트에요 (총 {totalClubs}개)
                    </p>
                </div>
            </header>

            {/* 리스트 영역 */}
            <main className="flex-1 space-y-3 px-4 pb-4 pt-3">
                {clubList.map((club) => {
                    return (
                        <ClubCard key={club.id} club={club} />
                    );
                })}

                {clubList.length === 0 && !isLoading && (
                    <div className="mt-10 text-center text-sm text-gray-400">
                        현재 페이지에는 등록된 동호회가 없어요.
                    </div>
                )}
                 {/* 페이지네이션 컴포넌트 추가 */}
            <div className="sticky bottom-0 z-10">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    maxVisiblePages={5}
                />
            </div>
            </main>
            
           
        </div>
    );
}