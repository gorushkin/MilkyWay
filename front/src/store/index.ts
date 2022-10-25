import { configureStore, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export enum Role {
  Guest = 'guest',
  Admin = 'admin',
  User = 'user',
}

export interface UserState {
  name: string;
  role: Role;
}

const initialState: UserState = {
  name: 'user',
  role: Role.Guest,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.role = Role.User;
    },
    logout: (state) => {
      state.role = Role.Guest;
    },
  },
});

export const actions = userSlice.actions;

const user = userSlice.reducer;

export const store = configureStore({
  reducer: { user },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
