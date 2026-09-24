import Image from "next/image";

import type { Status } from "@/types/appwrite.types";

const statusStyles: Record<Status, string> = {
  scheduled: "bg-green-600 text-green-500",
  pending: "bg-blue-600 text-blue-500",
  cancelled: "bg-red-600 text-red-500",
};

const statusLabels: Record<Status, string> = {
  scheduled: "Scheduled",
  pending: "Pending review",
  cancelled: "Cancelled",
};

export const StatusBadge = ({ status }: { status: Status }) => (
  <div className={`status-badge ${statusStyles[status]}`}>
    <Image src={`/assets/icons/${status}.svg`} alt="" width={18} height={18} />
    <span>{statusLabels[status]}</span>
  </div>
);
