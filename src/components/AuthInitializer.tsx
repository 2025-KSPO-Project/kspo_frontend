"use client";

import { useRef, ReactNode } from 'react';
import { useAuthStore, AuthState } from '@/lib/zustand/useAuthStore'; 

interface Props {
  // 서버에서 읽어온 초기 상태를 담는 Prop
  initialState: AuthState;
  children: ReactNode;
}

/**
 * 서버 컴포넌트에서 읽은 인증 상태를 Zustand 스토어에 주입합니다 (Hydration).
 * Next.js SSR과 CSR 상태를 동기화하는 핵심 컴포넌트입니다.
 */
export function AuthInitializer({ initialState, children }: Props) {
  // 컴포넌트가 마운트될 때마다 상태가 초기화되는 것을 막기 위해 useRef 사용
  const initialized = useRef(false);

  // 중요: 컴포넌트가 처음 렌더링될 때 (Hydration 시) 단 한 번만 실행되도록 보장
  if (!initialized.current) {
    // 서버에서 받은 초기 상태(토큰 유무, 유저 정보)를 Zustand 스토어에 주입
    // 이 작업을 통해 CSR(클라이언트) 코드 실행 전 인증 상태가 미리 설정됩니다.
    useAuthStore.setState(initialState);
    initialized.current = true;
  }

  // Zustand 상태가 주입된 후, 자식 컴포넌트를 렌더링
  return <>{children}</>;
}