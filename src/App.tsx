import { useState, createContext } from 'react';
import Header from './Header';
import CountDown from './CountDown';
import WorkoutConfig from './WorkoutConfig';
import { Routes, Route } from 'react-router';

export const InputStateContext = createContext(null);

function App() {
    const [reps, setReps] = useState(1);
    const [repInterval, setRepInterval] = useState(0);
    const [waves, setWaves] = useState(2);
    const [waveInterval, setWaveInterval] = useState(5);
    const [countdown, setCountdown] = useState(5);

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
                countdown,
                setCountdown,
            }}
        >
            <div className="grid h-screen grid-rows-10">
                <header className="row-span-1">
                    <Header />
                </header>

                <main className="row-span-9 grid">
                    <Routes>
                        <Route path="/" element={<WorkoutConfig />} />
                        <Route path="/countdown" element={<CountDown />} />
                    </Routes>
                </main>
            </div>
        </InputStateContext.Provider>
    );
}

export default App;
