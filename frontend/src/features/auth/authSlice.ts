import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUser, AuthState } from '@/types/auth';

export const DEMO_ADMINS: (AdminUser & { password: string })[] = [
  {
    adminId: 1,
    email: 'elena.reyes@test.com',
    password: 'Password123!',
    fullName: 'TSgt Elena Reyes',
    role: 'SQUADRON_UTM',
    defaultSquadron: '35 MXS',
  },
  {
    adminId: 2,
    email: 'nathan.drake@test.com',
    password: 'Password123!',
    fullName: 'TSgt Nathan Drake',
    role: 'SQUADRON_UTM',
    defaultSquadron: '35 AMXS',
  },
  {
    adminId: 3,
    email: 'samantha.hayes@test.com',
    password: 'Password123!',
    fullName: 'TSgt Samantha Hayes',
    role: 'WING_UTM',
    defaultSquadron: '35 MXS',
  },
];

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  form: {
    email: '',
    password: '',
    showPassword: false,
    rememberMe: true,
  },
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFormEmail: (state, action: PayloadAction<string>) => {
      state.form.email = action.payload;
      state.error = null;
    },
    setFormPassword: (state, action: PayloadAction<string>) => {
      state.form.password = action.payload;
      state.error = null;
    },
    toggleShowPassword: (state) => {
      state.form.showPassword = !state.form.showPassword;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.form.rememberMe = action.payload;
    },
    selectDemoAdmin: (state, action: PayloadAction<(typeof DEMO_ADMINS)[0]>) => {
      state.form.email = action.payload.email;
      state.form.password = action.payload.password;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AdminUser>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.error = null;
      if (!state.form.rememberMe) {
        state.form.email = '';
      }
      state.form.password = '';
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
      state.form.password = '';
    },
  },
});

export const {
  setFormEmail,
  setFormPassword,
  toggleShowPassword,
  setRememberMe,
  selectDemoAdmin,
  loginSuccess,
  loginFailure,
  clearAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
