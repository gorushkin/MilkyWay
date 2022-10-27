import { PageLayout } from './PageLayout';
import { renderWithRoutes } from '../../utils/test-utils';
import { Role } from '../../store';

describe('PageLayout Component', () => {
  it('Should render component', () => {
    renderWithRoutes(<PageLayout children={<div/>} level={Role.Admin} />);
  });
});
