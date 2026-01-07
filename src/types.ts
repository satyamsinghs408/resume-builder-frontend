export interface Experience {
  title: string;
  company: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface Resume {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  experience: Experience[];
  education: Education[];
  createdAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

