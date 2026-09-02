import { configureStore, combineReducers } from '@reduxjs/toolkit';
import apiReducer from '../features/api/apiSlice';
import utmReducer from '../features/dashboard/state/utmSlice';

export const rootReducer = combineReducers({
  api: apiReducer,
  utm: utmReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
