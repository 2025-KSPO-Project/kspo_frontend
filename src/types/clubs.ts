// -----------------------------------------------------------
// 1. 개별 동호회 데이터 타입
// -----------------------------------------------------------
/**
 * API 응답 data.content 배열에 포함되는 개별 동호회 정보입니다.
 * (ClubsPage 컴포넌트에서 사용하는 UI 필드를 포함하여 확장 정의)
 */
export interface ClubData {
    // API에 존재하는 필수 필드
    id: number;
    clubName: string;
    regionKey: string;
    sportName: string;
    disabilityType?: string; // 예: "지체", "시각" (UI 배지에 사용됨)
    provinceName?: string; // 예: "서울특별시" (UI 위치에 사용됨)
    districtName?: string; // 예: "강남구"
    introText?: string;    // 예: "즐겁게 운동해요" (UI 소개글에 사용됨)
}

// -----------------------------------------------------------
// 2. 페이지네이션 정보 타입
// -----------------------------------------------------------
/**
 * Spring Data JPA 기반의 표준 페이지네이션 정보 타입입니다.
 */
export interface PageableInfo {
    offset: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
}

// -----------------------------------------------------------
// 3. API 응답 데이터 (data 객체) 타입
// -----------------------------------------------------------
/**
 * API 응답 JSON의 최상위 "data" 객체 구조입니다.
 */
export interface ClubResponseData {
    totalPages: number;
    totalElements: number;
    size: number;
    content: ClubData[]; // 개별 동호회 배열
    number: number; // 현재 페이지 번호
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    pageable: PageableInfo;
    first: boolean;
    last: boolean;
    empty: boolean;
}

// -----------------------------------------------------------
// 4. 최종 API 응답 타입
// -----------------------------------------------------------
/**
 * /clubs/list/local 엔드포인트의 최종 응답 타입입니다.
 */
export interface ClubListResponse {
    success: boolean;
    data: ClubResponseData | null; // 성공 시 데이터, 실패 시 null
    error: {
        errorCode: string;
        message: string;
    } | null;
}