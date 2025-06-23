export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Document {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  type: 'gratis' | 'pago';
  prompt: string;
  form: FormField[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface FormField {
  type: 'text' | 'area' | 'select' | 'radio' | 'check' | 'date' | 'number' | 'email';
  label: string;
  name: string;
  required: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}