import { screen } from '@testing-library/react';
import { Navigation } from './Navigation';
import { renderWithBrowserRouter } from '../../utils/test-utils';
import { Role } from '../../store';
import { flatRoutes } from '../../routes';

const roles = [
  ['Admin', Role.Admin],
  ['Guest', Role.Guest],
  ['User', Role.User],
];

describe('Navigation Component', () => {
  it.each(roles)('Should render navigation for %s', (_, role) => {
    renderWithBrowserRouter(<Navigation />, {
      preloadedState: {
        user: {
          name: 'user',
          role: role as Role,
          telegramId: null,
        },
      },
    });
    flatRoutes
      .filter((route) => route.header[role as Role])
      .forEach((route) => {
        expect(screen.getByRole('link', { name: route.name })).toBeInTheDocument();
      });
  });
});
