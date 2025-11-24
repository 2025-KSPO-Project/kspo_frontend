"use client";

import { useEffect, useRef } from "react";
import { loadKakaoMap } from "@/lib/kakaoLoader";

type KakaoMapProps = {
  lat: number;
  lng: number;
};

export default function KakaoMap({ lat, lng }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        await loadKakaoMap();
        if (!mapRef.current || cancelled) return;

        const { kakao } = window;

        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3,
        });

        new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(lat, lng),
        });
      } catch (e) {
        console.error("KakaoMap init 실패", e);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  return <div ref={mapRef} className="h-full w-full" />;
}
