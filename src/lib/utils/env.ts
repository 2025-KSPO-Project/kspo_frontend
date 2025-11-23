export const env = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.com",
  GOOGLE_MAPS_API_KEY:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "DUMMY_GOOGLE_KEY",
  KAKAO_MAPS_API_KEY:
    process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY ?? "DUMMY_KAKAO_KEY",
};
