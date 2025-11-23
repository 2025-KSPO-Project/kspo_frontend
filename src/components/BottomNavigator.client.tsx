"use client";

import dynamic from "next/dynamic";

const BottomNavigator = dynamic(() => import("./BottomNavigator"), {
  ssr: false,
});

export default function BottomNavigatorClient() {
  return <BottomNavigator />;
}
