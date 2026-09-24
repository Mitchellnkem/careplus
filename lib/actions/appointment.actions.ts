import type { Appointment, Patient, Status } from "@/types/appwrite.types";
import { getPatient } from "@/lib/actions/patient.actions";

export const APPOINTMENTS_STORAGE_KEY = "careplus.appointments";

const isAppointmentStatus = (value: unknown): value is Status =>
  value === "pending" || value === "scheduled" || value === "cancelled";

const readAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return [];
  try {
    const appointments = JSON.parse(
      window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY) ?? "[]"
    ) as Appointment[];

    return appointments.map((appointment) => ({
      ...appointment,
      status: isAppointmentStatus(appointment.status)
        ? appointment.status
        : "pending",
    }));
  } catch {
    return [];
  }
};

const saveAppointments = (appointments: Appointment[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      APPOINTMENTS_STORAGE_KEY,
      JSON.stringify(appointments)
    );
    window.dispatchEvent(new Event("careplus:appointments-changed"));
  }
};

type CreateAppointmentInput = {
  userId: string;
  patient: string | Patient;
  primaryPhysician: string;
  schedule: Date;
  reason: string;
  status: Status;
  note?: string;
};

export const createAppointment = async (input: CreateAppointmentInput): Promise<Appointment> => {
  const patient =
    typeof input.patient === "string"
      ? ((await getPatient(input.userId)) ??
        ({ $id: input.patient, name: "Patient" } as Patient))
      : input.patient;
  const appointment: Appointment = {
    ...input,
    $id: crypto.randomUUID(),
    patient,
    schedule: input.schedule.toISOString(),
  };
  saveAppointments([...readAppointments(), appointment]);
  return appointment;
};

type UpdateAppointmentInput = {
  userId: string;
  appointmentId: string;
  appointment: {
    primaryPhysician: string;
    schedule: Date;
    status: Status;
    cancellationReason?: string;
  };
  type: "schedule" | "cancel";
};

export const updateAppointment = async ({ appointmentId, appointment: changes }: UpdateAppointmentInput): Promise<Appointment | null> => {
  const appointments = readAppointments();
  let updated: Appointment | null = null;
  const nextAppointments = appointments.map((appointment) => {
    if (appointment.$id !== appointmentId) return appointment;
    updated = { ...appointment, ...changes, schedule: changes.schedule.toISOString() };
    return updated;
  });
  saveAppointments(nextAppointments);
  return updated;
};

export const getAppointment = async (appointmentId: string): Promise<Appointment | null> =>
  readAppointments().find((appointment) => appointment.$id === appointmentId) ?? null;

export const getRecentAppointmentList = async () => {
  const hydratedAppointments = await Promise.all(
    readAppointments().map(async (appointment) => ({
      ...appointment,
      patient: (await getPatient(appointment.userId)) ?? appointment.patient,
    }))
  );
  const documents = hydratedAppointments.sort(
    (a, b) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime()
  );
  return {
    documents,
    totalCount: documents.length,
    scheduledCount: documents.filter((item) => item.status === "scheduled").length,
    pendingCount: documents.filter((item) => item.status === "pending").length,
    cancelledCount: documents.filter((item) => item.status === "cancelled").length,
  };
};
