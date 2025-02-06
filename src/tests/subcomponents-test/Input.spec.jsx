import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '../test.utils';
import Inputs from '../../sub-components/Inputs';
import { beforeEach, describe } from 'vitest';

describe('# of Repetition input', () => {
    const mockSetReps = vi.fn();

    const providerProps = {
        reps: 2,
        setReps: mockSetReps,
    };

    beforeEach(() => {
        customRender(
            <Inputs
                label="# of Repetition"
                inputType="number"
                id="repetitions"
                minValue="1"
                value={providerProps.reps}
                handleDecrementBtn={() =>
                    providerProps.reps > 1
                        ? providerProps.setReps(providerProps.reps - 1)
                        : null
                }
                handleIncrementBtn={() =>
                    providerProps.setReps(providerProps.reps + 1)
                }
                handleInput={(e) =>
                    providerProps.setReps(Number(e.currentTarget.value))
                }
            />,
            { providerProps }
        );
    });

    it('Increments on button click', () => {
        const incrementButton = screen.getByRole('button', { name: '+' });
        expect(incrementButton).toBeInTheDocument();
        fireEvent.click(incrementButton);
        expect(mockSetReps).toHaveBeenCalledWith(3);
    });

    it('Decrements on button click', () => {
        const decrementButton = screen.getByRole('button', { name: '-' });
        expect(decrementButton).toBeInTheDocument();
        fireEvent.click(decrementButton);
        expect(mockSetReps).toHaveBeenCalledWith(1);
    });

    it('Value changes correctly on typing', () => {
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: 44 } });
        expect(mockSetReps).toHaveBeenCalledWith(44);
    });
});

describe('# of Waves', () => {
    const mockSetWaves = vi.fn();

    const providerProps = {
        repInterval: 45,
        waveInterval: 10,
        waves: 3,
        setWaves: mockSetWaves,
    };

    beforeEach(() => {
        customRender(
            <Inputs
                label="# of Waves"
                inputType="number"
                id="waves"
                value={providerProps.waves}
                minValue="2"
                maxValue={
                    providerProps.repInterval / providerProps.waveInterval - 1
                }
                handleDecrementBtn={() =>
                    providerProps.waves > 2
                        ? providerProps.setWaves(providerProps.waves - 1)
                        : null
                }
                handleIncrementBtn={() =>
                    providerProps.setWaves(providerProps.waves + 1)
                }
                handleInput={(e) =>
                    providerProps.setWaves(Number(e.currentTarget.value))
                }
            />,
            { providerProps }
        );
    });

    it('Increments on button click', () => {
        const incrementButton = screen.getByRole('button', { name: '+' });
        expect(incrementButton).toBeInTheDocument();
        fireEvent.click(incrementButton);
        expect(mockSetWaves).toHaveBeenCalledWith(4);
    });

    it('Decrements on button click', () => {
        const decrementButton = screen.getByRole('button', { name: '-' });
        expect(decrementButton).toBeInTheDocument();
        fireEvent.click(decrementButton);
        expect(mockSetWaves).toHaveBeenCalledWith(2);
    });

    it('Value changes correctly on typing', () => {
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: 44 } });
        expect(mockSetWaves).toHaveBeenCalled(44);
    });
});

describe('Interval between Waves (seconds)', () => {
    const mockSetWaves = vi.fn();

    const providerProps = {
        waveInterval: 10,
        setWaves: mockSetWaves,
    };

    beforeEach(() => {
        customRender(
            <Inputs
                label="Interval between Waves (seconds)"
                fixed={true}
                inputType="tel"
                id="intervalWave"
                defaultValue={providerProps.waveInterval}
                disableTyping={(e) => {
                    e.preventDefault();
                }}
            />,
            { providerProps }
        );
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

    it('Typing is not allowed', () => {
        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, { key: '2', code: 'Key2', charCode: 50 });
        fireEvent.keyDown(input, { key: '0', code: 'Key0', charCode: 48 });
        expect(input.value).toBe('10'); //string because input is type tel, which returns string
    });
});

describe('Countdown Timer (seconds)', () => {
    const mockSetCountdown = vi.fn();

    const providerProps = {
        countdown: 10,
        setCountdown: mockSetCountdown,
    };

    beforeEach(() => {
        customRender(
            <Inputs
                label="Countdown Timer (seconds)"
                inputType="number"
                id="countdown"
                minValue="5"
                value={providerProps.countdown}
                handleDecrementBtn={() =>
                    providerProps.countdown === 5
                        ? null
                        : providerProps.setCountdown(
                              providerProps.countdown - 1
                          )
                }
                handleIncrementBtn={() =>
                    providerProps.setCountdown(providerProps.countdown + 1)
                }
                handleInput={(e) =>
                    providerProps.setCountdown(Number(e.currentTarget.value))
                }
            />,
            { providerProps }
        );
    });

    it('Increments on button click', () => {
        const incrementButton = screen.getByRole('button', { name: '+' });
        expect(incrementButton).toBeInTheDocument();
        fireEvent.click(incrementButton);
        expect(mockSetCountdown).toHaveBeenCalledWith(11);
    });

    it('Decrements on button click', () => {
        const decrementButton = screen.getByRole('button', { name: '-' });
        expect(decrementButton).toBeInTheDocument();
        fireEvent.click(decrementButton);
        expect(mockSetCountdown).toHaveBeenCalledWith(9);
    });

    it('Value changes correctly on typing', () => {
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: 44 } });
        expect(mockSetCountdown).toHaveBeenCalled(44);
    });
});
