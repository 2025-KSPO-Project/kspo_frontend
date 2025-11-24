// 장애 유형별 컬러 매핑
export const CLUB_COLORS = {
  지체장애: "bg-blue-100 text-blue-800",
  시각장애: "bg-yellow-100 text-yellow-800",
  청각장애: "bg-green-100 text-green-800",
  발달장애: "bg-purple-100 text-purple-800",
  기타: "bg-gray-100 text-gray-700",
} as const;

// 장애 유형 타입 자동 생성
export type DisabilityType = keyof typeof CLUB_COLORS;

// 클럽 타입 정의
export type Club = {
  id: number;
  club_name: string;
  province_name: string;
  district_name: string;
  sport_name: string;
  sport_sub_name: string;
  intro_text: string;
  disability_type: DisabilityType;
};

// Mock 데이터 (실제 API 연결 가능)
export const clubs: Club[] = [
  {
    id: 1,
    club_name: "서울 배드민턴 클럽",
    province_name: "서울시",
    district_name: "강남구",
    sport_name: "배드민턴",
    sport_sub_name: "생활체육 배드민턴",
    intro_text: "즐겁게 운동하는 장애인 배드민턴 클럽!",
    disability_type: "지체장애",
  },
  {
    id: 2,
    club_name: "부산 휠체어 농구회",
    province_name: "부산광역시",
    district_name: "해운대구",
    sport_name: "농구",
    sport_sub_name: "휠체어 농구",
    intro_text: "초보부터 상급까지 누구나 환영!",
    disability_type: "발달장애",
  },
  {
    id: 3,
    club_name: "대구 수영교실",
    province_name: "대구광역시",
    district_name: "수성구",
    sport_name: "수영",
    sport_sub_name: "기초 수영",
    intro_text: "함께 건강한 수영 운동!",
    disability_type: "시각장애",
  },
];
