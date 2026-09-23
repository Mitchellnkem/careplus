import Image from "next/image";

type StatCardProps = {
  count: number;
  label: string;
  icon: "appointments" | "pending" | "cancelled";
  tone: "green" | "blue" | "red";
};

const toneStyles = {
  green: "border-green-500/20 bg-green-500/10",
  blue: "border-blue-500/20 bg-blue-500/10",
  red: "border-red-500/20 bg-red-500/10",
};

export function StatCard({ count, label, icon, tone }: StatCardProps) {
  return (
    <article className={`stat-card border ${toneStyles[tone]}`}>
      <div className="flex items-center gap-4">
        <Image src={`/assets/icons/${icon}.svg`} alt="" width={32} height={32} />
        <strong className="text-3xl text-white">{count}</strong>
      </div>
      <p className="text-sm text-dark-700">{label}</p>
    </article>
  );
}
