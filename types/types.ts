export type SearchHomeForm = {
  service: string;
  city: string;
};

export interface Service {
  id: string;
  name: string;
  category: string;
  city: string;
  phone: string;
  email: string;
  photoURL: string;
  website: string;
  about: string;
  price: string;
  authorId: string;
  author: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  company: String;
}

export interface ServiceFilter {
  category: string;
  city: string;
}

export type SelectOption = {
  value: string;
  label: string;
};

export interface ServiceSelectOptions {
  city: SelectOption;
  service: SelectOption;
}

export interface UserAuth {
  email: string;
  password: string;
  confirmPassword?: string;
}
