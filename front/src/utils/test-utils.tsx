import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// As a basic setup, import your same slice reducers
import { userSlice, AppStore, RootState, Role } from '../store/index';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const providerMapping = (store: AppStore, children: React.ReactNode) => ({
  store: <Provider store={store}>{children}</Provider>,
  browserRouter: (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  ),
  routes: (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={children} />
        </Routes>
      </BrowserRouter>
    </Provider>
  ),
});

type TYPES = 'store' | 'browserRouter' | 'routes';

const common =
  (type: TYPES) =>
  (
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
  ) => {
    const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element =>
      providerMapping(store, children)[type];

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
  };

export const renderWithRoutes = common('routes');
export const renderWithBrowserRouter = common('browserRouter');
export const renderWithStore = common('store');
