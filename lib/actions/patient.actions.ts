import type { Patient, User } from "@/types/appwrite.types";

const USERS_KEY = "careplus.users";
const PATIENTS_KEY = "careplus.patients";

const readCollection = <T>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as T[];
  } catch {
    return [];
  }
};

const writeCollection = <T>(key: string, records: T[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(records));
  }
};

export const createUser = async (input: Omit<User, "$id">): Promise<User> => {
  const users = readCollection<User>(USERS_KEY);
  const existing = users.find(
    (user) => user.email.toLowerCase() === input.email.toLowerCase()
  );
  if (existing) return existing;
  const user: User = { $id: crypto.randomUUID(), ...input };
  writeCollection(USERS_KEY, [...users, user]);
  return user;
};

export const getUser = async (userId: string): Promise<User | null> =>
  readCollection<User>(USERS_KEY).find((user) => user.$id === userId) ?? null;

type RegisterPatientInput = Omit<Patient, "$id" | "birthDate"> & {
  birthDate: Date;
  identificationDocument?: FormData;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
};

export const registerPatient = async (
  input: RegisterPatientInput
): Promise<Patient> => {
  const patients = readCollection<Patient>(PATIENTS_KEY);
  const { identificationDocument: _document, ...serializableInput } = input;
  void _document;
  const patient: Patient = {
    $id: input.userId,
    ...serializableInput,
    birthDate: input.birthDate.toISOString(),
  };
  writeCollection(PATIENTS_KEY, [
    ...patients.filter((item) => item.userId !== input.userId),
    patient,
  ]);
  return patient;
};

export const getPatient = async (userId: string): Promise<Patient | null> =>
  readCollection<Patient>(PATIENTS_KEY).find(
    (patient) => patient.userId === userId
  ) ?? null;
