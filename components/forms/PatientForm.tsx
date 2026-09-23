"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        preferredLanguage: language,
      };

      const newUser = await createUser(user);

      if (newUser) {
        const query = new URLSearchParams({
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          language,
        });
        router.push(`/patients/${newUser.$id}/register?${query.toString()}`);
      }
    } catch {
      setSubmitError(t("submissionError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="header">{t("greeting")}</h1>
            <LanguageSwitcher />
          </div>
          <p className="text-dark-700">{t("intro")}</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={t("fullName")}
          placeholder="John Woods"
          autoComplete="name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label={t("email")}
          placeholder="johnwoods@gmail.com"
          autoComplete="email"
          inputMode="email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label={t("phone")}
          placeholder="+442071838750"
          description={t("phoneHint")}
          autoComplete="tel"
        />

        {submitError && (
          <p role="alert" className="text-sm text-red-400">
            {submitError}
          </p>
        )}

        <SubmitButton isLoading={isLoading}>{t("getStarted")}</SubmitButton>
      </form>
    </Form>
  );
};
