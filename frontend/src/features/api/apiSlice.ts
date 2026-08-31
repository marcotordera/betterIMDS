import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ApiResponse {
  status: string;
  message: string;
  system: string;
  timestamp: string;
}

interface ApiState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchHelloApi = createAsyncThunk<ApiResponse>(
  'api/fetchHello',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ApiResponse>('http://localhost:8080/api/hello');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        'Could not connect to Spring Boot API on http://localhost:8080. Ensure backend is running!'
      );
    }
  }
);

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHelloApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHelloApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHelloApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default apiSlice.reducer;
