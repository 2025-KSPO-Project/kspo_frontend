import { create } from "zustand";

type OnboardingState = {
  // 지역
  provinceCode: string | null;
  districtCode: string | null;

  // 장애 유형
  disabilityCode: number | null;

  // 관심 종목 (복수 선택)
  sportCodes: number[];

  setProvince: (code: string | null) => void;
  setDistrict: (code: string | null) => void;
  setDisability: (code: number | null) => void;
  toggleSport: (code: number) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  provinceCode: null,
  districtCode: null,
  disabilityCode: null,
  sportCodes: [],

  setProvince: (code) =>
    set(() => ({
      provinceCode: code,
      // 시‧도가 바뀌면 시군구/시설도 초기화
      districtCode: null,
    })),

  setDistrict: (code) => set(() => ({ districtCode: code })),

  setDisability: (code) => set(() => ({ disabilityCode: code })),

  toggleSport: (code) =>
    set((state) => {
      const exists = state.sportCodes.includes(code);
      return {
        sportCodes: exists
          ? state.sportCodes.filter((c) => c !== code)
          : [...state.sportCodes, code],
      };
    }),

  reset: () =>
    set(() => ({
      provinceCode: null,
      districtCode: null,
      disabilityCode: null,
      sportCodes: [],
    })),
}));
