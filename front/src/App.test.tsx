import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './utils/test-utils';

describe('App Component', () => {
  it('Should renders home page', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });
});
