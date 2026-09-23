"use client";

import { LogOut, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import type { Appointment, Status } from "@/types/appwrite.types";

type AppointmentSummary = {
  documents: Appointment[];
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
};

const emptySummary: AppointmentSummary = {
  documents: [],
  totalCount: 0,
  scheduledCount: 0,
  pendingCount: 0,
  cancelledCount: 0,
};

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [summary, setSummary] = useState<AppointmentSummary>(emptySummary);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | Status>("all");

  const loadAppointments = useCallback(async () => {
    setSummary(await getRecentAppointmentList());
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem("careplus.admin") !== "authenticated") {
      router.replace("/");
      return;
    }

    setAuthorized(true);
    void loadAppointments();
    window.addEventListener("careplus:appointments-changed", loadAppointments);
    return () =>
      window.removeEventListener("careplus:appointments-changed", loadAppointments);
  }, [loadAppointments, router]);

  const appointments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return summary.documents.filter((appointment) => {
      const matchesStatus = status === "all" || appointment.status === status;
      const matchesQuery =
        !normalizedQuery ||
        appointment.patient.name.toLowerCase().includes(normalizedQuery) ||
        appointment.primaryPhysician.toLowerCase().includes(normalizedQuery) ||
        appointment.reason.toLowerCase().includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [query, status, summary.documents]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-300">
        <Image src="/assets/icons/loader.svg" alt="Checking admin access" width={40} height={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-dark-300 pb-12">
      <header className="admin-header">
        <div className="flex items-center gap-4">
          <Image src="/assets/icons/logo-full.svg" alt="CarePlus" width={150} height={42} className="h-9 w-auto" priority />
          <span className="hidden rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 sm:inline-flex">
            Administrator
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image src="/assets/images/admin.png" alt="Administrator" width={36} height={36} className="rounded-full" />
          <Button
            type="button"
            variant="outline"
            className="border-dark-500 bg-dark-400 text-dark-700"
            onClick={() => {
              window.sessionStorage.removeItem("careplus.admin");
              router.push("/");
            }}
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Exit admin</span>
          </Button>
        </div>
      </header>

      <section className="admin-main pt-10">
        <div className="w-full">
          <p className="text-sm font-medium text-green-500">ADMIN DASHBOARD</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Appointment overview</h1>
          <p className="mt-2 text-dark-700">Review every patient request and manage its status from one place.</p>
        </div>

        <div className="admin-stat">
          <StatCard count={summary.scheduledCount} label="Scheduled appointments" icon="appointments" tone="green" />
          <StatCard count={summary.pendingCount} label="Pending requests" icon="pending" tone="blue" />
          <StatCard count={summary.cancelledCount} label="Cancelled appointments" icon="cancelled" tone="red" />
        </div>

        <section className="w-full space-y-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">All appointments</h2>
              <p className="text-sm text-dark-700">{summary.totalCount} appointment{summary.totalCount === 1 ? "" : "s"} recorded</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative min-w-64">
                <span className="sr-only">Search appointments</span>
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-600" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search patient, doctor, or reason"
                  className="h-10 border-dark-500 bg-dark-400 pl-9 text-white"
                />
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as "all" | Status)}
                aria-label="Filter by appointment status"
                className="h-10 rounded-md border border-dark-500 bg-dark-400 px-3 text-sm text-white outline-none"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <DataTable columns={columns} data={appointments} />
        </section>
      </section>
    </main>
  );
}
