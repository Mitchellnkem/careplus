"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Appointment } from "@/types/appwrite.types";

import { AppointmentForm } from "./forms/AppointmentForm";

type AppointmentModalProps = {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
};

export const AppointmentModal = ({ patientId, userId, appointment, type, title, description }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="ghost" className={type === "schedule" ? "text-green-500" : "text-red-500"} onClick={() => setOpen(true)}>
        {type === "schedule" ? "Schedule" : "Cancel"}
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={() => setOpen(false)}>
          <div className="shad-dialog w-full max-w-xl rounded-xl border p-6" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div><h2 className="text-xl font-semibold">{title}</h2><p className="mt-1 text-sm text-dark-700">{description}</p></div>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} aria-label="Close">×</Button>
            </div>
            <AppointmentForm userId={userId} patientId={patientId} type={type} appointment={appointment} setOpen={setOpen} />
          </div>
        </div>
      )}
    </>
  );
};
