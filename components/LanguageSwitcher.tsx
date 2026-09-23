"use client";

import { Globe2 } from "lucide-react";

import {
  languages,
  type LanguageCode,
  useLanguage,
} from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="flex items-center gap-2 text-sm text-dark-700">
      <Globe2 className="size-4 text-green-500" aria-hidden="true" />
      <span className="sr-only">{t("language")}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as LanguageCode)}
        aria-label={t("language")}
        className="h-10 rounded-md border border-dark-500 bg-dark-400 px-3 text-sm text-white outline-none focus:border-green-500"
      >
        {Object.entries(languages).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
