"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "@/app/(public)/SplashScreen";
import { MainLanding } from "@/app/(public)/MainLanding";

export default function SplashPage() {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showMain) {
    return <SplashScreen />;
  }

  return <MainLanding />;
}
