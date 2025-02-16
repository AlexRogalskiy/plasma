import {render, screen} from '@test-utils';
import userEvent from '@testing-library/user-event';
import {FunctionComponent} from 'react';
import {useDispatch} from 'react-redux';

import {IDispatch} from '../../../utils';
import {IWithDirtyProps, withDirty} from '../withDirty';
import {WithDirtyActions} from '../withDirtyActions';

describe('withDirty', () => {
    const Fixture: FunctionComponent<IWithDirtyProps> = () => {
        const dispatch: IDispatch = useDispatch();
        return <input onChange={(e) => dispatch(WithDirtyActions.toggle('🆔', e.target.value === 'dirty'))} />;
    };

    it('renders the component as not dirty on mount', () => {
        const ComponentWithDirty = withDirty({id: '🆔', showDirty: (isDirty) => (isDirty ? 'dirty' : 'clean')})(
            Fixture
        );

        render(<ComponentWithDirty />);

        expect(screen.getByText('clean')).toBeInTheDocument();
        expect(screen.queryByText('dirty')).not.toBeInTheDocument();
    });

    it('renders the component as dirty if it is identified as such', () => {
        const ComponentWithDirty = withDirty({id: '🆔', showDirty: (isDirty) => (isDirty ? 'dirty' : 'clean')})(
            Fixture
        );

        render(<ComponentWithDirty />);
        userEvent.type(screen.getByRole('textbox'), 'dirty');

        expect(screen.queryByText('clean')).not.toBeInTheDocument();
        expect(screen.getByText('dirty')).toBeInTheDocument();
    });

    it('always renders the component as not dirty if isDirty is set to false in the config', () => {
        const ComponentWithDirty = withDirty({
            id: '🆔',
            showDirty: (isDirty) => (isDirty ? 'dirty' : 'clean'),
            isDirty: false,
        })(Fixture);

        render(<ComponentWithDirty />);

        expect(screen.getByText('clean')).toBeInTheDocument();
        expect(screen.queryByText('dirty')).not.toBeInTheDocument();
        userEvent.type(screen.getByRole('textbox'), 'dirty');
        expect(screen.getByText('clean')).toBeInTheDocument();
        expect(screen.queryByText('dirty')).not.toBeInTheDocument();
    });

    it('always renders the component not dirty if isDirty is set to true in the config', () => {
        const ComponentWithDirty = withDirty({
            id: '🆔',
            showDirty: (isDirty) => (isDirty ? 'dirty' : 'clean'),
            isDirty: true,
        })(Fixture);

        render(<ComponentWithDirty />);
        expect(screen.queryByText('clean')).not.toBeInTheDocument();
        expect(screen.getByText('dirty')).toBeInTheDocument();
        userEvent.type(screen.getByRole('textbox'), 'clean');
        expect(screen.queryByText('clean')).not.toBeInTheDocument();
        expect(screen.getByText('dirty')).toBeInTheDocument();
    });
});
