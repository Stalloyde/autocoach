import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '../test.utils';
import WorkoutConfig from '../../components/Workout/WorkoutConfig';
import { describe } from 'vitest';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

describe('workoutConfig', () => {
    const mockSetReps = vi.fn();
    const mockSetRepinterval = vi.fn();
    const mockSetWaves = vi.fn();
    const mockSetCountdown = vi.fn();
    const mockSetAddingToFavourites = vi.fn();
    const mockSetDisplayInterval = vi.fn();

    let providerProps = {};

    beforeEach(() => {
        providerProps = {
            reps: 1,
            setReps: mockSetReps,
            repInterval: 0,
            setRepInterval: mockSetRepinterval,
            waves: 2,
            setWaves: mockSetWaves,
            waveInterval: 10,
            countdown: 5,
            setCountdown: mockSetCountdown,
            token: undefined,
            currentUser: undefined,
            addingToFavourites: false,
            setAddingToFavourites: mockSetAddingToFavourites,
            setDisplayInterval: mockSetDisplayInterval,
        };

        vi.clearAllMocks();
    });

    it('Default WorkoutConfig renders correctly', () => {
        customRender(<WorkoutConfig />, { providerProps });

        expect(screen.getByLabelText('# of Repetition')).toHaveValue(1);
        expect(
            screen.getByLabelText('Interval per Repetition (MM:SS)')
        ).toHaveValue('');
        expect(screen.getByLabelText('# of Waves')).toHaveValue(2);
        expect(
            screen.getByLabelText('Interval between Waves (seconds)')
        ).toHaveValue('10'); //string because input is type tel, which returns string
        expect(screen.getByLabelText('Countdown Timer (seconds)')).toHaveValue(
            5
        );
        expect(
            screen.getByRole('button', { name: 'Start Workout' })
        ).toBeInTheDocument();
    });

    it('Logged in WorkoutConfig renders correctly', () => {
        providerProps.currentUser = undefined;
        providerProps.token = '1231232';

        customRender(<WorkoutConfig />, { providerProps });
        expect(screen.getByLabelText('# of Repetition')).toHaveValue(1);
        expect(
            screen.getByLabelText('Interval per Repetition (MM:SS)')
        ).toHaveValue('');
        expect(screen.getByLabelText('# of Waves')).toHaveValue(2);
        expect(
            screen.getByLabelText('Interval between Waves (seconds)')
        ).toHaveValue('10'); //string because input is type tel, which returns string
        expect(screen.getByLabelText('Countdown Timer (seconds)')).toHaveValue(
            5
        );
        expect(
            screen.getByRole('button', { name: 'Start Workout' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Add To Favourites' })
        ).toBeInTheDocument();
    });

    it('Logged out form submits correctly', async () => {
        providerProps.repInterval = 45;

        customRender(<WorkoutConfig />, { providerProps });

        const form = screen
            .getByRole('button', {
                name: 'Start Workout',
            })
            .closest('form');

        fireEvent.submit(form);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/countdown');
    });

    it('Logged in in form submits correctly', async () => {
        providerProps.repInterval = 45;
        providerProps.token = '1231231232';
        providerProps.currentUser = { username: 'ioqwndoqwdnd' };

        customRender(<WorkoutConfig />, { providerProps });

        const form = screen
            .getByRole('button', {
                name: 'Start Workout',
            })
            .closest('form');

        fireEvent.submit(form);
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
            '/countdown/ioqwndoqwdnd'
        );
    });

    it('Add to Favourite button works as expected', async () => {
        providerProps.repInterval = 45;
        providerProps.token = '1231231232';
        providerProps.currentUser = { username: 'ioqwndoqwdnd' };

        customRender(<WorkoutConfig />, { providerProps });

        const addToFavouritesButton = screen.getByRole('button', {
            name: 'Add To Favourites',
        });

        fireEvent.click(addToFavouritesButton);
        expect(mockSetAddingToFavourites).toHaveBeenCalledWith(true);
    });

    it('Add to Favourite button does not work if repInterval is 0', async () => {
        providerProps.token = '1231231232';
        providerProps.currentUser = { username: 'ioqwndoqwdnd' };

        customRender(<WorkoutConfig />, { providerProps });

        const addToFavouritesButton = screen.getByRole('button', {
            name: 'Add To Favourites',
        });

        fireEvent.click(addToFavouritesButton);
        expect(mockSetAddingToFavourites).not.toHaveBeenCalled();
    });
});
