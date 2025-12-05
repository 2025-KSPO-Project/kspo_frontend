import axiosBase from "axios";
import { env } from "@/lib/utils/env";
import { useAuthStore } from "@/lib/zustand/useAuthStore";

// axios 인스턴스
export const api = axiosBase.create({
  baseURL: env.API_BASE_URL,
  withCredentials: false,
});

// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    try {
      const token = useAuthStore.getState().accessToken;

      if (token) {
        // Axios v1 기준: headers가 AxiosHeaders일 수도, 일반 객체일 수도 있어서 둘 다 처리
        const headers = config.headers;

        if (typeof headers.set === "function") {
          // AxiosHeaders 인스턴스인 경우
          headers.set("Authorization", `Bearer ${token}`);
        } else {
          // 그냥 일반 객체인 경우
          headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // 서버 컴포넌트에서 호출 시 등 에러는 무시
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 간단한 헬퍼
export async function getJSON<T>(url: string, params?: unknown): Promise<T> {
  const res = await api.get<T>(url, { params });
  return res.data;
}

export async function postJSON<T>(url: string, data?: unknown): Promise<T> {
  const res = await api.post<T>(url, data);
  return res.data;
}
