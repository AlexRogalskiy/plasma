import {render, screen} from '@test-utils';
import userEvent from '@testing-library/user-event';

import {BrowserPreview} from '../BrowserPreview';

describe('BrowserPreview', () => {
    it('renders the specified header description as tooltip title', async () => {
        const headerDescription = '🥰';
        render(<BrowserPreview headerDescription={headerDescription} />);
        userEvent.hover(
            screen.getByRole('img', {
                name: /info icon/i,
            })
        );

        expect(await screen.findByText(headerDescription)).toBeVisible();
    });

    it('renders the specific title when provided', () => {
        const headerTitle = 'La CacouSoudane';
        render(<BrowserPreview title={headerTitle} />);

        expect(screen.getByText(/la cacousoudane/i)).toBeInTheDocument();
    });

    it('renders the specific title truncated when provided, but too long', () => {
        const headerTitle = 'La CacouSoudane FAFOU LOUDANE';
        render(<BrowserPreview title={headerTitle} />);

        expect(screen.getByText(/la cacousoudane fafo\.\.\./i)).toBeInTheDocument();
    });
});
