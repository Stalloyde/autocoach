import { React, useState, useEffect, useRef, useMemo } from 'react';
import { useContext } from 'react';
import { InputStateContext } from '../../App';
import {
    playGo,
    playTYM,
    playFiveSeconds,
    playWorkoutCompleted,
} from '../../helpers/playAudio';
import { useNavigate } from 'react-router';
import { formatMilliSeconds } from '../../helpers/formatTime';
import WorkoutDetails from '../../sub-components/WorkoutDetails';

function RunWorkout() {
    const { reps, repInterval, waves, waveInterval, setCountdown } =
        useContext(InputStateContext);
    const navigate = useNavigate();

    const [currentWave, setCurrentWave] = useState(1);
    const [currentRep, setCurrentRep] = useState(1);
    const [currentRepInterval, setCurrentRepInterval] = useState(0);
    const [formattedCurrentRepInterval, setFormattedCurrentRepInterval] =
        useState('');

    const startTime = useRef(Date.now());
    const [wavesArray, setWavesArray] = useState<number[]>([]);
    const lastTriggeredWave = useRef(0);

    useEffect(() => {
        const array: Array<number> = [];
        for (let i = 1; i < waves; i++) {
            array.push(waveInterval * i);
        }
        setWavesArray(array);
    }, []);

    //rep management
    useEffect(() => {
        if (repInterval < 1) navigate('/');
        setFormattedCurrentRepInterval(formatMilliSeconds(currentRepInterval));
        const currentRepIntervalS = Math.floor(currentRepInterval / 1000);

        const toPrepNextRep = currentRep < reps;
        const noNextRep = currentRep === reps;
        const workoutCompleted = currentRep > reps;

        if (toPrepNextRep) {
            if (currentRepIntervalS + 6 === repInterval) playFiveSeconds();
            if (currentRepIntervalS + 3 === repInterval) playTYM();
            if (currentRepIntervalS + 1 === repInterval) {
                playGo();
                setCurrentWave(1);
                setCurrentRep((prev) => prev + 1);
                setCurrentRepInterval(1);
                startTime.current = Date.now();
            }
        }

        if (noNextRep) {
            if (currentRepIntervalS === repInterval) {
                setCurrentRep((prev) => prev + 1);
            }
        }

        if (workoutCompleted) {
            playWorkoutCompleted();
            setCountdown(5);
            navigate('/completed-workout');
        }

        const finalWave = currentWave === waves;

        if (!finalWave) {
            lastTriggeredWave;
            if (wavesArray.includes(currentRepIntervalS + 6)) playFiveSeconds();
            if (wavesArray.includes(currentRepIntervalS + 3)) playTYM();
            if (
                wavesArray.includes(currentRepIntervalS + 1) &&
                lastTriggeredWave.current !== currentRepIntervalS //prevent multiple increments by making sure that the last triggered interval doesnt match the current time
            ) {
                playGo();
                setCurrentWave((prev) => prev + 1);
                lastTriggeredWave.current = currentRepIntervalS; // save the last triggered interval to the ref
            }
        }

        const interval = setInterval(() => {
            setCurrentRepInterval(Date.now() - startTime.current);
        }, 10);

        return () => clearInterval(interval);
    }, [currentRepInterval, repInterval]);

    return (
        <>
            <div className="grid grid-rows-[0.5fr_1fr_1fr] items-center justify-center">
                <div></div>
                <div className="grid justify-center text-[150px]">
                    <div className="text-center text-[100px]">
                        {formattedCurrentRepInterval}
                    </div>
                    <div className="text-center text-[20px]">
                        Rep {currentRep}/{reps} - Wave {currentWave}/{waves}
                    </div>
                </div>
                <WorkoutDetails />
            </div>
        </>
    );
}

export default RunWorkout;
