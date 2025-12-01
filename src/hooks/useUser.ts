"use client";

import { useEffect, useState } from "react";

const USERNAME_KEY = "carefit_userName";

export function useUser() {
  const [name, setName] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(USERNAME_KEY);
    if (stored) setName(stored);
    setHydrated(true);
  }, []);

  const saveName = (newName: string) => {
    setName(newName);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(USERNAME_KEY, newName);
    }
  };

  return { name, setName: saveName, hydrated };
}

// 개발용 더미 저장 함수 (로그인 로직에서 호출)
export function setDummyUserName(name: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERNAME_KEY, name);
}
