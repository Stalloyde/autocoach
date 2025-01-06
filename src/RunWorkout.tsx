import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { InputStateContext } from './App';
import {
    playGo,
    playTYM,
    playFiveSeconds,
    playWorkoutCompleted,
} from './playAudio';
import { useNavigate } from 'react-router';
import { FormatTime } from './DisplayTime';

//{waveInterval} countdown for {waves} amount of times
//on every {repInterval}, repeat the above for {reps} amount of times
//workout completed

function RunWorkout() {
    const { reps, repInterval, waves, displayInterval, waveInterval } =
        useContext(InputStateContext);
    const navigate = useNavigate();

    const [currentCountdown, setCurrentCountdown] = useState(waveInterval);
    const [currentWave, setCurrentWave] = useState(1);
    const [currentRep, setCurrentRep] = useState(1);
    const [currentRepInterval, setCurrentRepInterval] = useState(0);
    const [formattedCurrentRepInterval, setFormattedCurrentRepInterval] =
        useState('');

    //rep management
    useEffect(() => {
        setFormattedCurrentRepInterval(FormatTime(currentRepInterval));
        if (repInterval < 1) navigate('/');

        const interval = setInterval(() => {
            if (currentRepInterval !== repInterval)
                setCurrentRepInterval((prev) => prev + 1);
        }, 1000);

        //check workout complete
        if (
            currentRep === reps &&
            currentWave === waves &&
            currentRepInterval === repInterval
        ) {
            playWorkoutCompleted();
            navigate('/workout-complete');
        }

        //if reps not completed, begin countdown and prep for next rep
        if (currentRep !== reps && currentRepInterval + 10 === repInterval) {
            setCurrentRep((prev) => prev + 1);
            setCurrentWave(0);
        }

        //reset the current rep interval
        if (currentRepInterval === repInterval) setCurrentRepInterval(0);

        return () => clearInterval(interval);
    }, [currentRepInterval]);

    //wave management
    useEffect(() => {
        if (currentCountdown === 5) playFiveSeconds();
        if (currentCountdown === 2) playTYM();

        if (currentCountdown === 0) {
            playGo();
            setCurrentWave(currentWave + 1);
            setCurrentCountdown(waveInterval);
        }

        //check waves complete
        if (currentWave === waves) return;

        const interval = setInterval(() => {
            if (currentCountdown > 0) setCurrentCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentCountdown, currentRep]);

    return (
        <>
            <div className="grid items-center justify-center">
                <div className="text-center text-[50px]">
                    Current Time: {formattedCurrentRepInterval}
                </div>
                <div className="text-center text-[20px]">
                    Rep {currentRep}/{reps} - Wave {currentWave}/{waves}
                </div>
                <div className="grid justify-center text-[150px]">
                    <div>{currentCountdown}</div>
                </div>
                <div className="border border-slate-950 text-center text-[20px]">
                    <h2 className="underline">Workout Details</h2>
                    <div className="grid grid-cols-[2fr_1fr]">
                        <div className="grid justify-end">
                            Number of Repetitions:
                        </div>
                        <div>{reps}</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr]">
                        <div className="grid justify-end">
                            Interval per Repetition:
                        </div>
                        <div>{displayInterval}</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr]">
                        <div className="grid justify-end">Number of Waves:</div>
                        <div>{waves}</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr]">
                        <div className="grid justify-end">
                            Interval between Waves:
                        </div>
                        <div>{waveInterval}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RunWorkout;
