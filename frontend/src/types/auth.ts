export type UserRole = 'SQUADRON_UTM' | 'WING_UTM';

export interface AdminUser {
  adminId: number;
  email: string;
  fullName: string;
  role: UserRole;
  defaultSquadron: string;
}

export interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  form: LoginFormState;
  error: string | null;
}
