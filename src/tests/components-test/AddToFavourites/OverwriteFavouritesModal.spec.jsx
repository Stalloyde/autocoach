import { React, act } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import OverwriteFavouritesModal from '../../../components/Workout/AddToFavourites/OverwriteFavouritesModal';
import { customRender } from '../../test.utils';

describe('OverwriteFavouritesModal', () => {
    let providerProps = {};

    const mockSetCurrentUser = vi.fn();
    const mockSetAddingToFavourites = vi.fn();
    const mockSetAddToFavouritesSuccess = vi.fn();

    beforeEach(() => {
        providerProps = {
            reps: 1,
            repInterval: 45,
            waves: 2,
            waveInterval: 10,
            countdown: 5,
            token: undefined,
            currentUser: { username: 'tester1' },
            setCurrentUser: mockSetCurrentUser,
            setAddingToFavourites: mockSetAddingToFavourites,
        };

        vi.clearAllMocks();
    });

    it('Confirmation to overwrite works as expected', async () => {
        const mockResponse = {
            username: 'tester1',
            workouts: [
                {
                    workoutName: 'favourite1',
                    reps: 3,
                    userId: 1,
                    repInterval: 60,
                    waves: 2,
                    waveInterval: 10,
                    countdown: 5,
                },
            ],
        };

        vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );

        customRender(
            <OverwriteFavouritesModal
                setAddToFavouritesSuccess={mockSetAddToFavouritesSuccess}
            />,
            { providerProps }
        );

        await act(async () => {
            fireEvent.click(
                screen.getByRole('button', {
                    name: 'Save',
                })
            );
        });

        expect(mockSetCurrentUser).toHaveBeenCalledWith({
            username: providerProps.currentUser.username,
            workouts: [
                {
                    workoutName: 'favourite1',
                    reps: 3,
                    userId: 1,
                    repInterval: 60,
                    waves: 2,
                    waveInterval: 10,
                    countdown: 5,
                },
            ],
        });

        expect(mockSetAddToFavouritesSuccess).toHaveBeenCalledWith(true);
    });

    it('Cancelling ovewrite works as expected', async () => {
        const mockResponse = {
            username: 'tester1',
            workouts: [
                {
                    workoutName: 'favourite1',
                    reps: 3,
                    userId: 1,
                    repInterval: 60,
                    waves: 2,
                    waveInterval: 10,
                    countdown: 5,
                },
            ],
        };

        vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );

        customRender(
            <OverwriteFavouritesModal
                setAddToFavouritesSuccess={mockSetAddToFavouritesSuccess}
            />,
            { providerProps }
        );

        await act(async () => {
            fireEvent.click(
                screen.getByRole('button', {
                    name: 'Cancel',
                })
            );
        });

        expect(mockSetCurrentUser).not.toHaveBeenCalled();
        expect(mockSetAddToFavouritesSuccess).not.toHaveBeenCalled();
        expect(mockSetAddingToFavourites).toHaveBeenCalledWith(false);
    });
});
