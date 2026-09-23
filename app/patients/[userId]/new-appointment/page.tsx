"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { AppointmentForm } from "@/components/forms/AppointmentForm";

export default function NewAppointmentPage() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[720px]">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="CarePlus"
              width={160}
              height={48}
              className="mb-12 h-10 w-auto"
            />
          </Link>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={userId}
          />
          <p className="copyright mt-10">© 2026 CarePlus. All rights reserved.</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="Doctor helping a patient"
        width={1000}
        height={1000}
        className="side-img sticky top-0 h-screen w-[390px]"
        priority
      />
    </div>
  );
}
