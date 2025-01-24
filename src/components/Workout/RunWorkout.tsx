import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { InputStateContext } from '../../App';
import {
    playGo,
    playTYM,
    playFiveSeconds,
    playWorkoutCompleted,
} from '../../helpers/playAudio';
import { useNavigate } from 'react-router';
import { formatTime } from '../../helpers/formatTime';
import WorkoutDetails from '../../sub-components/WorkoutDetails';

function RunWorkout() {
    const { reps, repInterval, waves, waveInterval, setCountdown } =
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
        setFormattedCurrentRepInterval(formatTime(currentRepInterval));
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
            setCountdown(5);
            navigate('/completed-workout');
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
            <div className="grid grid-rows-[0.5fr_1fr_1fr] items-center justify-center">
                <div>
                    <div className="text-center text-[40px]">
                        Current Time: {formattedCurrentRepInterval}
                    </div>
                    <div className="text-center text-[20px]">
                        Rep {currentRep}/{reps} - Wave {currentWave}/{waves}
                    </div>
                </div>
                <div className="grid justify-center text-[150px]">
                    <div>{currentCountdown}</div>
                </div>
                <WorkoutDetails />
            </div>
        </>
    );
}

export default RunWorkout;
