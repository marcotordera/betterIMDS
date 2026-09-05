import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dashboardReducer from '@/features/dashboard/dashboardSlice';
import authReducer from '@/features/auth/authSlice';

export const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
