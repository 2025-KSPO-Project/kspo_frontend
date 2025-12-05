"use client";

import React, { ReactNode, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number; // 현재 페이지 (0부터 시작)
    totalPages: number;  // 전체 페이지 수
    onPageChange: (page: number) => void; // 페이지 변경 핸들러
    maxVisiblePages?: number; // 화면에 표시될 최대 페이지 버튼 수
}
interface PaginationButtonProps {
    children: ReactNode;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
    className?: string;
}

const PaginationButton = ({ children, onClick, active = false, disabled = false, className = '' }: PaginationButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`h-8 w-8 p-0 flex items-center justify-center rounded-md text-sm font-medium transition-colors 
            ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${className}
        `}
    >
        {children}
    </button>
);


/**
 * 목록을 위한 페이지네이션 컴포넌트
 * (0-based indexing 기준)
 */
export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5,
}: PaginationProps) {

    // 💡 수정 사항: totalPages가 1 이하일 경우에도 null을 반환하지 않고 계속 렌더링합니다.
    // totalPages가 0인 경우를 대비해 totalPages를 최소 1로 설정하여 렌더링 오류를 방지합니다.
    const safeTotalPages = Math.max(1, totalPages);
    
    // 표시할 페이지 버튼 목록 계산 (로직 유지)
    const pageNumbers = useMemo(() => {
        const pages: number[] = [];
        
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(safeTotalPages - 1, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage, safeTotalPages, maxVisiblePages]);

    const handlePageClick = (pageIndex: number) => {
        // totalPages가 1일 경우에도 onPageChange가 불필요하게 호출되는 것을 방지
        if (pageIndex !== currentPage && pageIndex >= 0 && pageIndex < safeTotalPages) {
            onPageChange(pageIndex);
        }
    };

    const isLastPage = currentPage === safeTotalPages - 1;
    const isFirstPage = currentPage === 0;

    return (
        <div className="flex-shrink-0 p-4 bg-white shadow-inner">
            <div className="flex items-center justify-center gap-1">
                {/* 1. 처음 페이지로 (<<) */}
                <PaginationButton
                    onClick={() => handlePageClick(0)}
                    disabled={isFirstPage}
                    className="h-8 w-10"
                >
                    <ChevronsLeft className="w-4 h-4" />
                </PaginationButton>
                
                {/* 2. 이전 페이지로 (<) */}
                <PaginationButton
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={isFirstPage}
                    className="h-8 w-10"
                >
                    <ChevronLeft className="w-4 h-4" />
                </PaginationButton>

                {/* 3. 페이지 번호 목록 */}
                <div className="flex gap-1 mx-2">
                    {/* totalPages가 1일 경우, pageNumbers는 [0]만 포함합니다. */}
                    {pageNumbers.map((pageIndex) => (
                        <PaginationButton
                            key={pageIndex}
                            onClick={() => handlePageClick(pageIndex)}
                            active={currentPage === pageIndex}
                        >
                            {pageIndex + 1}
                        </PaginationButton>
                    ))}
                </div>

                {/* 4. 다음 페이지로 (>) */}
                <PaginationButton
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={isLastPage}
                    className="h-8 w-10"
                >
                    <ChevronRight className="w-4 h-4" />
                </PaginationButton>

                {/* 5. 마지막 페이지로 (>>) */}
                <PaginationButton
                    onClick={() => handlePageClick(safeTotalPages - 1)}
                    disabled={isLastPage}
                    className="h-8 w-10"
                >
                    <ChevronsRight className="w-4 h-4" />
                </PaginationButton>
            </div>
        </div>
    );
}