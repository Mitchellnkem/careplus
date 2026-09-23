"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import type { Appointment } from "@/types/appwrite.types";

export default function AppointmentSuccessPage() {
  const { userId } = useParams<{ userId: string }>();
  const appointmentId = useSearchParams().get("appointmentId");
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (appointmentId) void getAppointment(appointmentId).then(setAppointment);
  }, [appointmentId]);

  const doctor = Doctors.find(
    (item) => item.name === appointment?.primaryPhysician
  );

  return (
    <main className="success-img min-h-screen max-w-5xl px-6 text-center">
      <Link href="/">
        <Image src="/assets/icons/logo-full.svg" alt="CarePlus" width={160} height={48} />
      </Link>
      <section className="flex flex-col items-center gap-6">
        <Image src="/assets/gifs/success.gif" alt="Success" width={280} height={280} />
        <h1 className="header max-w-2xl">
          Your appointment request has been submitted successfully!
        </h1>
        <p className="text-dark-700">We’ll confirm the appointment details shortly.</p>
      </section>
      {appointment && (
        <section className="request-details">
          <p className="text-dark-700">Requested appointment</p>
          <div className="flex items-center gap-3">
            {doctor && (
              <Image src={doctor.image} alt={doctor.name} width={40} height={40} className="rounded-full" />
            )}
            <p>{appointment.primaryPhysician}</p>
          </div>
          <p>{new Date(appointment.schedule).toLocaleString()}</p>
        </section>
      )}
      <Link
        href={`/patients/${userId}/new-appointment`}
        className="rounded-md bg-green-500 px-6 py-3 font-medium text-white"
      >
        New appointment
      </Link>
      <p className="copyright">© 2026 CarePlus. All rights reserved.</p>
    </main>
  );
}
