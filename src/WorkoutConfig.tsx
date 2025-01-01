import { useState } from 'react';
import Header from './Header';
import Inputs from './Inputs';
import TimeInput from './TimeInput';

function WorkoutConfig() {
    const [reps, setReps] = useState(1);
    const [repInterval, setRepInterval] = useState(0);
    const [waves, setWaves] = useState(1);
    const [waveInterval, setWaveInterval] = useState(5);
    const [countdown, setCountdown] = useState(5);

    function handleStartWorkout(e) {
        e.preventDefault();
        console.log(reps, repInterval, waves, waveInterval, countdown);
    }

    return (
        <>
            <Header />
            <form action="POST" onSubmit={handleStartWorkout}>
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
                    handleIncrementBtn={() => setWaveInterval(waveInterval + 5)}
                    handleInput={(e) => setWaveInterval(e.target.value)}
                    disableTyping={(e) => {
                        e.preventDefault();
                    }}
                />
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

                <button> Start Workout </button>
            </form>
        </>
    );
}

export default WorkoutConfig;
