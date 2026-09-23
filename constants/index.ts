export const GenderOptions = ["Male", "Female", "Other"] as const;

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
] as const;

export const Doctors = [
  { name: "Cameron Williamson", image: "/assets/images/dr-cameron.png" },
  { name: "Cruz Martínez", image: "/assets/images/dr-cruz.png" },
  { name: "Robert Green", image: "/assets/images/dr-green.png" },
  { name: "Lee Hammond", image: "/assets/images/dr-lee.png" },
  { name: "Livingston James", image: "/assets/images/dr-livingston.png" },
  { name: "Peter Zhang", image: "/assets/images/dr-peter.png" },
  { name: "Powell Parker", image: "/assets/images/dr-powell.png" },
  { name: "Remirez Ross", image: "/assets/images/dr-remirez.png" },
  { name: "Sharma Rishi", image: "/assets/images/dr-sharma.png" },
] as const;

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(),
  gender: "Male" as const,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "",
  identificationNumber: "",
  identificationDocument: [] as File[],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};
