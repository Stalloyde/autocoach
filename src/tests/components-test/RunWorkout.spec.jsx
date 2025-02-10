import { React, act } from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import RunWorkout from '../../components/Workout/RunWorkout';
import { customRender } from '../test.utils';
import {
    playGo,
    playTYM,
    playFiveSeconds,
    playWorkoutCompleted,
} from '../../helpers/playAudio';

vi.mock('../../helpers/playAudio', () => ({
    playGo: vi.fn(),
    playTYM: vi.fn(),
    playFiveSeconds: vi.fn(),
    playWorkoutCompleted: vi.fn(),
}));

const mockedUsedNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

describe('RunWorkout Component', () => {
    vi.useFakeTimers();
    const mockSetCountdown = vi.fn();
    let providerProps = {};

    beforeEach(() => {
        providerProps = {
            reps: 2,
            repInterval: 60,
            waves: 3,
            waveInterval: 10,
            displayInterval: '01:00',
            setCountdown: mockSetCountdown,
        };

        vi.clearAllMocks();
    });

    it('renders correctly with initial values', () => {
        customRender(<RunWorkout />, { providerProps });

        expect(screen.getByText('Rep 1/2 - Wave 1/3')).toBeInTheDocument();
        expect(screen.getByText('00:00')).toBeInTheDocument();
        expect(screen.getByText('Workout Details')).toBeInTheDocument();
        expect(screen.getByText('Number of Repetitions:')).toBeInTheDocument();
        expect(screen.getByText(2)).toBeInTheDocument();
        expect(
            screen.getByText('Interval per Repetition:')
        ).toBeInTheDocument();
        expect(screen.getByText('01:00')).toBeInTheDocument();
        expect(screen.getByText('Number of Waves:')).toBeInTheDocument();
        expect(screen.getByText(3)).toBeInTheDocument();
        expect(screen.getByText('Interval between Waves:')).toBeInTheDocument();
        expect(screen.getByText(10)).toBeInTheDocument();
    });

    it('Timer on screen displays correct currentRepInterval', async () => {
        customRender(<RunWorkout />, { providerProps });

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('00:01')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('00:02')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('00:03')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(10000);
        });
        expect(screen.getByText('00:13')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(25000);
        });
        expect(screen.getByText('00:38')).toBeInTheDocument();
    });

    it('Wave increments to 2/3 ', async () => {
        customRender(<RunWorkout />, { providerProps });

        await act(async () => {
            vi.advanceTimersByTime(4000);
        });

        expect(playFiveSeconds).toHaveBeenCalled();
        expect(screen.getByText('Rep 1/2 - Wave 1/3')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(3000); // cumulative 7s
        });

        expect(playTYM).toHaveBeenCalled();
        expect(screen.getByText('Rep 1/2 - Wave 1/3')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(2000); //cumulative 9s
        });

        expect(playGo).toHaveBeenCalled();
        expect(screen.getByText('Rep 1/2 - Wave 2/3')).toBeInTheDocument();
    });

    it('Wave increments to 3/3', async () => {
        customRender(<RunWorkout />, { providerProps });

        await act(async () => {
            vi.advanceTimersByTime(9000); //advance to 2nd wave, prepping for 3rd wave
        });
        expect(screen.getByText('Rep 1/2 - Wave 2/3')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(5000); // cumulative 14s
        });

        expect(playFiveSeconds).toHaveBeenCalled();
        expect(screen.getByText('Rep 1/2 - Wave 2/3')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(3000); // cumulative 17s
        });

        expect(playTYM).toHaveBeenCalled();
        expect(screen.getByText('Rep 1/2 - Wave 2/3')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(2000); //cumulative 19s
        });

        expect(playGo).toHaveBeenCalled();
        expect(screen.getByText('Rep 1/2 - Wave 3/3')).toBeInTheDocument();
    });

    it('currentRep increments & currentRepInterval resets after finalWave', async () => {
        customRender(<RunWorkout />, { providerProps });

        await act(async () => {
            vi.advanceTimersByTime(9000); //advance to 2nd wave
        });

        await act(async () => {
            vi.advanceTimersByTime(10000); //advance to 3rd wave, prep for next rep
        });
        expect(screen.getByText('Rep 1/2 - Wave 3/3')).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(5000); //cumulative 24s
        });
        expect(playFiveSeconds).not.toHaveBeenCalled(); //no audio till prep for next rep

        await act(async () => {
            vi.advanceTimersByTime(4000); //cumulative 28s
        });
        expect(playTYM).not.toHaveBeenCalled(); //no audio till prep for next rep

        await act(async () => {
            vi.advanceTimersByTime(1000); //cumulative 29s
        });
        expect(playGo).toHaveBeenCalledTimes(2); //no third playGo() till prep for next rep

        await act(async () => {
            vi.advanceTimersByTime(25000); //cumulative 54s
        });
        expect(playFiveSeconds).toHaveBeenCalled();

        await act(async () => {
            vi.advanceTimersByTime(3000); //cumulative 57s
        });
        expect(playTYM).toHaveBeenCalled();

        await act(async () => {
            vi.advanceTimersByTime(2000); //cumulative 59s
        });
        expect(playGo).toHaveBeenCalledTimes(3);
        expect(screen.getByText('Rep 2/2 - Wave 1/3')).toBeInTheDocument();
        expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    it('navigates to /completed-workout when reps & waves are completed', async () => {
        customRender(<RunWorkout />, { providerProps });

        await act(async () => {
            vi.advanceTimersByTime(9000); //advance to 2nd wave
        });

        await act(async () => {
            vi.advanceTimersByTime(10000); //advance to 3rd wave, prep for next rep
        });

        await act(async () => {
            vi.advanceTimersByTime(40000); //advance to 2nd rep, prep for next rep
        });

        await act(async () => {
            vi.advanceTimersByTime(9000); //rep 2 - advance to 2nd wave
        });

        await act(async () => {
            vi.advanceTimersByTime(10000); // rep 2 - advance to 3rd wave, prep for next rep
        });

        await act(async () => {
            vi.advanceTimersByTime(41000); //complete workout
        });

        await act(async () => {
            vi.advanceTimersByTime(10); //final re-render
        });

        expect(screen.getByText('Rep 3/2 - Wave 3/3')).toBeInTheDocument();
        expect(playWorkoutCompleted).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/completed-workout');
    });
});
