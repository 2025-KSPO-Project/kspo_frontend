export type HomeCardProps = {
  href: string;
  eyebrow: string; // 작은 상단 텍스트
  title: string; // 카드 타이틀
  description: string;
  color: "blue" | "purple" | "emerald" | "orange";
};

export const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    eyebrow: "text-blue-500",
    title: "text-blue-900",
    desc: "text-blue-700",
    circle: "border-blue-500 text-blue-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-100",
    eyebrow: "text-purple-500",
    title: "text-purple-900",
    desc: "text-purple-700",
    circle: "border-purple-500 text-purple-600",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    eyebrow: "text-emerald-500",
    title: "text-emerald-900",
    desc: "text-emerald-700",
    circle: "border-emerald-500 text-emerald-600",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    eyebrow: "text-orange-500",
    title: "text-orange-900",
    desc: "text-orange-700",
    circle: "border-orange-500 text-orange-600",
  },
};
