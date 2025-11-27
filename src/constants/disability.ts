export type DisabilityType = {
  code: number;
  name: string;
};

export const DISABILITY_TYPES: DisabilityType[] = [
  { code: 1, name: "지체(척수 및 절단 및 기타)장애" },
  { code: 2, name: "발달(지적/자폐)장애" },
  { code: 3, name: "기타장애" },
  { code: 4, name: "청각장애" },
  { code: 5, name: "뇌병변장애" },
  { code: 6, name: "시각장애" },
];
