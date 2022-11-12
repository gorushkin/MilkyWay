import { PageLayout } from './PageLayout';
import { renderWithStore } from '../../utils/test-utils';
import { Role } from '../../store';
import { screen } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  useLocation: () => 'path',
  Navigate: () => <div>redirect</div>,
}));

describe('PageLayout Component', () => {
  it('Should render private component', () => {
    renderWithStore(
      <PageLayout level={Role.Guest}>
        <div>test</div>
      </PageLayout>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('Should render redirect', () => {
    renderWithStore(
      <PageLayout level={Role.Admin}>
        <div>test</div>
      </PageLayout>
    );
    expect(screen.getByText('redirect')).toBeInTheDocument();
  });
});
