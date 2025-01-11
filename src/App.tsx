import { useState, createContext } from 'react';
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

export const InputStateContext = createContext(null);

function App() {
    const jwtToken: string | undefined = Cookies.get('token');
    const currentUserCookie: string | undefined = Cookies.get('currentUser');
    const [token, setToken] = useState(jwtToken);
    const [reps, setReps] = useState(1);
    const [repInterval, setRepInterval] = useState(0);
    const [waves, setWaves] = useState(2);
    const [waveInterval, setWaveInterval] = useState(10);
    const [displayInterval, setDisplayInterval] = useState('');
    const [countdown, setCountdown] = useState(5);
    const [currentUser, setCurrentUser] = useState(currentUserCookie);

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
            }}
        >
            <div className="grid h-screen grid-rows-10">
                <header className="row-span-1">
                    <Header />
                </header>

                <main className="row-span-9 grid">
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
