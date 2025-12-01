import { colorClasses, HomeCardProps } from "@/constants/home";
import Link from "next/link";

export function HomeCard({
  href,
  eyebrow,
  title,
  description,
  color,
}: HomeCardProps) {
  const c = colorClasses[color];

  return (
    <Link
      href={href}
      className={`flex h-40 flex-col justify-between rounded-3xl border px-4 py-4 shadow-sm ${c.bg} ${c.border}`}
    >
      <div>
        <p className={`text-[11px] font-medium ${c.eyebrow}`}>{eyebrow}</p>
        <h2 className={`mt-2 text-base font-semibold ${c.title}`}>{title}</h2>
      </div>
      <div
        className={`mt-3 flex items-center justify-between text-[12px] ${c.desc}`}
      >
        <span>{description}</span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-semibold ${c.circle}`}
        >
          GO
        </span>
      </div>
    </Link>
  );
}
