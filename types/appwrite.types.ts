export type Status = "pending" | "scheduled" | "cancelled";

export type User = {
  $id: string;
  name: string;
  email: string;
  phone: string;
};

export type Patient = User & {
  userId: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
};

export type Appointment = {
  $id: string;
  userId: string;
  patient: Patient;
  primaryPhysician: string;
  schedule: string;
  reason: string;
  status: Status;
  note?: string;
  cancellationReason?: string;
};
