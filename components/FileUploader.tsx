"use client";

import Image from "next/image";
import { useRef } from "react";

type FileUploaderProps = {
  files?: File[];
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files = [], onChange }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="file-upload"
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="sr-only"
        onChange={(event) => onChange(Array.from(event.target.files ?? []))}
      />
      <Image src="/assets/icons/upload.svg" width={40} height={40} alt="Upload" />
      <div className="file-upload_label">
        <p className="text-green-500">
          {files[0]?.name ?? "Click to upload identification"}
        </p>
        <p>SVG, PNG, JPG or PDF (max. 10 MB)</p>
      </div>
    </div>
  );
};
