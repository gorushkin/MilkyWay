import { configureStore, createSlice, combineReducers, PreloadedState } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export enum Role {
  Guest = 'guest',
  Admin = 'admin',
  User = 'user',
}

export interface UserState {
  name: string;
  role: Role;
  telegramId: number | null;
}

const initialState: UserState = {
  name: 'user',
  role: Role.Admin,
  telegramId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.role = Role.Admin;
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

const rootReducer = combineReducers({
  user,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
