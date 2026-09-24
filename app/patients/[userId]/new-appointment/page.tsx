"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Button } from "@/components/ui/button";

export default function NewAppointmentPage() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[720px]">
          <div className="mb-12 flex items-center justify-between gap-4">
            <Link href="/" aria-label="CarePlus home">
              <Image
                src="/assets/icons/logo-full.svg"
                alt="CarePlus"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <Button
              asChild
              type="button"
              variant="outline"
              className="border-dark-500 bg-dark-400 text-dark-700 hover:bg-dark-500 hover:text-white"
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back to home
              </Link>
            </Button>
          </div>
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
