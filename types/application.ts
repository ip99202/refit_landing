export interface Application {
  name: string;
  birth_date: string;
  phone: string;
  gender: "남" | "여";
}

export interface ApplicationForm {
  name: string;
  birthDate: string;
  phone: string;
  gender: string;
}
