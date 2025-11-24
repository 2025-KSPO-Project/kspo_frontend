export type FacilityType =
  | "GYM"
  | "SWIMMING"
  | "BASKETBALL"
  | "FOOTBALL"
  | "OTHER";

export type Facility = {
  id: string;
  name: string;
  provinceName: string; // 시도명
  districtName: string; // 시군구명
  address: string; // 나머지 주소
  sportType: FacilityType;
  mainSportName: string; // 주요 종목명
  distanceKm?: number;
  lat: number;
  lng: number;
};

export function sportLabel(type: FacilityType) {
  switch (type) {
    case "GYM":
      return "체력단련실";
    case "SWIMMING":
      return "수영장";
    case "BASKETBALL":
      return "농구장";
    case "FOOTBALL":
      return "축구장";
    default:
      return "기타";
  }
}

// ⭐ 목업 데이터
export const facilitiesMock: Facility[] = [
  {
    id: "1",
    name: "서울 장애인 체력단련실",
    provinceName: "서울특별시",
    districtName: "마포구",
    address: "동교로 45",
    sportType: "GYM",
    mainSportName: "헬스 / 근력운동",
    distanceKm: 0.8,
    lat: 37.555,
    lng: 126.92,
  },
  {
    id: "2",
    name: "마포구 종합수영장",
    provinceName: "서울특별시",
    districtName: "마포구",
    address: "월드컵북로 240",
    sportType: "SWIMMING",
    mainSportName: "수영",
    distanceKm: 1.5,
    lat: 37.569,
    lng: 126.9,
  },
  {
    id: "3",
    name: "장애인 농구 클럽 체육관",
    provinceName: "경기도",
    districtName: "고양시 덕양구",
    address: "고양대로 1234",
    sportType: "BASKETBALL",
    mainSportName: "농구",
    distanceKm: 3.2,
    lat: 37.63,
    lng: 126.83,
  },
  {
    id: "4",
    name: "월드컵 보조 축구장",
    provinceName: "서울특별시",
    districtName: "마포구",
    address: "성산로 240",
    sportType: "FOOTBALL",
    mainSportName: "축구",
    distanceKm: 2.0,
    lat: 37.568,
    lng: 126.9,
  },
];
