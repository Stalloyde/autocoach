import { useContext } from 'react';
import { InputStateContext } from './App';
import Inputs from './Inputs';
import TimeInput from './TimeInput';
import { useNavigate } from 'react-router';

function WorkoutConfig() {
    const {
        reps,
        setReps,
        repInterval,
        setRepInterval,
        waves,
        setWaves,
        waveInterval,
        countdown,
        setCountdown,
    } = useContext(InputStateContext);

    let navigate = useNavigate();

    function handleStartWorkout(e) {
        e.preventDefault();
        navigate('/countdown');
    }

    return (
        <>
            <form
                action="POST"
                onSubmit={handleStartWorkout}
                className="grid justify-center p-2"
            >
                <Inputs
                    label="# of Repetition"
                    inputType="tel"
                    id="repetitions"
                    minValue="1"
                    value={reps}
                    handleDecrementBtn={() =>
                        reps > 1 ? setReps(reps - 1) : null
                    }
                    handleIncrementBtn={() => setReps((prev) => prev + 1)}
                    handleInput={(e) => setReps(Number(e.target.value))}
                />
                <TimeInput setRepInterval={setRepInterval} />
                <Inputs
                    label="# of Waves"
                    inputType="number"
                    id="waves"
                    value={waves}
                    minValue="2"
                    maxValue={repInterval / waveInterval - 1}
                    handleDecrementBtn={() =>
                        waves > 2 ? setWaves(waves - 1) : null
                    }
                    handleIncrementBtn={() => setWaves((prev) => prev + 1)}
                    handleInput={(e) => setWaves(Number(e.target.value))}
                />
                <Inputs
                    label="Interval between Waves (seconds)"
                    fixed={true}
                    inputType="tel"
                    id="intervalWave"
                    defaultValue={waveInterval}
                    disableTyping={(e) => {
                        e.preventDefault();
                    }}
                />
                <Inputs
                    label="Countdown Timer (seconds)"
                    inputType="tel"
                    id="countdown"
                    minValue="3"
                    value={countdown}
                    handleDecrementBtn={() =>
                        countdown === 5
                            ? null
                            : setCountdown((prev) => prev - 1)
                    }
                    handleIncrementBtn={() => setCountdown((prev) => prev + 1)}
                    handleInput={(e) => setCountdown(Number(e.target.value))}
                />
                <button className="m-5 border border-slate-950 bg-green-700 p-2 text-white">
                    Start Workout{' '}
                </button>
            </form>
        </>
    );
}

export default WorkoutConfig;
