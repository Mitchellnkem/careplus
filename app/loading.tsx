import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-300">
      <Image
        src="/assets/icons/loader.svg"
        alt="Loading CarePlus"
        width={40}
        height={40}
        className="animate-spin"
      />
    </div>
  );
}
