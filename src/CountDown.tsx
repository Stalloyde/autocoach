import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { InputStateContext } from './App';
import { useNavigate } from 'react-router';

function CountDown() {
    const [displayTime, setDisplayTime] = useState('');

    const navigate = useNavigate();

    const { reps, repInterval, waves, waveInterval, countdown, setCountdown } =
        useContext(InputStateContext);

    if (repInterval < 1) navigate('/');

    useEffect(() => {
        const interval = setInterval(() => {
            if (countdown > 0) setCountdown(countdown - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    useEffect(() => {
        const seconds = repInterval % 60;
        const minutes = (repInterval - seconds) / 60;
        setDisplayTime(
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
    }, [repInterval]);

    return (
        <>
            <div className="grid items-center justify-center">
                <div className="text-center text-[50px]">
                    Workout starting in:
                </div>
                <div className="flex justify-center text-[150px]">
                    {countdown}
                </div>
                <div className="h-32 border border-slate-950 text-center text-[20px]">
                    <h2 className="underline">Workout Details</h2>
                    <div> Number of Repetitions: {reps}</div>
                    <div> Interval per Repetition: {displayTime}</div>
                    <div> Number of Waves: {waves}</div>
                    <div> Interval between Waves: {waveInterval}</div>
                </div>
            </div>
        </>
    );
}

export default CountDown;
