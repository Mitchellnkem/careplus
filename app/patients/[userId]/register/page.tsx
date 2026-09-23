"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  const { userId } = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const user = {
    $id: userId,
    name: searchParams.get("name") ?? "",
    email: searchParams.get("email") ?? "",
    phone: searchParams.get("phone") ?? "",
    preferredLanguage: searchParams.get("language") ?? undefined,
  };

  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px]">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="CarePlus"
              width={160}
              height={48}
              className="mb-12 h-10 w-auto"
            />
          </Link>
          <RegisterForm user={user} />
          <p className="copyright mt-10">© 2026 CarePlus. All rights reserved.</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="Healthcare professional"
        width={1000}
        height={1000}
        className="side-img sticky top-0 h-screen w-[390px]"
        priority
      />
    </div>
  );
}
