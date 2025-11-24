export type Competition = {
  id: string;
  name: string; // 대회명
  mainEvent: string; // 주종목명
  subEvent: string; // 세부종목명
  organizer: string; // 주관 협회명
  startDate: string; // "2025-01-15" 같은 형태
  endDate: string;
  distanceKm: number; // 사용자의 현재 위치와의 거리(km)
  officialUrl: string; // 대회 공식 홈페이지
  isFavorite?: boolean;
};

export const competitionsMock: Competition[] = [
  {
    id: "1",
    name: "서울시 생활체육 마라톤 대회",
    mainEvent: "마라톤",
    subEvent: "하프 / 풀코스",
    organizer: "서울시체육회",
    startDate: "2025-03-10",
    endDate: "2025-03-10",
    distanceKm: 3.2,
    officialUrl: "https://example.com/marathon",
    isFavorite: true,
  },
  {
    id: "2",
    name: "한강 3대구간 수영 챌린지",
    mainEvent: "수영",
    subEvent: "자유형 / 계영",
    organizer: "대한수영연맹",
    startDate: "2025-04-01",
    endDate: "2025-04-02",
    distanceKm: 7.8,
    officialUrl: "https://example.com/swim",
  },
  {
    id: "3",
    name: "전국 직장인 농구 리그",
    mainEvent: "농구",
    subEvent: "5:5 풀코트",
    organizer: "대한농구협회",
    startDate: "2025-02-20",
    endDate: "2025-02-22",
    distanceKm: 15.4,
    officialUrl: "https://example.com/basketball",
    isFavorite: true,
  },
];
