import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// As a basic setup, import your same slice reducers
import { userSlice, AppStore, RootState, Role } from '../store/index';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      user: {
        name: 'user',
        role: Role.Guest,
        telegramId: null,
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { user: userSlice.reducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
  full: boolean = false
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return full ? (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    ) : (
      <Provider store={store}>{children}</Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const renderWithAllProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {
      user: {
        name: 'user',
        role: Role.Guest,
        telegramId: null,
      },
    },
    store = configureStore({ reducer: { user: userSlice.reducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => renderWithProviders(ui, { preloadedState, store, ...renderOptions }, true);
