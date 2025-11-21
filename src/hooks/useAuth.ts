"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "carefit_isLoggedIn";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false); // 클라이언트에서 준비 완료 여부

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setIsLoggedIn(stored === "true");
    setHydrated(true); // 로컬스토리지 읽기 끝
  }, []);

  return { isLoggedIn, hydrated };
}

// 로그인/로그아웃용 유틸 함수
export function setDummyLogin(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
}
