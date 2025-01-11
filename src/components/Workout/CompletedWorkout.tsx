import { useNavigate } from 'react-router';

function CompletedWorkout() {
    const navigate = useNavigate();

    function startNewWorkout() {
        navigate('/');
    }

    return (
        <>
            <div className="grid items-center justify-center">
                <div className="text-center text-[50px]">
                    Workout Completed!
                </div>

                <button
                    onClick={startNewWorkout}
                    className="m-5 border border-slate-950 bg-green-700 p-2 text-white"
                >
                    Start New Workout
                </button>
            </div>
        </>
    );
}

export default CompletedWorkout;
