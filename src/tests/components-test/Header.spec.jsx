import { screen } from '@testing-library/react';
import { customRender } from '../test.utils';
import Header from '../../components/Header';

test('Default Header renders correctly', () => {
    const providerProps = {
        token: undefined,
        currentUser: undefined,
    };
    customRender(<Header />, { providerProps });
    expect(screen.getByRole('link', { name: 'AUTO-GO' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
});

test('Logged in Header renders correctly - without workouts', () => {
    const providerProps = {
        token: '123132123',
        currentUser: { username: 'tester', workouts: [] },
    };
    customRender(<Header />, { providerProps });
    expect(screen.getByRole('link', { name: 'AUTO-GO' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'settings' })).toBeInTheDocument();
});

test('Logged in Header renders correctly - with workouts', () => {
    const providerProps = {
        token: '123132123',
        currentUser: {
            username: 'tester',
            workouts: [{ workoutName: 'fav1' }],
        },
    };
    customRender(<Header />, { providerProps });
    expect(screen.getByRole('link', { name: 'AUTO-GO' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'settings' })).toBeInTheDocument();
    expect(
        screen.getByRole('button', { name: 'favourites' })
    ).toBeInTheDocument();
});
