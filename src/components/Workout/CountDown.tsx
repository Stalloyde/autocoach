import { useEffect } from 'react';
import { useContext } from 'react';
import { InputStateContext } from '../../App';
import { playGo, playTYM, playFiveSeconds } from '../../helpers/playAudio';
import { useNavigate } from 'react-router';
import { formatTime } from '../../helpers/formatTime';

function CountDown() {
    const navigate = useNavigate();

    const {
        reps,
        repInterval,
        waves,
        waveInterval,
        countdown,
        displayInterval,
        setDisplayInterval,
        setCountdown,
        token,
        currentUser,
    } = useContext(InputStateContext);

    useEffect(() => {
        if (countdown === 5) playFiveSeconds();
        if (countdown === 2) playTYM();

        if (countdown === 0) {
            playGo();
            token
                ? navigate(`/run-workout/${currentUser}`)
                : navigate('/run-workout');
        }

        const interval = setInterval(() => {
            if (countdown > 0) setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    useEffect(() => {
        if (repInterval < 1) navigate('/');
        setDisplayInterval(formatTime(repInterval));
    }, []);

    return (
        <>
            <div className="grid items-center justify-center">
                <div className="text-center text-[50px]">
                    Workout starting in:
                </div>
                <div className="flex justify-center text-[150px]">
                    {countdown}
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

export default CountDown;
