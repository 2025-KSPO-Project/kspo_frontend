"use client";

import { create } from "zustand";
import type { User } from "@/lib/utils/types";

// User 객체와 AccessToken이 nullable임을 정의합니다.
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean; 
  
  // 클라이언트 액션
  setAuth?: (user: User, token: string) => void;
  clearAuth?: () => void;
  
  // 추가: SSR/Hydration을 위한 초기화 함수
  initializeAuth?: (user: User | null, token: string | null) => void;
}

// 초기 상태
const initialAuthState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialAuthState,

  // 1. SSR/Hydration을 위한 초기화 함수 (서버 데이터를 클라이언트에 주입)
  initializeAuth: (user, token) => {
    // 이 함수는 서버 컴포넌트에서 읽은 초기 데이터를 클라이언트에서 단 한 번 주입할 때 사용됩니다.
    set({
      user: user,
      accessToken: token,
      isLoggedIn: !!token,
    });
  },

  // 2. 클라이언트 액션 (로그인 성공 시)
  setAuth: (user, token) => 
    set({ 
      user, 
      accessToken: token, 
      isLoggedIn: true // 로그인 성공 시 true 설정
    }),

  // 3. 클라이언트 액션 (로그아웃 시)
  clearAuth: () => set(initialAuthState),
}));