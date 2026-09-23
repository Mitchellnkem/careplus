"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const languages = {
  en: "English",
  es: "Español",
  fr: "Français",
  ar: "العربية",
} as const;

export type LanguageCode = keyof typeof languages;

const messages = {
  en: {
    language: "Language",
    greeting: "Hi there 👋",
    intro: "Get started with appointments.",
    fullName: "Full name",
    email: "Email address",
    phone: "International phone number",
    phoneHint: "Use international format, including country code (for example +442071838750).",
    getStarted: "Get Started",
    welcome: "Welcome 👋",
    registerIntro: "Let us know more about yourself.",
    personalInformation: "Personal Information",
    dateOfBirth: "Date of birth",
    gender: "Gender",
    address: "Address",
    occupation: "Occupation",
    emergencyName: "Emergency contact name",
    emergencyPhone: "Emergency contact number",
    medicalInformation: "Medical Information",
    physician: "Primary care physician",
    selectPhysician: "Select a physician",
    insuranceProvider: "Insurance provider",
    insurancePolicy: "Insurance policy number",
    allergies: "Allergies (if any)",
    medications: "Current medications",
    familyHistory: "Family medical history (if relevant)",
    medicalHistory: "Past medical history",
    identification: "Identification and Verification",
    identificationType: "Identification type",
    selectIdentification: "Select identification type",
    identificationNumber: "Identification number",
    identificationDocument: "Scanned copy of identification document",
    consent: "Consent and Privacy",
    treatmentConsent: "I consent to receive treatment for my health condition.",
    disclosureConsent: "I consent to the use and disclosure of my health information for treatment purposes.",
    privacyConsent: "I acknowledge that I have reviewed and agree to the privacy policy.",
    submit: "Submit and Continue",
    submissionError: "We could not save your information. Please try again.",
  },
  es: {
    language: "Idioma",
    greeting: "Hola 👋",
    intro: "Comienza a gestionar tus citas.",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono internacional",
    phoneHint: "Usa el formato internacional con el código de país (por ejemplo, +34911234567).",
    getStarted: "Comenzar",
    welcome: "Bienvenido 👋",
    registerIntro: "Cuéntanos más sobre ti.",
    personalInformation: "Información personal",
    dateOfBirth: "Fecha de nacimiento",
    gender: "Género",
    address: "Dirección",
    occupation: "Ocupación",
    emergencyName: "Nombre del contacto de emergencia",
    emergencyPhone: "Teléfono del contacto de emergencia",
    medicalInformation: "Información médica",
    physician: "Médico de atención primaria",
    selectPhysician: "Selecciona un médico",
    insuranceProvider: "Proveedor de seguros",
    insurancePolicy: "Número de póliza",
    allergies: "Alergias (si corresponde)",
    medications: "Medicamentos actuales",
    familyHistory: "Antecedentes médicos familiares",
    medicalHistory: "Antecedentes médicos personales",
    identification: "Identificación y verificación",
    identificationType: "Tipo de identificación",
    selectIdentification: "Selecciona un tipo de identificación",
    identificationNumber: "Número de identificación",
    identificationDocument: "Copia escaneada del documento de identidad",
    consent: "Consentimiento y privacidad",
    treatmentConsent: "Doy mi consentimiento para recibir tratamiento médico.",
    disclosureConsent: "Autorizo el uso y la divulgación de mi información médica para fines de tratamiento.",
    privacyConsent: "Confirmo que he revisado y acepto la política de privacidad.",
    submit: "Enviar y continuar",
    submissionError: "No pudimos guardar tu información. Inténtalo de nuevo.",
  },
  fr: {
    language: "Langue",
    greeting: "Bonjour 👋",
    intro: "Commencez à gérer vos rendez-vous.",
    fullName: "Nom complet",
    email: "Adresse e-mail",
    phone: "Numéro international",
    phoneHint: "Utilisez le format international avec l’indicatif du pays (par exemple +33142345678).",
    getStarted: "Commencer",
    welcome: "Bienvenue 👋",
    registerIntro: "Parlez-nous un peu plus de vous.",
    personalInformation: "Informations personnelles",
    dateOfBirth: "Date de naissance",
    gender: "Genre",
    address: "Adresse",
    occupation: "Profession",
    emergencyName: "Nom du contact d’urgence",
    emergencyPhone: "Numéro du contact d’urgence",
    medicalInformation: "Informations médicales",
    physician: "Médecin traitant",
    selectPhysician: "Sélectionnez un médecin",
    insuranceProvider: "Assureur",
    insurancePolicy: "Numéro de police d’assurance",
    allergies: "Allergies (le cas échéant)",
    medications: "Médicaments actuels",
    familyHistory: "Antécédents médicaux familiaux",
    medicalHistory: "Antécédents médicaux personnels",
    identification: "Identification et vérification",
    identificationType: "Type de pièce d’identité",
    selectIdentification: "Sélectionnez un type de pièce d’identité",
    identificationNumber: "Numéro d’identification",
    identificationDocument: "Copie numérisée de la pièce d’identité",
    consent: "Consentement et confidentialité",
    treatmentConsent: "Je consens à recevoir un traitement pour mon état de santé.",
    disclosureConsent: "J’autorise l’utilisation et la divulgation de mes informations médicales aux fins du traitement.",
    privacyConsent: "Je confirme avoir lu et accepté la politique de confidentialité.",
    submit: "Envoyer et continuer",
    submissionError: "Impossible d’enregistrer vos informations. Réessayez.",
  },
  ar: {
    language: "اللغة",
    greeting: "مرحبًا 👋",
    intro: "ابدأ في إدارة مواعيدك.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف الدولي",
    phoneHint: "استخدم الصيغة الدولية مع رمز الدولة (مثال: +971501234567).",
    getStarted: "ابدأ الآن",
    welcome: "مرحبًا بك 👋",
    registerIntro: "أخبرنا المزيد عن نفسك.",
    personalInformation: "المعلومات الشخصية",
    dateOfBirth: "تاريخ الميلاد",
    gender: "الجنس",
    address: "العنوان",
    occupation: "المهنة",
    emergencyName: "اسم جهة اتصال الطوارئ",
    emergencyPhone: "رقم جهة اتصال الطوارئ",
    medicalInformation: "المعلومات الطبية",
    physician: "طبيب الرعاية الأولية",
    selectPhysician: "اختر طبيبًا",
    insuranceProvider: "شركة التأمين",
    insurancePolicy: "رقم بوليصة التأمين",
    allergies: "الحساسية (إن وجدت)",
    medications: "الأدوية الحالية",
    familyHistory: "التاريخ الطبي للعائلة",
    medicalHistory: "التاريخ الطبي السابق",
    identification: "الهوية والتحقق",
    identificationType: "نوع الهوية",
    selectIdentification: "اختر نوع الهوية",
    identificationNumber: "رقم الهوية",
    identificationDocument: "نسخة ممسوحة من وثيقة الهوية",
    consent: "الموافقة والخصوصية",
    treatmentConsent: "أوافق على تلقي العلاج لحالتي الصحية.",
    disclosureConsent: "أوافق على استخدام معلوماتي الصحية والإفصاح عنها لأغراض العلاج.",
    privacyConsent: "أقر بأنني راجعت سياسة الخصوصية وأوافق عليها.",
    submit: "إرسال ومتابعة",
    submissionError: "تعذر حفظ معلوماتك. حاول مرة أخرى.",
  },
} as const;

type MessageKey = keyof (typeof messages)["en"];

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: MessageKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLanguageCode = (value: string | null): value is LanguageCode =>
  Boolean(value && value in languages);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("careplus.language");
    const browserLanguage = window.navigator.language.split("-")[0];
    const initialLanguage = isLanguageCode(storedLanguage)
      ? storedLanguage
      : isLanguageCode(browserLanguage)
        ? browserLanguage
        : "en";
    setLanguageState(initialLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        window.localStorage.setItem("careplus.language", nextLanguage);
        setLanguageState(nextLanguage);
      },
      t: (key) => messages[language][key],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
