import {act, render, screen} from '@test-utils';
import userEvent from '@testing-library/user-event';

import {TextAreaConnected} from '../TextArea';

describe('Textarea', () => {
    it('renders a textarea', () => {
        render(<TextAreaConnected id="🆔" />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('sets the specified value in the textarea', () => {
        render(<TextAreaConnected id="🆔" valueOnMount="the expected value" />);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveValue('the expected value');
    });

    it('calls the onChangeCallback when the user changes the textarea value', () => {
        const onChangeSpy = jest.fn();
        render(<TextAreaConnected id="🆔" onChangeCallback={onChangeSpy} />);
        const textarea = screen.getByRole('textbox');
        userEvent.type(textarea, 'abc');
        expect(onChangeSpy).toHaveBeenCalledTimes(3);
    });

    it('shows the validation message when the value is not valid', async () => {
        jest.useFakeTimers();
        const notEmptyValidator = (v: string) => !!v;
        const validationMessage = 'cannot be empty';
        render(<TextAreaConnected id="🆔" validate={notEmptyValidator} validationMessage={validationMessage} />);
        const textarea = screen.getByRole('textbox');
        expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();
        userEvent.type(textarea, 'abc');
        act(() => {
            jest.advanceTimersByTime(400);
        });
        expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();
        userEvent.clear(textarea);
        act(() => {
            jest.advanceTimersByTime(400);
        });
        expect(await screen.findByText(validationMessage)).toBeInTheDocument();
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('renders the textarea content as text when disabled', () => {
        render(<TextAreaConnected id="🆔" value="abc" disabled />);
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByText('abc')).toBeInTheDocument();
    });
});
