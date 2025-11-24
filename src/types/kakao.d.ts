declare global {
  interface Window {
    kakao: KakaoNamespace;
  }
}

/**
 * Kakao Maps 타입 정의 (커스텀)
 */
interface KakaoNamespace {
  maps: KakaoMaps;
}

interface KakaoMaps {
  load(callback: () => void): void;
  LatLng: LatLngConstructor;
  Map: MapConstructor;
  Marker: MarkerConstructor;
}

/* -------------------
 * LatLng 타입
 * ------------------- */
interface LatLng {
  getLat(): number;
  getLng(): number;
}
interface LatLngConstructor {
  new (lat: number, lng: number): LatLng;
}

/* -------------------
 * Map 타입
 * ------------------- */
interface KakaoMap {
  setCenter(latlng: LatLng): void;
}
interface MapConstructor {
  new (
    container: HTMLElement,
    options: { center: LatLng; level: number }
  ): KakaoMap;
}

/* -------------------
 * Marker 타입
 * ------------------- */
interface Marker {
  setMap(map: KakaoMap | null): void;
}
interface MarkerConstructor {
  new (options: { map: KakaoMap; position: LatLng }): Marker;
}

export {};
