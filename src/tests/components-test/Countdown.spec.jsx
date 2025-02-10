import { React, screen } from '@testing-library/react';
import { customRender } from '../test.utils';
import CountDown from '../../components/Workout/CountDown';
import { describe, vi } from 'vitest';
import { playGo, playTYM, playFiveSeconds } from '../../helpers/playAudio';

vi.mock('../../helpers/playAudio', () => ({
    playGo: vi.fn(),
    playTYM: vi.fn(),
    playFiveSeconds: vi.fn(),
}));

const mockedUsedNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

describe('Countdown', () => {
    const mockSetCountdown = vi.fn();
    const mockSetDisplayInterval = vi.fn();

    let providerProps = {};

    beforeEach(() => {
        providerProps = {
            reps: 3,
            repInterval: 45,
            countdown: 5,
            displayInterval: '00:45',
            setDisplayInterval: mockSetDisplayInterval,
            setCountdown: mockSetCountdown,
            waves: 2,
            waveInterval: 10,
            token: undefined,
            currentUser: undefined,
        };

        vi.clearAllMocks();
    });

    it('Countdown renders correctly', () => {
        customRender(<CountDown />, { providerProps });

        expect(screen.getByText('Workout starting in:')).toBeInTheDocument();
        expect(screen.getByTestId('displayCountdown')).toHaveTextContent(5);
        expect(screen.getByText('Workout Details')).toBeInTheDocument();
        expect(screen.getByText('Number of Repetitions:')).toBeInTheDocument();
        expect(screen.getByText(3)).toBeInTheDocument();
        expect(
            screen.getByText('Interval per Repetition:')
        ).toBeInTheDocument();
        expect(screen.getByText('00:45')).toBeInTheDocument();
        expect(screen.getByText('Number of Waves:')).toBeInTheDocument();
        expect(screen.getByText(2)).toBeInTheDocument();
        expect(screen.getByText('Interval between Waves:')).toBeInTheDocument();
        expect(screen.getByText(10)).toBeInTheDocument();
        expect(playFiveSeconds).toHaveBeenCalled();
        expect(playTYM).not.toHaveBeenCalled();
        expect(playGo).not.toHaveBeenCalled();
    });

    it('Countdown === 2', () => {
        providerProps.countdown = 2;
        customRender(<CountDown />, { providerProps });
        expect(screen.getByTestId('displayCountdown')).toHaveTextContent(2);
        expect(playFiveSeconds).not.toHaveBeenCalled();
        expect(playTYM).toHaveBeenCalled();
        expect(playGo).not.toHaveBeenCalled();
    });

    it('Non logged in - countdown === 0', () => {
        providerProps.countdown = 0;
        customRender(<CountDown />, { providerProps });
        expect(screen.getByTestId('displayCountdown')).toHaveTextContent(0);
        expect(playFiveSeconds).not.toHaveBeenCalled();
        expect(playTYM).not.toHaveBeenCalled();
        expect(playGo).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/run-workout');
    });

    it('Logged in - countdown === 0', () => {
        providerProps.countdown = 0;
        providerProps.token = '123123';
        providerProps.currentUser = { username: 'testing' };
        customRender(<CountDown />, { providerProps });
        expect(screen.getByTestId('displayCountdown')).toHaveTextContent(0);
        expect(playFiveSeconds).not.toHaveBeenCalled();
        expect(playTYM).not.toHaveBeenCalled();
        expect(playGo).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/run-workout/testing');
    });
});
