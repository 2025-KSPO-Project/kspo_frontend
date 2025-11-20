export function LoadingIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      {/* 원형 회전 */}
      <div className="h-24 w-24 rounded-full border-4 border-green-200 border-t-green-500 animate-spin"></div>

      {/* 중앙 아이콘 */}
      <div className="absolute text-green-600 font-bold text-xl animate-pulse">
        💪
      </div>
    </div>
  );
}
