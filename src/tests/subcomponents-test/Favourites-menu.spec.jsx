import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '../test.utils';
import FavouritesMenu from '../../sub-components/Favourites-menu';

test('Favourite workouts are rendered within FavouritesMenu', () => {
    const providerProps = {
        currentUser: {
            username: 'tester',
            workouts: [{ workoutName: 'fav1' }, { workoutName: 'fav2' }],
        },
    };

    customRender(<FavouritesMenu />, { providerProps });
    const favouritesBtn = screen.getByRole('button', { name: 'favourites' });
    expect(favouritesBtn).toBeInTheDocument();
    fireEvent.click(favouritesBtn);
    expect(screen.getByText('fav1')).toBeInTheDocument();
    expect(screen.getByText('fav2')).toBeInTheDocument();
});

test('Clicking on favourite workout sets states with correct values', () => {
    const mockSetReps = vi.fn();
    const mockSetRepInterval = vi.fn();
    const mockSetDisplayInterval = vi.fn();
    const mockSetWaves = vi.fn();
    const mockSetWaveInterval = vi.fn();
    const mockSetCountdown = vi.fn();
    const mockSetAddingToFavourites = vi.fn();

    const providerProps = {
        currentUser: {
            username: 'tester',
            workouts: [
                {
                    workoutName: 'fav1',
                    reps: 2,
                    repInterval: 30,
                    displayInterval: '00:30',
                    waves: 2,
                    waveInterval: 10,
                    countdown: 5,
                },
                {
                    workoutName: 'fav2',
                    reps: 2,
                    repInterval: 100,
                    displayInterval: '01:40',
                    waves: 3,
                    waveInterval: 10,
                    countdown: 5,
                },
            ],
        },
        setReps: mockSetReps,
        setRepInterval: mockSetRepInterval,
        setDisplayInterval: mockSetDisplayInterval,
        setWaves: mockSetWaves,
        setWaveInterval: mockSetWaveInterval,
        setCountdown: mockSetCountdown,
        addingToFavourites: true,
        setAddingToFavourites: mockSetAddingToFavourites,
    };

    customRender(<FavouritesMenu />, { providerProps });
    const favouritesBtn = screen.getByRole('button', { name: 'favourites' });
    expect(favouritesBtn).toBeInTheDocument();
    fireEvent.click(favouritesBtn);
    expect(screen.getByText('fav1')).toBeInTheDocument();
    expect(screen.getByText('fav2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('fav1'));
    expect(mockSetReps).toHaveBeenCalledWith(2);
    expect(mockSetRepInterval).toHaveBeenCalledWith(30);
    expect(mockSetDisplayInterval).toHaveBeenCalledWith('00:30');
    expect(mockSetWaves).toHaveBeenCalledWith(2);
    expect(mockSetWaveInterval).toHaveBeenCalledWith(10);
    expect(mockSetCountdown).toHaveBeenCalledWith(5);
    expect(mockSetAddingToFavourites).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByText('fav2'));
    expect(mockSetReps).toHaveBeenCalledWith(2);
    expect(mockSetRepInterval).toHaveBeenCalledWith(100);
    expect(mockSetDisplayInterval).toHaveBeenCalledWith('01:40');
    expect(mockSetWaves).toHaveBeenCalledWith(3);
    expect(mockSetWaveInterval).toHaveBeenCalledWith(10);
    expect(mockSetCountdown).toHaveBeenCalledWith(5);
    expect(mockSetAddingToFavourites).toHaveBeenCalledWith(false);
});
