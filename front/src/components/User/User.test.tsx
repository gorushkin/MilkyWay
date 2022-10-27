import { screen, waitFor } from '@testing-library/react';
import { User } from './User';
import { renderWithAllProviders } from '../../utils/test-utils';
import { Role, actions } from '../../store';
import userEvent from '@testing-library/user-event';

const mockUseNavigate = jest.fn();
const mockUseDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockUseDispatch,
}));

describe('User Component', () => {
  it('Should render component for guest', () => {
    renderWithAllProviders(<User />);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  it('Should render component for logged in user and run logout', async () => {
    renderWithAllProviders(<User />, {
      preloadedState: {
        user: {
          name: '',
          role: Role.User,
          telegramId: null,
        },
      },
    });
    const button = screen.getByText(/logout/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    screen.debug(undefined, Infinity);
    expect(mockUseNavigate).toBeCalledWith('/');
    expect(mockUseDispatch).toBeCalledWith(actions.logout());
    // expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });
});
