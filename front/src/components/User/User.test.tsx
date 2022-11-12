import { screen } from '@testing-library/react';
import { User } from './User';
import { renderWithBrowserRouter } from '../../utils/test-utils';
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
    renderWithBrowserRouter(<User />);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  it('Should render component for logged in user and run logout', async () => {
    renderWithBrowserRouter(<User />, {
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
    expect(mockUseNavigate).toBeCalledWith('/');
    expect(mockUseDispatch).toBeCalledWith(actions.logout());
  });
});
