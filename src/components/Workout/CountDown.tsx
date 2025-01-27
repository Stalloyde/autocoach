import { useEffect } from 'react';
import { useContext } from 'react';
import { InputStateContext } from '../../App';
import { playGo, playTYM, playFiveSeconds } from '../../helpers/playAudio';
import { useNavigate } from 'react-router';
import { formatTime } from '../../helpers/formatTime';
import WorkoutDetails from '../../sub-components/WorkoutDetails';

function CountDown() {
    const navigate = useNavigate();

    const {
        repInterval,
        countdown,
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
            token && currentUser
                ? navigate(`/run-workout/${currentUser.username}`)
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
            <div className="grid max-h-[780px] items-center justify-center">
                <div className="text-center text-[40px]">
                    Workout starting in:
                </div>
                <div className="flex justify-center text-[150px]">
                    {countdown}
                </div>
                <WorkoutDetails />
            </div>
        </>
    );
}

export default CountDown;
