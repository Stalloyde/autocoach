import { React, act } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import AddToFavouritesModal from '../../../components/Workout/AddToFavourites/AddToFavouritesModal';
import { customRender } from '../../test.utils';

describe('AddToFavouritesModal', () => {
    let providerProps = {};

    const mockSetCurrentUser = vi.fn();
    const mockSetAddingToFavourites = vi.fn();

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

    it('renders form correctly', () => {
        customRender(<AddToFavouritesModal />, { providerProps });
        expect(screen.getByLabelText('Save workout as:')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Save' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Cancel' })
        ).toBeInTheDocument();
    });

    it('Form submits and renders AddToFavouritesSuccessModal - assuming no errors', async () => {
        const mockResponse = {
            username: 'tester1',
            workouts: [
                {
                    workoutName: 'favourite1',
                    reps: 2,
                    userId: 1,
                    repInterval: 45,
                    waves: 3,
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

        customRender(<AddToFavouritesModal />, { providerProps });

        const form = screen
            .getByRole('button', {
                name: 'Save',
            })
            .closest('form');

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(mockSetCurrentUser).toHaveBeenCalledWith({
            username: providerProps.currentUser.username,
            workouts: [
                {
                    workoutName: 'favourite1',
                    reps: 2,
                    userId: 1,
                    repInterval: 45,
                    waves: 3,
                    waveInterval: 10,
                    countdown: 5,
                },
            ],
        });

        expect(
            screen.getByText('Your workout has been successfully saved!')
        ).toBeInTheDocument();

        expect(
            screen.getByRole('link', { name: 'Start workout' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('link', { name: 'Return to setup' })
        ).toBeInTheDocument();
    });

    it('renders OverwriteFavouritesModal if existing workoutName found', async () => {
        const mockResponse = {
            duplicateFound: 'favourite1',
        };

        vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );

        customRender(<AddToFavouritesModal />, { providerProps });

        const form = screen
            .getByRole('button', {
                name: 'Save',
            })
            .closest('form');

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(
            screen.getByText(
                `The workout 'favourite1' already exists. Are you sure you want overwrite it?`
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText('This action will not be reversible')
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Save' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: 'Cancel' })
        ).toBeInTheDocument();
    });

    it('renders error message if workoutName is too long', async () => {
        const mockResponse = {
            workoutNameError: 'Workout name is too long',
        };

        vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );

        customRender(<AddToFavouritesModal />, { providerProps });

        const form = screen
            .getByRole('button', {
                name: 'Save',
            })
            .closest('form');

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(screen.getByLabelText('Save workout as:')).toBeInTheDocument();
        expect(
            screen.getByText('Workout name is too long')
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Save' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Cancel' })
        ).toBeInTheDocument();
    });
});
