// 공통 유저
export type UserRole = "USER" | "PROTECTOR" | "DRIVER";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  region?: string; // 시/도-시군구
}

// 운동 관련
export type WorkoutIntensity = "LOW" | "MEDIUM" | "HIGH";

export interface WorkoutPlan {
  id: string;
  title: string;
  date: string; // ISO
  durationMinutes: number;
  intensity: WorkoutIntensity;
}

export interface WorkoutChecklistItem {
  id: string;
  phase: "PRE" | "DURING" | "POST";
  label: string;
  description?: string;
  required?: boolean;
}

export interface WorkoutSessionSummary {
  id: string;
  date: string;
  totalMinutes: number;
  calories: number;
  notes?: string;
}

// 체육시설
export type SportType = "GYM" | "SWIMMING" | "BASKETBALL" | "FOOTBALL" | "ETC";

export interface Facility {
  id: string;
  name: string;
  address: string;
  sportType: SportType;
  isAccessible: boolean; // 휠체어 접근 가능 여부
  distanceMeters?: number;
}

// 카풀
export type DisabilityType =
  | "TYPE_PHYSICAL"
  | "TYPE_CEREBRAL"
  | "TYPE_VISUAL"
  | "TYPE_HEARING";

export type SupportRequirement =
  | "SUPPORT_WHEEL_STORAGE"
  | "SUPPORT_ASSIST_BOARDING";

export type DrivingStylePreference =
  | "PREF_QUIET"
  | "PREF_SLOW_PACE"
  | "PREF_TALKATIVE";

export type ExtraHelpRequest =
  | "REQUEST_WHEEL_ASSEMBLE"
  | "REQUEST_CARRY_LUGGAGE"
  | "NONE";

export interface CarpoolListing {
  id: string;
  title: string;
  departureName: string;
  arrivalName: string;
  departureTime: string; // ISO
  disabilityType: DisabilityType;
  supportRequirements: SupportRequirement[];
  drivingPreferences: DrivingStylePreference[];
  extraHelp: ExtraHelpRequest;
  dangerScore: number; // 0~100
}

export interface CarpoolRisk {
  carpoolId: string;
  totalScore: number;
  slopeScore: number;
  distanceScore: number;
}

// API 공통 응답 (실제로 API 붙일 때 확장)
export interface ApiResponse<T> {
  data: T;
}
