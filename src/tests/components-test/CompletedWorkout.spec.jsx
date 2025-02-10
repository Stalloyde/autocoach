import { React } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CompletedWorkout from '../../components/Workout/CompletedWorkout';
import { customRender } from '../test.utils';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

test('navigates to / on button click', async () => {
    customRender(<CompletedWorkout />, {});

    const startNewWorkoutBtn = screen.getByRole('button', {
        name: 'Start New Workout',
    });

    expect(startNewWorkoutBtn).toBeInTheDocument();
    fireEvent.click(startNewWorkoutBtn);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
});
