import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '../test.utils';
import TimeInput from '../../sub-components/TimeInput';
import { beforeEach, describe } from 'vitest';

describe('# of Repetition input', () => {
    const mockSetRepInterval = vi.fn();
    const mockSetDisplayInterval = vi.fn();

    const providerProps = {
        reps: 2,
        setRepInterval: mockSetRepInterval,
        displayInterval: '00:00',
        setDisplayInterval: mockSetDisplayInterval,
    };

    beforeEach(() => {
        customRender(<TimeInput setRepInterval={mockSetRepInterval} />, {
            providerProps,
        });
    });

    it('Increment button does not exist', () => {
        expect(
            screen.queryByRole('button', { name: '+' })
        ).not.toBeInTheDocument();
    });

    it('Decrement button does not exist', () => {
        expect(
            screen.queryByRole('button', { name: '+' })
        ).not.toBeInTheDocument();
    });

    it('Value changes correctly on typing', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 45 } });
        expect(mockSetRepInterval).toHaveBeenCalledWith(45);
        expect(mockSetDisplayInterval).toHaveBeenCalledWith('00:45');

        fireEvent.change(input, { target: { value: 230 } });
        expect(mockSetRepInterval).toHaveBeenCalledWith(150);
        expect(mockSetDisplayInterval).toHaveBeenCalledWith('02:30');

        fireEvent.change(input, { target: { value: 145 } });
        expect(mockSetRepInterval).toHaveBeenCalledWith(105);
        expect(mockSetDisplayInterval).toHaveBeenCalledWith('01:45');
    });
});
