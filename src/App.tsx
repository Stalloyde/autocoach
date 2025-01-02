import Header from './Header';
import RunWorkout from './RunWorkout';
import WorkoutConfig from './WorkoutConfig';
import { Routes, Route } from 'react-router';

function App() {
    return (
        <div className="grid h-screen grid-rows-10">
            <header className="row-span-1">
                <Header />
            </header>

            <main className="row-span-9 grid">
                <Routes>
                    <Route path="/" element={<WorkoutConfig />} />
                    <Route path="/run-workout" element={<RunWorkout />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
