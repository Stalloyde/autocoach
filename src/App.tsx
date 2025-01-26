import { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import CountDown from './components/Workout/CountDown';
import WorkoutConfig from './components/Workout/WorkoutConfig';
import RunWorkout from './components/Workout/RunWorkout';
import Protected from './components/Workout/Protected';
import Login from './components/Login';
import Signup from './components/Signup/Signup';
import Settings from './components/Settings';
import CompletedWorkout from './components/Workout/CompletedWorkout';
import { Routes, Route, Navigate } from 'react-router';
import Cookies from 'js-cookie';
import {
    HeadersType,
    ContextType,
    currentUserType,
} from './utils/TypeDeclarations';

export const InputStateContext = createContext<ContextType>({} as ContextType);

function App() {
    const jwtToken = Cookies.get('token');
    const [token, setToken] = useState(jwtToken);
    const [reps, setReps] = useState(1);
    const [repInterval, setRepInterval] = useState(0);
    const [waves, setWaves] = useState(2);
    const [waveInterval, setWaveInterval] = useState(10);
    const [displayInterval, setDisplayInterval] = useState('');
    const [countdown, setCountdown] = useState(5);
    const [currentUser, setCurrentUser] = useState<currentUserType>();
    const [loading, setLoading] = useState(true);
    const [addingToFavourites, setAddingToFavourites] = useState(false);

    async function fetchCurrentUser() {
        const headers: HeadersType = {
            'Content-Type': 'application/json',
        };

        if (token) headers.Authorization = token;

        const response = await fetch('http://localhost:3000', {
            method: 'GET',
            headers,
        });

        const responseData = await response.json();
        setCurrentUser(responseData);
        setLoading(false);
        return;
    }

    useEffect(() => {
        if (token) fetchCurrentUser();
    }, []);

    if (loading && token) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <InputStateContext.Provider
            value={{
                reps,
                setReps,
                repInterval,
                setRepInterval,
                waves,
                setWaves,
                waveInterval,
                setWaveInterval,
                displayInterval,
                setDisplayInterval,
                countdown,
                setCountdown,
                token,
                setToken,
                currentUser,
                setCurrentUser,
                setLoading,
                addingToFavourites,
                setAddingToFavourites,
            }}
        >
            <div className="grid h-screen grid-rows-[62px_1fr]">
                <Header />

                <main className="grid max-h-[780px] min-h-[450px]">
                    <Routes>
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/sign-up" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/:username?" element={<WorkoutConfig />} />
                        <Route
                            path="/countdown/:username?"
                            element={<CountDown />}
                        />
                        <Route
                            path="/run-workout/:username?"
                            element={<RunWorkout />}
                        />
                        <Route
                            path="/completed-workout/:username?"
                            element={<CompletedWorkout />}
                        />

                        {/* Private routes */}
                        <Route element={<Protected />}>
                            <Route
                                path="/settings/:username"
                                element={<Settings />}
                            />
                        </Route>
                    </Routes>
                </main>
            </div>
        </InputStateContext.Provider>
    );
}

export default App;
