"use client";

import { useEffect, useRef } from "react";
import { loadKakaoMap } from "@/lib/kakaoLoader";

type Props = {
  lat: number;
  lng: number;
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      await loadKakaoMap();

      if (!mapRef.current) return;

      const { kakao } = window;

      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      });

      new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(lat, lng),
      });
    }

    init();
  }, [lat, lng]);

  return <div ref={mapRef} className="h-full w-full" />;
}
