import { useContext } from 'react';
import { InputStateContext } from '../App';

const WorkoutDetails = () => {
    const { reps, displayInterval, waves, waveInterval } =
        useContext(InputStateContext);

    return (
        <div className="grid justify-center text-center text-[20px]">
            <div className="border border-slate-950 p-3">
                <h2 className="underline">Workout Details</h2>
                <div className="grid grid-cols-[3fr_1fr]">
                    <div className="grid justify-end">
                        Number of Repetitions:
                    </div>
                    <div>{reps}</div>
                </div>
                <div className="grid grid-cols-[3fr_1fr]">
                    <div className="grid justify-end">
                        Interval per Repetition:
                    </div>
                    <div>{displayInterval}</div>
                </div>
                <div className="grid grid-cols-[3fr_1fr]">
                    <div className="grid justify-end">Number of Waves:</div>
                    <div>{waves}</div>
                </div>
                <div className="grid grid-cols-[3fr_1fr]">
                    <div className="grid justify-end">
                        Interval between Waves:
                    </div>
                    <div>{waveInterval}</div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetails;
