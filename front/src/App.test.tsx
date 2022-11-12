import { screen } from '@testing-library/react';
import App from './App';
import { renderWithStore } from './utils/test-utils';

describe('App Component', () => {
  it('Should renders home page', () => {
    renderWithStore(<App />);
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });
});
