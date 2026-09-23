"use client";

import { LockKeyhole, ShieldCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_PASSKEY = process.env.NEXT_PUBLIC_ADMIN_PASSKEY ?? "123456";

export function PasskeyModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const continueToAdmin = () => {
    if (passkey !== ADMIN_PASSKEY) {
      setError("That admin passkey is incorrect.");
      return;
    }

    window.sessionStorage.setItem("careplus.admin", "authenticated");
    setOpen(false);
    router.push("/admin");
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="border-green-500/40 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500"
      >
        <ShieldCheck className="size-4" />
        Admin portal
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-access-title"
            className="w-full max-w-md rounded-2xl border border-dark-500 bg-dark-300 p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-green-500/15 text-green-500">
                  <LockKeyhole className="size-5" />
                </span>
                <div>
                  <h2 id="admin-access-title" className="text-lg font-semibold text-white">
                    Admin access
                  </h2>
                  <p className="mt-1 text-sm text-dark-700">
                    Enter the clinic administrator passkey.
                  </p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close admin access">
                <X className="size-4" />
              </Button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                continueToAdmin();
              }}
            >
              <div className="space-y-2">
                <label htmlFor="admin-passkey" className="text-sm font-medium text-dark-700">
                  Passkey
                </label>
                <Input
                  id="admin-passkey"
                  type="password"
                  inputMode="numeric"
                  autoComplete="current-password"
                  value={passkey}
                  onChange={(event) => {
                    setPasskey(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter passkey"
                  className="h-11 border-dark-500 bg-dark-400 text-white"
                  autoFocus
                />
                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
              </div>
              {!process.env.NEXT_PUBLIC_ADMIN_PASSKEY && (
                <p className="rounded-lg bg-blue-600 px-3 py-2 text-xs text-blue-500">
                  Local demo passkey: 123456. Set NEXT_PUBLIC_ADMIN_PASSKEY before deployment.
                </p>
              )}
              <Button type="submit" className="shad-primary-btn h-11 w-full">
                Continue to dashboard
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
