import Image from "next/image"

import { PatientForm } from "@/components/forms/PatientForm"
import { PasskeyModal } from "@/components/PasskeyModal"

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient logo"
            width={1000}
            height={1000}
            className="mb-12 h-12 w-fit"
          />

          <PatientForm />
          <div className="text-15-italic text-dark-600 mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600">
              © 2026 CarePlus. All rights reserved.
            </p>
            <PasskeyModal />
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="CarePlus patient onboarding"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
        priority
      />
    </div>
  )
}
