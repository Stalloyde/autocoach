import { useContext } from 'react';
import { InputStateContext } from './App';
import Inputs from './Inputs';
import TimeInput from './TimeInput';
import { useNavigate } from 'react-router';

function WorkoutConfig() {
    const {
        reps,
        setReps,
        setRepInterval,
        waves,
        setWaves,
        waveInterval,
        setWaveInterval,
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
                    inputType="number"
                    id="repetitions"
                    minValue="1"
                    value={reps}
                    handleDecrementBtn={() =>
                        reps > 1 ? setReps(reps - 1) : null
                    }
                    handleIncrementBtn={() => setReps(reps + 1)}
                    handleInput={(e) => setReps(e.target.value)}
                />
                <TimeInput setRepInterval={setRepInterval} />
                <Inputs
                    label="# of Waves"
                    inputType="number"
                    id="waves"
                    value={waves}
                    minValue="1"
                    handleDecrementBtn={() =>
                        waves > 1 ? setWaves(waves - 1) : null
                    }
                    handleIncrementBtn={() => setWaves(waves + 1)}
                    handleInput={(e) => setWaves(e.target.value)}
                />
                {waves > 1 ? (
                    <Inputs
                        label="Interval between Waves (seconds)"
                        inputType="number"
                        id="intervalWave"
                        minValue="5"
                        value={waveInterval}
                        handleDecrementBtn={() =>
                            waveInterval === 5
                                ? null
                                : setWaveInterval(waveInterval - 5)
                        }
                        handleIncrementBtn={() =>
                            setWaveInterval(waveInterval + 5)
                        }
                        handleInput={(e) => setWaveInterval(e.target.value)}
                        disableTyping={(e) => {
                            e.preventDefault();
                        }}
                    />
                ) : null}
                <Inputs
                    label="Countdown Timer (seconds)"
                    inputType="number"
                    id="countdown"
                    minValue="3"
                    value={countdown}
                    handleDecrementBtn={() =>
                        countdown === 5 ? null : setCountdown(countdown - 1)
                    }
                    handleIncrementBtn={() => setCountdown(countdown + 1)}
                    handleInput={(e) => setCountdown(e.target.value)}
                />
                <button className="m-5 border border-slate-950 bg-green-700 p-2 text-white">
                    Start Workout{' '}
                </button>
            </form>
        </>
    );
}

export default WorkoutConfig;
